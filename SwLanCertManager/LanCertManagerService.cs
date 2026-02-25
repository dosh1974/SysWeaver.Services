using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using SysWeaver.Data;
using SysWeaver.MicroService;
using SysWeaver.Security;

namespace SysWeaver
{

    public sealed class LanCertManagerParams : CertificateBaseParams
    {
        public LanCertManagerParams()
        {
            Filename = @"$(CommonApplicationData)\SysWeaver_AppData_$(AppName)\ManagedCerts\$(AuthApi)_$(Email)_$(DomainName)_$(Hash).pfx";

        }

        public String AuthApi = "https://acme-v02.api.letsencrypt.org/directory";


        public String[] Domains;

    }


    public sealed class LanCertManagerService : IDisposable
    {

        public LanCertManagerService(ServiceManager m, LanCertManagerParams p)
        {
            var ds = new ConcurrentDictionary<String, Domain>(StringComparer.Ordinal);
            Domains = ds;
            foreach (var x in p.Domains)
            {
                var d = new Domain(x, p, m, this);
                ds.TryAdd(x.FastToLower(), d);
            }
            InitDomains().RunAsync();
        }

        /// <summary>
        /// Get trace log
        /// </summary>
        /// <param name="r">Paramaters</param>
        /// <returns></returns>
        [WebApi]
        [WebApiAuth(Roles.OpsDev)]
        [WebApiClientCache(1)]
        [WebApiRequestCache(1)]
        [WebMenuTable(null, "Domains", "Domains", null, "IconTableLog")]
        public TableData DomainTable(TableDataRequest r) 
            => TableDataTools.Get(r, 1000, Domains.Values.Select(x => new Data(x)));

        sealed class Data
        {
            public Data(Domain d)
            {
                DomainName = d.DomainName;
                LastChecked = new DateTime(Interlocked.Read(ref d.LastChecked), DateTimeKind.Utc);
                var cert = d.Cert;
                if (cert != null)
                {
                    Expiration = cert.GetExpiration();
                    From = cert.NotBefore;
                    To = cert.NotAfter;
                    Serial = cert.SerialNumber;
                }
                var e = d.CertErrors;
                ExCount = e.Count;
                ExLast = new DateTime(e.LastTime, DateTimeKind.Utc);
                LastException = e.LastException?.ToString();
            }

            [TableDataUrl("{0}", "https://{0}")]
            public String DomainName;


            public DateTime LastChecked;

            public DateTime From;
            public DateTime To;


            public DateTime Expiration;

            [TableDataText]
            public String Serial;

            public long ExCount;

            public DateTime ExLast;

            [TableDataText]
            public String LastException;
        }


        public void Dispose()
        {
            var ds = Domains;
            foreach (var x in ds.Values)
                x.Dispose();
            ds.Clear();
        }

        readonly ServiceManager Manager;

        void OnChange(Domain d)
        {
            Manager.AddMessage("Certificate for " + d.DomainName + " was updated!");
        }

        async Task InitDomains()
        {
            foreach (var d in Domains.Values)
                await d.UpdateCert().ConfigureAwait(false);
        }

        readonly ExceptionTracker CertErrors = new ();

        readonly ConcurrentDictionary<String, Domain> Domains;

        sealed class Domain : IDisposable
        {
            public void Dispose()
            {
                var p = Provider;
                Provider.OnChanged -= OnChanged;
            }

            readonly LanCertManagerService S;

            public Domain(String domainName, LanCertManagerParams p, IMessageHost msg, LanCertManagerService s)
            {
                var ap = new AcmeCertificateParams();
                S = s;
                ap.CopyFrom(p);
                ap.AuthApi = p.AuthApi;
                ap.DomainName = domainName;
                DomainName = domainName;
                Provider = new AcmeCertificateProvider(msg, ap);
                Provider.OnChanged += OnChanged;
            }

            public long LastChecked;

            public readonly ExceptionTracker CertErrors = new();


            void OnChanged(X509Certificate2 c)
            {
                if (c != null)
                {
                    Interlocked.Exchange(ref Cert, c);
                    S.OnChange(this);
                }else
                {
                    CertErrors.OnException(new Exception("Failed to get certificate"));
                }
                Interlocked.Exchange(ref LastChecked, DateTime.UtcNow.Ticks);
            }

            public async ValueTask UpdateCert()
            {
                try
                {
                    var c = await Provider.GetCert().ConfigureAwait(false);
                    if (c != null)
                    {
                        Interlocked.Exchange(ref Cert, c);
                        S.OnChange(this);
                    }else
                    {
                        CertErrors.OnException(new Exception("Failed to get certificate"));
                    }
                }
                catch (Exception ex)
                {
                    S.CertErrors.OnException(ex);
                    CertErrors.OnException(ex);
                }
                Interlocked.Exchange(ref LastChecked, DateTime.UtcNow.Ticks);
            }


            public readonly String DomainName;
            public readonly AcmeCertificateProvider Provider;
            public X509Certificate2 Cert;
        }






    }
}
