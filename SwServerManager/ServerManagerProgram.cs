using SysWeaver.OsServices;

namespace SysWeaver
{
    internal class ServerManagerProgram
    {
        static int Main() => ServiceHost.Run(new ServiceParams
        {
            Name = "SysWeaver.ServerManager",
            DisplayName = "SysWeaver  - Server manager",
            Description = "This is a service that manages other services and folders",
            NeedToRunElevated = false,
            RestartOnFail = true,
        });
    }
}
