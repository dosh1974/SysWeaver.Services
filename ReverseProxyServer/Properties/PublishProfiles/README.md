# PublishProfiles

[⬆ Properties](../README.md)

> The folder publish profile of ReverseProxyServer, producing a self-contained **win-x64** build.

| | |
|---|---|
| **Project** | [ReverseProxyServer](../../README.md) |
| **Kind** | Publish profiles |

## Purpose

Used by `dotnet publish -p:PublishProfile=<name>` or the Visual Studio publish dialog to produce a ready to deploy folder (the .NET runtime included, so the target machine needs no .NET installation).

## Contents

| Item | Description |
|---|---|
| [`FolderProfile.pubxml`](FolderProfile.pubxml) | Release, `net10.0`, self-contained `win-x64`, ReadyToRun, not single file, not trimmed; output to `bin\publish\win-x64` |

## Relationships

- **Part of:** [ReverseProxyServer](../../README.md)
