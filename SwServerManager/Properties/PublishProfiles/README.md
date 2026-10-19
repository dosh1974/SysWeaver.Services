# PublishProfiles

[⬆ Properties](../README.md)

> The folder publish profiles of SwServerManager, producing self-contained **win-x64** and **linux-x64** builds.

| | |
|---|---|
| **Project** | [SwServerManager](../../README.md) |
| **Kind** | Publish profiles |

## Purpose

Used by `dotnet publish -p:PublishProfile=<name>` or the Visual Studio publish dialog to produce a ready to deploy folder (the .NET runtime included, so the target machine needs no .NET installation). ReadyToRun compilation is enabled in [`SwServerManager.csproj`](../../SwServerManager.csproj).

## Contents

| Item | Description |
|---|---|
| [`Linux_x64.pubxml`](Linux_x64.pubxml) | Release, `net10.0`, self-contained `linux-x64`, not single file, not trimmed; output to `bin\publish\linux-x64\` |
| [`WIndows_x64.pubxml`](WIndows_x64.pubxml) | Release, `net10.0`, self-contained `win-x64`, not single file, not trimmed; output to `bin\publish\win-x64\` |

## Relationships

- **Part of:** [SwServerManager](../../README.md)
