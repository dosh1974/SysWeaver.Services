# srcWeb

[⬆ FakeTextService](../README.md)

> Source of the web pages that FakeTextService embeds and serves: its own versions of the `app/Home.html` and `app/Welcome.html` pages, a form to simulate incoming text messages plus the message list.

| | |
|---|---|
| **Project** | [FakeTextService](../README.md) |
| **Kind** | Embedded web assets |

## Purpose

A build step in [`FakeTextService.csproj`](../FakeTextService.csproj) (target `EmbedLocal`, before the build) runs `..\..\SysWeaver\_tools\compress\Compress.exe -Methods br .\srcWeb\*+ .\web`, which minifies and Brotli compresses everything in this folder into the generated `web` folder; the `web\**\*.br` files are embedded as resources. The manifest lists the marker class `FakeTextServiceFiles`, so the assembly's embedded resources are served by the SysWeaver HTTP server: the part of the resource name after `.web.` becomes the url, so `srcWeb/app/Home.html` is served as `app/Home.html`.

The build step uses the Windows executable [compress](https://github.com/dosh1974/SysWeaver/blob/main/_tools/compress/README.md) from the SysWeaver repository, so building the project requires Windows.

## Contents

| Item | Description |
|---|---|
| [`app/`](app/README.md) | The `Home` / `Welcome` pages, their script and style sheet |

## Relationships

- **Part of:** [FakeTextService](../README.md)
- **Uses:** [compress](https://github.com/dosh1974/SysWeaver/blob/main/_tools/compress/README.md) (build step)
