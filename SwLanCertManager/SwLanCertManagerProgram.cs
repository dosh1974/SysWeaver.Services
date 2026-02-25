using SysWeaver.OsServices;

namespace SysWeaver
{
    internal class ServerManagerProgram
    {
        static int Main() => ServiceHost.Run(new ServiceParams
        {
            Name = "SysWeaver.LanCert",
            DisplayName = "SysWeaver  - Lan Cert Service",
            Description = "This is a service that manages certificates for Lan resources",
            NeedToRunElevated = true,
            RestartOnFail = true,
        });
    }
}
