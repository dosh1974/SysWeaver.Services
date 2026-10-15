# srcWeb

[⬆ FakeEmailService](../README.md)

> Source of the web pages that FakeEmailService embeds and serves: its own versions of the `app/Home.html` and `app/Welcome.html` pages, which show the fake inbox.

| | |
|---|---|
| **Project** | [FakeEmailService](../README.md) |
| **Kind** | Embedded web assets |

## Purpose

A build step in [`FakeEmailService.csproj`](../FakeEmailService.csproj) (target `EmbedLocal`, before the build) runs `..\..\SysWeaver\_tools\compress\Compress.exe -Methods br .\srcWeb\*+ .\web`, which minifies and Brotli compresses everything in this folder into the generated `web` folder; the `web\**\*.br` files are embedded as resources. The manifest lists the marker class `FakeEmailServiceFiles`, so the assembly's embedded resources are served by the SysWeaver HTTP server: the part of the resource name after `.web.` becomes the url, so `srcWeb/app/Home.html` is served as `app/Home.html`.

The build step uses the Windows executable [compress](https://github.com/dosh1974/SysWeaver/blob/main/_tools/compress/README.md) from the SysWeaver repository, so building the project requires Windows.

## Contents

| Item | Description |
|---|---|
| [`app/`](app/README.md) | The `Home` / `Welcome` pages and their style sheet |

## Relationships

- **Part of:** [FakeEmailService](../README.md)
- **Uses:** [compress](https://github.com/dosh1974/SysWeaver/blob/main/_tools/compress/README.md) (build step)
