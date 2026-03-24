using SysWeaver.OsServices;

namespace SysWeaver
{
    internal class ReverseProxyServerProgram
    {
        static void Main(string[] args)
        {
            ServiceHost.Run(new ServiceParams
            {
                Name = "ReverseProxyServer",
                NeedToRunElevated = true,
                DisplayName = "SysWeaver - Reverse proxy server",
                Description = "An example of a public facing server that reverse proxy clients connects to.",
            });

        }
    }
}
