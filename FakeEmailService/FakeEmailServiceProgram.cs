using SysWeaver.OsServices;

namespace FakeEmailService
{

    public sealed class FakeEmailServiceFiles
    {
    }

    internal class FakeEmailServiceProgram
    {
        static void Main(string[] args)
        {
            ServiceHost.Run(new ServiceParams
            {
                Name = "FakeEmailService",
                NeedToRunElevated = true,
                DisplayName = "SysWeaver - Fake email service",
                Description = "A service that mocks an email service, sent emails are kept in memory and incoming emails can be faked.",
            });
        }
    }
}
