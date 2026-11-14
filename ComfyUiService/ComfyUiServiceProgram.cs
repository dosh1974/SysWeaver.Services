using SysWeaver.OsServices;

namespace ComfyUiService
{

    internal class ComfyUiServiceProgram
    {
        static void Main(string[] args)
        {
            ServiceHost.Run(new ServiceParams
            {
                Name = "ComfyUiService",
                NeedToRunElevated = false,
                DisplayName = "SysWeaver - ComfyUI",
                Description = "Web API's for creating images, videos, music, speech and sounds using ComfyUI workflows.",
            });
        }
    }
}
