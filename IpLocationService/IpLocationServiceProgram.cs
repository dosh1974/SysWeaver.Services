using SysWeaver.OsServices;

namespace IpLocationService
{
    internal class IpLocationServiceProgram
    {
        static void Main(string[] args)
        {
            ServiceHost.Run(new ServiceParams
            {
                Name = "IpLocationService",
                NeedToRunElevated = true,
                DisplayName = "SysWeaver - IP-Location service",
                Description = "IP geo location service with DB backed cache.",
            });

        }
    }
}
