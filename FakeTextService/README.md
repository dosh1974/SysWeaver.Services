# FakeTextService

[⬆ SysWeaver.Services overview](../README.md)

> Stand-alone fake text message server for development and testing: hosts SysWeaver.TextMessage.Fake with a web UI behind an authenticated HTTPS server.

| | |
|---|---|
| **Layer** | Service (application) |
| **Kind** | Application |

## Purpose

Give developers and testers a text message (SMS) "provider" where sent messages are kept in memory per phone number, and where delivery, failures and incoming messages can be simulated, without sending real messages.

## How it fits into SysWeaver

The executable contains the entry point and an empty marker class, `FakeTextServiceFiles`, that is listed in the manifest so the assembly's embedded web pages (`srcWeb/app`: `Home.html`, `Welcome.html`, `text.js`, `text.css`) are served. The text message functionality comes from [SysWeaver.TextMessage.Fake](https://github.com/dosh1974/SysWeaver/blob/main/Communication/SysWeaver.TextMessage.Fake/README.md).

## Running it

- Started with `ServiceHost.Run` ([SysWeaver.OsServices](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.OsServices/README.md)), service name `FakeTextService`: `FakeTextService debug` runs it in the console, `FakeTextService install` / `start` installs and runs it as an OS service (requires elevation).
- Manifest: [`FakeTextService.Services.json`](FakeTextService.Services.json) (copied to the output folder). Key services:
  - `FakeTextMessageService` and `FakeTextServiceFiles` (the embedded app pages)
  - `SimpleAuthorizer` (users in `C:\Keys\FakeTextUsers.txt`), `AuthManagerService`, `LoginService`
  - the standard web UI services (`StaticDataHttpServerService`, `ApiHttpServerService`, `IconHttpServerService`, `ExploreHttpServerService`, `WebMenuService`, `TypeService`, `IsoDataService`), `ChartJsService`, `ExcelService` and `ChartJsExcelService` (GemBox license in `C:\Keys\GemBox.Spreadsheet.txt`)
  - `NetHttpServerService` listening on `https://*:443/` (basic auth allowed) with a `SelfSignedCertificateProvider` certificate for `faketext.sysweaver.com`, `FirewallHandler`
- Serves the fake text message web UI and APIs over HTTPS.

## Limitations and considerations

- Messages are only kept in memory; they are lost when the service stops.
- The build runs `..\..\SysWeaver\_tools\compress\Compress.exe` (Windows executable) to Brotli-compress `srcWeb` into the embedded `web` folder.
- The shipped manifest is the author's own configuration (key files, host name); adapt before use.

## Folder layout

| Folder | Content |
|---|---|
| [`Properties/`](Properties/README.md) | Publish profile (self-contained win-x64) |
| [`srcWeb/`](srcWeb/README.md) | Source of the embedded `app/Home.html` / `app/Welcome.html` pages with the send form and message table (Brotli compressed into `web` at build time) |

## Relationships

- **Project:** [`FakeTextService.csproj`](FakeTextService.csproj)
- **Builds on:** [SysWeaver.IsoData](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.IsoData/README.md), [SysWeaver.MicroService.Auth](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.Auth/README.md), [SysWeaver.MicroService.ChartJs.Excel](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.ChartJs.Excel/README.md), [SysWeaver.MicroService.Edit](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.Edit/README.md), [SysWeaver.MicroService.NetHttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.NetHttpServer/README.md), [SysWeaver.MicroServices.Log](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroServices.Log/README.md), [SysWeaver.OsServices.ServiceHostFactoryUnix](https://github.com/dosh1974/SysWeaver/blob/main/Platform/SysWeaver.OsServices.ServiceHostFactoryUnix/README.md), [SysWeaver.OsServices.ServiceHostFactoryWin32NT](https://github.com/dosh1974/SysWeaver/blob/main/Platform/SysWeaver.OsServices.ServiceHostFactoryWin32NT/README.md), [SysWeaver.Security.Acme](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.Security.Acme/README.md), [SysWeaver.Serialization.SwJson](https://github.com/dosh1974/SysWeaver/blob/main/Serialization/SysWeaver.Serialization.SwJson/README.md), [SysWeaver.TextMessage.Fake](https://github.com/dosh1974/SysWeaver/blob/main/Communication/SysWeaver.TextMessage.Fake/README.md)
