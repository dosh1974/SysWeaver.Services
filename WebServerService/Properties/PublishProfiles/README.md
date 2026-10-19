# PublishProfiles

[⬆ Properties](../README.md)

> The folder publish profile of WebServiceServer, producing a self-contained **win-x64** build.

| | |
|---|---|
| **Project** | [WebServerService](../../README.md) |
| **Kind** | Publish profiles |

## Purpose

Used by `dotnet publish -p:PublishProfile=<name>` or the Visual Studio publish dialog to produce a ready to deploy folder (the .NET runtime included, so the target machine needs no .NET installation). ReadyToRun compilation is enabled in [`WebServiceServer.csproj`](../../WebServiceServer.csproj). Note that the output folder is named `win-x86` although the runtime identifier is `win-x64`.

## Contents

| Item | Description |
|---|---|
| [`FolderProfile.pubxml`](FolderProfile.pubxml) | Release, `net10.0`, self-contained `win-x64`, not single file, not trimmed; output to `bin\publish\win-x86\` |

## Relationships

- **Part of:** [WebServerService](../../README.md)
