using SysWeaver.OsServices;

namespace SysWeaver
{
    internal class ReverseProxyClientProgram
    {
        static void Main(string[] args)
        {
            ServiceHost.Run(new ServiceParams
            {
                Name = "ReverseProxyClient",
                NeedToRunElevated = true,
                DisplayName = "SysWeaver - Reverse proxy client",
                Description = "An example of a remote proxy client.",
            });

        }
    }
}
