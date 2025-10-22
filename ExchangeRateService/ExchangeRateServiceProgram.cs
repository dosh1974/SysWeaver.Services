using SysWeaver.OsServices;

namespace ExchangeRateService
{
    internal class ExchangeRateServiceProgram
    {
        static void Main(string[] args)
        {
            ServiceHost.Run(new ServiceParams
            {
                Name = "ExchangeRateService",
                NeedToRunElevated = true,
                DisplayName = "SysWeaver - Exchange rate service",
                Description = "Keeps the latest exchange rates.",
            });
        }
    }
}
