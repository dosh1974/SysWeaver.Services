# PublishProfiles

[⬆ Properties](../README.md)

> The folder publish profile of ComfyUiService, producing a self-contained **win-x64** build.

| | |
|---|---|
| **Project** | [ComfyUiService](../../README.md) |
| **Kind** | Publish profiles |

## Purpose

Used by `dotnet publish -p:PublishProfile=<name>`, the Visual Studio publish dialog or `Build_All.bat` to produce a ready to deploy folder (the .NET runtime included, so the target machine needs no .NET installation). ReadyToRun compilation is enabled in [`ComfyUiService.csproj`](../../ComfyUiService.csproj).

## Contents

| Item | Description |
|---|---|
| [`FolderProfile.pubxml`](FolderProfile.pubxml) | Release, `net11.0`, self-contained `win-x64`, not single file, not trimmed; output to `bin\publish\win-x64\` |

## Relationships

- **Part of:** [ComfyUiService](../../README.md)
