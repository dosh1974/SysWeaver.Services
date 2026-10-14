# FakeEmailService

[⬆ SysWeaver.Services overview](../README.md)

> Stand-alone fake email server for development and testing: hosts SysWeaver.Email.Fake and its web inbox behind an authenticated HTTPS web UI.

| | |
|---|---|
| **Layer** | Service (application) |
| **Kind** | Application |

## Purpose

Give developers and testers a mail "server" where sent emails are kept in memory and can be inspected, and where incoming emails and failures can be simulated, without sending real email.

## How it fits into SysWeaver

The executable contains the entry point and an empty marker class, `FakeEmailServiceFiles`, that is listed in the manifest so the assembly's embedded web pages (`srcWeb/app`: a `Home.html` / `Welcome.html` that frame the inbox at `fakeEmail/index.html`) are served. The email functionality comes from [SysWeaver.Email.Fake](https://github.com/dosh1974/SysWeaver/blob/main/Communication/SysWeaver.Email.Fake/README.md).

## Running it

- Started with `ServiceHost.Run` ([SysWeaver.OsServices](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.OsServices/README.md)), service name `FakeEmailService`: `FakeEmailService debug` runs it in the console, `FakeEmailService install` / `start` installs and runs it as an OS service (requires elevation).
- Manifest: [`FakeEmailService.Services.json`](FakeEmailService.Services.json) (copied to the output folder). Key services:
  - `FakeEmailService` (sender `noreply@fakeemail.sysweaver.com`) and `FakeEmailServiceFiles` (the embedded app pages)
  - `SimpleAuthorizer` (users in `C:\Keys\FakeEmailUsers.txt`), `AuthManagerService`, `LoginService`
  - the standard web UI services (`StaticDataHttpServerService`, `ApiHttpServerService`, `IconHttpServerService`, `ExploreHttpServerService`, `WebMenuService`, `TypeService`, `IsoDataService`), `ChartJsService`, `ExcelService` and `ChartJsExcelService` (GemBox license in `C:\Keys\GemBox.Spreadsheet.txt`)
  - `NetHttpServerService` listening on `https://*:443/` (basic auth allowed) with a `SelfSignedCertificateProvider` certificate for `fakeemail.sysweaver.com`, `FirewallHandler`
- Serves the fake inbox web UI and the email APIs over HTTPS.

## Limitations and considerations

- Emails are only kept in memory; they are lost when the service stops.
- The build runs `..\..\SysWeaver\_tools\compress\Compress.exe` (Windows executable) to Brotli-compress `srcWeb` into the embedded `web` folder.
- The shipped manifest is the author's own configuration (key files, host name); adapt before use.

## Relationships

- **Project:** [`FakeEmailService.csproj`](FakeEmailService.csproj)
- **Builds on:** [SysWeaver.IsoData](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.IsoData/README.md), [SysWeaver.MicroService.Auth](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.Auth/README.md), [SysWeaver.MicroService.ChartJs.Excel](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.ChartJs.Excel/README.md), [SysWeaver.MicroService.Edit](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.Edit/README.md), [SysWeaver.MicroService.NetHttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.NetHttpServer/README.md), [SysWeaver.MicroServices.Log](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroServices.Log/README.md), [SysWeaver.OsServices.ServiceHostFactoryUnix](https://github.com/dosh1974/SysWeaver/blob/main/Platform/SysWeaver.OsServices.ServiceHostFactoryUnix/README.md), [SysWeaver.OsServices.ServiceHostFactoryWin32NT](https://github.com/dosh1974/SysWeaver/blob/main/Platform/SysWeaver.OsServices.ServiceHostFactoryWin32NT/README.md), [SysWeaver.Security.Acme](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.Security.Acme/README.md), [SysWeaver.Serialization.SwJson](https://github.com/dosh1974/SysWeaver/blob/main/Serialization/SysWeaver.Serialization.SwJson/README.md), [SysWeaver.Email.Fake](https://github.com/dosh1974/SysWeaver/blob/main/Communication/SysWeaver.Email.Fake/README.md)
