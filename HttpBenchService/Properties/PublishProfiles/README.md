# PublishProfiles

[⬆ Properties](../README.md)

> The folder publish profile of HttpBenchService, producing a self-contained **win-x64** build.

| | |
|---|---|
| **Project** | [HttpBenchService](../../README.md) |
| **Kind** | Publish profiles |

## Purpose

Used by `dotnet publish -p:PublishProfile=<name>` or the Visual Studio publish dialog to produce a ready to deploy folder (the .NET runtime included, so the target machine needs no .NET installation). ReadyToRun compilation is enabled in [`HttpBenchService.csproj`](../../HttpBenchService.csproj).

## Contents

| Item | Description |
|---|---|
| [`FolderProfile.pubxml`](FolderProfile.pubxml) | Release, `net10.0`, self-contained `win-x64`, not single file, not trimmed; output to `bin\publish\win-x64` |

## Relationships

- **Part of:** [HttpBenchService](../../README.md)
