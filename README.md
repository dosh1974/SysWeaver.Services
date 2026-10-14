```
                                //////////\   ////\       ////\   //////////\
                              ////\_\_\_////\ ////\       ////\ ////\_\_\_////\
                              ////\     \_\_/ \_////\   ////\_/ ////\     \_\_/
                              \_//////////\     \_////////\_/   \_//////////\
                                \_\_\_\_////\     \_////\_/       \_\_\_\_////\
                              ////\     ////\       ////\       ////\     ////\
                              \_//////////\_/       ////\       \_//////////\_/
                                \_\_\_\_\_/         \_\_/         \_\_\_\_\_/

              ////\     ////\ ////////////\         ////\   ////\ ////////////\ //////////\
              ////\     ////\ ////\_\_\_\_/       //////\   ////\ ////\_\_\_\_/ ////\_\_////\
              ////\     ////\ ////\             ////////\   ////\ ////\         ////\   ////\
              ////\ //\ ////\ ////////\       ////\_////\ ////\_/ ////////\     //////////\_/
              ////\ //\ ////\ ////\_\_/     ////\_/ ////////\_/   ////\_\_/     ////\_\_////\
              //////\_//////\ ////\         ////\   //////\_/     ////\         ////\   ////\
              ////\_/ \_////\ ////////////\ ////\   ////\_/       ////////////\ ////\   ////\
              \_\_/     \_\_/ \_\_\_\_\_\_/ \_\_/   \_\_/         \_\_\_\_\_\_/ \_\_/   \_\_/
```

> ⚠️ **DISCLAIMER**  
>         SysWeaver is used in my personal and professional work.  
>         It's **not** intended for wide public consumption.  
>         I move fast, refactor and break things regularly.  
>         Use at your own risk!  

# OVERVIEW

Ready to run applications (services) built on the [SysWeaver](https://github.com/dosh1974/SysWeaver) framework.  
Each one is a small executable whose `Main` calls `ServiceHost.Run` ([SysWeaver.OsServices](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.OsServices/README.md)); what it does is declared in the service manifest `<Executable>.Services.json` next to the executable (an OS specific `<Executable>.Services.Windows.json` / `.Services.Linux.json` is used instead when present).  
The same executable runs in the console (`<Executable> debug`) or is installed and controlled as an OS service (`<Executable> install`, `start`, `stop`, ...).  

The shipped manifests are the author's own configurations (key files in `C:\Keys` / `$(KeyFolder)`, host names, MySQL, development folders): adapt them before use.  

| Service | Summary |
|---|---|
| [ExchangeRateService](ExchangeRateService/README.md) | Stand-alone exchange rate server: hosts SysWeaver.ExchangeRate with fixer.io and exchangeratesapi.io sources behind an authenticated HTTPS web UI and API. |
| [FakeEmailService](FakeEmailService/README.md) | Stand-alone fake email server for development and testing: hosts SysWeaver.Email.Fake and its web inbox behind an authenticated HTTPS web UI. |
| [FakeTextService](FakeTextService/README.md) | Stand-alone fake text message server for development and testing: hosts SysWeaver.TextMessage.Fake with a web UI behind an authenticated HTTPS server. |
| [IpLocationService](IpLocationService/README.md) | Stand-alone IP geolocation server: hosts SysWeaver.IpLocation with commercial web API sources and a MySQL cache behind an authenticated HTTPS web UI and API. |
| [ReverseProxyClient](ReverseProxyClient/README.md) | Example reverse proxy client: connects out to a ReverseProxyServer so that this machine's web end points become reachable through the public server. |
| [ReverseProxyServer](ReverseProxyServer/README.md) | Example public facing reverse proxy server: reverse proxy clients connect to it, and it routes incoming HTTPS requests to their end points. |
| [SwLanCertManager](SwLanCertManager/README.md) | Central LAN certificate manager: hosts SysWeaver.MicroService.LanCertificateManager so that other SysWeaver machines can obtain and renew certificates for LAN host names. |
| [SwServerManager](SwServerManager/README.md) | Per-machine server manager: hosts SysWeaver.MicroService.ServerManager and FolderSync to deploy, control and monitor the SysWeaver services and folders on a host, on Windows and Linux. |
| [TranslationService](TranslationService/README.md) | Translation server: an LLM based translator behind a memory and MySQL cache, exposed as a web API (with a translation editor) for other SysWeaver services. |
| [WebServerService](WebServerService/README.md) | Bare minimum SysWeaver web server: authentication, login, the standard web UI services and HTTPS with a self-signed certificate, ready to serve your own folders. |

## PLATFORM
- All projects target **.NET 10** (`net10.0`).
- Each project has a folder publish profile in `Properties/PublishProfiles` producing a self-contained **win-x64** build in `bin\publish\...`; `SwServerManager` also has a **linux-x64** profile.
- `ExchangeRateService`, `FakeEmailService`, `FakeTextService`, `IpLocationService`, `SwServerManager` and `WebServerService` reference both the Windows and the Unix (systemd / SysVinit) service host factories; `ReverseProxyClient`, `ReverseProxyServer`, `SwLanCertManager` and `TranslationService` only reference the Windows one, so they can only be installed as Windows services.

## BUILD  
Building requires that the [SysWeaver](https://github.com/dosh1974/SysWeaver) repository is Cloned to the same folder as the [SysWeaver.Services](https://github.com/dosh1974/SysWeaver.Services) repository:  
```
C:\Dev\SysWeaver
C:\Dev\SysWeaver.Services
```
All projects reference SysWeaver projects as `..\..\SysWeaver\...`, and the solution [`SysWeaver.Services.slnx`](SysWeaver.Services.slnx) includes them as `../SysWeaver/...`.  
`FakeEmailService` and `FakeTextService` compress their web pages at build time with `..\SysWeaver\_tools\compress\Compress.exe`, so building them requires Windows.  
`Clean_All.bat` cleans all projects using `..\SysWeaver\_tools\VsClean\VsClean.exe` (a full rebuild is needed afterwards).  
