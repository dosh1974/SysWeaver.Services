using SysWeaver.OsServices;

namespace SysWeaver.HttpBench
{
    internal static class HttpBenchServiceProgram
    {
        static int Main() => ServiceHost.Run(new ServiceParams
        {
            Name = "SysWeaver.HttpBench",
            DisplayName = "SysWeaver - HTTP bench",
            Description = "Performance tests SysWeaver web services: many workers call a selection of public end points for a while, the results are shown as tables and charts",
            NeedToRunElevated = false,
            RestartOnFail = false,
        });
    }
}
