using SysWeaver.OsServices;

namespace WebServiceServer
{

    internal class WebServiceServerProgram
    {
        static void Main(string[] args)
        {
            ServiceHost.Run(new ServiceParams
            {
                Name = "WebServiceServer",
                NeedToRunElevated = true,
                DisplayName = "SysWeaver - Web Server",
                Description = "This is a simple \"bare minimum\" web server.",
            });
        }
    }
}
