
using SysWeaver;
using SysWeaver.OsServices;



namespace TranslationService
{

    static class TranslationServiceProgram
    {
        static int Main() => ServiceHost.Run(new ServiceParams
        {
            Name = "SysWeaver.TranslationService",
            DisplayName = "SysWeaver  - Translation server",
            Description = "This is a server that handles language translations, using memory and db caching",
            NeedToRunElevated = true,
            RestartOnFail = true,
        });
    }



}

