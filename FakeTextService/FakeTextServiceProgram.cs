using SysWeaver.OsServices;

namespace FakeTextService
{

    public sealed class FakeTextServiceFiles
    {
    }

    internal class FakeTextServiceProgram
    {
        static void Main(string[] args)
        {
            ServiceHost.Run(new ServiceParams
            {
                Name = "FakeTextService",
                NeedToRunElevated = true,
                DisplayName = "SysWeaver - Fake text message service",
                Description = "A service that mocks a text message service, based on phone numbers.",
            });
        }
    }
}
