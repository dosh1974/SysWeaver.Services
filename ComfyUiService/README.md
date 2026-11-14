# ComfyUiService

[⬆ SysWeaver.Services overview](../README.md)

> ComfyUI media server: web API's that create images, videos, music, speech and sounds using ComfyUI workflows, behind an authenticated HTTPS web UI.

| | |
|---|---|
| **Layer** | Service (application) |
| **Kind** | Application |

## Purpose

Exposes the task methods of [SysWeaver.AI.ComfyUi](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.AI.ComfyUi/README.md) (`TextToImage`, `ImagesToImage`, `TextToVideo`, `ImagesToVideo`, `TextToMusic`, `TextToSpeech` and `TextToSound`) as web API's, so that other services and clients can create media without knowing anything about the ComfyUI workflows. Drop API format workflows in the workflow folder, they are analyzed at start up and the first one (alphabetically) of each kind is the default.

## How it fits into SysWeaver

The executable only contains the entry point, the [WebServerService](../WebServerService/README.md) manifest is extended with two services (registered before the http server):

- `ComfyUiService` ([SysWeaver.AI.ComfyUi](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.AI.ComfyUi/README.md)): the ComfyUI client, the workflows in `TaskWorkflowFolders` are loaded and analyzed
- `ComfyUiApiService`: the web API's (`Api/comfyui/TextToImage` etc), each returns the created file with its own mime type (ex: `image/png`, `video/mp4`, `audio/flac`)

## Running it

- Started with `ServiceHost.Run` ([SysWeaver.OsServices](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.OsServices/README.md)), service name `ComfyUiService`: `ComfyUiService debug` runs it in the console (a manifest that listens on `https://*` or adds firewall rules needs an elevated console); `ComfyUiService install` / `start` installs and runs it as an OS service (requires elevation).
- Manifest: [`ComfyUiService.Services.json`](ComfyUiService.Services.json) (copied to the output folder). Key services:
  - `SimpleAuthorizer` (users in `$(KeyFolder)/ComfyUi_Users.txt`), `AuthManagerService`, `LoginService`
  - the standard web UI services (as in WebServerService)
  - `ComfyUiService`: `EndPoint` (default `http://127.0.0.1:8188`), an optional api key file `$(KeyFolder)/ComfyUi.txt` (only needed if ComfyUI is behind an authenticating proxy), workflows in `$(ExecutableDir)/ComfyUiWorkflows`
  - `ComfyUiApiService`: `Auth` is the auth of all API's (empty = any logged in user)
  - `NetHttpServerService` listening on `https://*` with a LAN certificate, `FirewallHandler`

## Limitations and considerations

- Requires a ComfyUI server with [ComfyUI-Connect](https://github.com/Good-Dream-Studio/ComfyUI-Connect) (audio results require a ComfyUI-Connect that also collects `"audio"` outputs).
- A request doesn't return until the workflow has completed (minutes for a video), clients need a long time out.
- See the SysWeaver.AI.ComfyUi README for how workflows are analyzed and how to annotate them.

## Folder layout

| Folder | Content |
|---|---|
| [`Properties/`](Properties/README.md) | Publish profile (self-contained win-x64) |

## Relationships

- **Project:** [`ComfyUiService.csproj`](ComfyUiService.csproj)
- **Builds on:** [SysWeaver.AI.ComfyUi](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.AI.ComfyUi/README.md), [SysWeaver.IsoData](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.IsoData/README.md), [SysWeaver.MicroService.AspHttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.AspHttpServer/README.md), [SysWeaver.MicroService.Auth](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.Auth/README.md), [SysWeaver.MicroService.Edit](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.Edit/README.md), [SysWeaver.MicroService.NetHttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroService.NetHttpServer/README.md), [SysWeaver.MicroServices.Log](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.MicroServices.Log/README.md), [SysWeaver.OsServices.ServiceHostFactoryUnix](https://github.com/dosh1974/SysWeaver/blob/main/Platform/SysWeaver.OsServices.ServiceHostFactoryUnix/README.md), [SysWeaver.OsServices.ServiceHostFactoryWin32NT](https://github.com/dosh1974/SysWeaver/blob/main/Platform/SysWeaver.OsServices.ServiceHostFactoryWin32NT/README.md), [SysWeaver.Security.Acme](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.Security.Acme/README.md), [SysWeaver.Serialization.SwJson](https://github.com/dosh1974/SysWeaver/blob/main/Serialization/SysWeaver.Serialization.SwJson/README.md)
