# WebServerService

[⬆ SysWeaver.Services overview](../README.md)

> Bare minimum SysWeaver web server: authentication, login, the standard web UI services and HTTPS with a self-signed certificate, ready to serve your own folders.

| | |
|---|---|
| **Layer** | Service (application) |
| **Kind** | Application |

## Purpose

A minimal, ready to run SysWeaver web server and a starting point for new services: add folders to serve or more micro services to the manifest without writing code.

## How it fits into SysWeaver

The executable only contains the entry point; everything else is the SysWeaver web platform ([SysWeaver.MicroService.NetHttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.NetHttpServer/README.md), [SysWeaver.MicroService.Auth](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.Auth/README.md) and the standard web UI services) composed in the manifest.

## Running it

- The folder is `WebServerService` but the project, executable and manifest are named `WebServiceServer`.
- Started with `ServiceHost.Run` ([SysWeaver.OsServices](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.OsServices/README.md)), service name `WebServiceServer`: `WebServiceServer debug` runs it in the console, `WebServiceServer install` / `start` installs and runs it as an OS service (requires elevation).
- Manifest: [`WebServiceServer.Services.json`](WebServiceServer.Services.json) (copied to the output folder). Key services:
  - `SimpleAuthorizer` (users in `C:\Keys\WebServiceServer_Users.txt`), `AuthManagerService`, `LoginService`
  - `FileHttpServerModule` with an empty `Folders` list (add the disc folders to serve)
  - the standard web UI services (`StaticDataHttpServerService`, `ApiHttpServerService`, `IconHttpServerService`, `ExploreHttpServerService`, `WebMenuService`, `TypeService`, `IsoDataService`)
  - `NetHttpServerService` listening on `https://*:443/` with a `SelfSignedCertificateProvider` certificate for `webserver.sysweaver.com` (an `AcmeCertificateProvider` entry is commented out), `FirewallHandler`
- Serves the built-in SysWeaver web UI, its APIs and any configured folders over HTTPS.

## Limitations and considerations

- Browsers warn about the self-signed certificate; use the commented out `AcmeCertificateProvider` (with your own e-mail and domain) for a public server.

## Relationships

- **Project:** [`WebServiceServer.csproj`](WebServiceServer.csproj)
- **Builds on:** [SysWeaver.IsoData](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.IsoData/README.md), [SysWeaver.MicroService.Auth](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.Auth/README.md), [SysWeaver.MicroService.Edit](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.Edit/README.md), [SysWeaver.MicroService.NetHttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.NetHttpServer/README.md), [SysWeaver.MicroServices.Log](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroServices.Log/README.md), [SysWeaver.OsServices.ServiceHostFactoryUnix](https://github.com/dosh1974/SysWeaver/blob/main/Platform/SysWeaver.OsServices.ServiceHostFactoryUnix/README.md), [SysWeaver.OsServices.ServiceHostFactoryWin32NT](https://github.com/dosh1974/SysWeaver/blob/main/Platform/SysWeaver.OsServices.ServiceHostFactoryWin32NT/README.md), [SysWeaver.Security.Acme](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.Security.Acme/README.md), [SysWeaver.Serialization.SwJson](https://github.com/dosh1974/SysWeaver/blob/main/Serialization/SysWeaver.Serialization.SwJson/README.md)
