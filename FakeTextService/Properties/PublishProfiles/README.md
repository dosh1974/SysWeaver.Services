# PublishProfiles

[⬆ Properties](../README.md)

> The folder publish profile of FakeTextService, producing a self-contained **win-x64** build.

| | |
|---|---|
| **Project** | [FakeTextService](../../README.md) |
| **Kind** | Publish profiles |

## Purpose

Used by `dotnet publish -p:PublishProfile=<name>` or the Visual Studio publish dialog to produce a ready to deploy folder (the .NET runtime included, so the target machine needs no .NET installation). ReadyToRun compilation is enabled in [`FakeTextService.csproj`](../../FakeTextService.csproj).

## Contents

| Item | Description |
|---|---|
| [`FolderProfile.pubxml`](FolderProfile.pubxml) | Release, `net10.0`, self-contained `win-x64`, not single file, not trimmed; output to `bin\publish\win-x64` |

## Relationships

- **Part of:** [FakeTextService](../../README.md)
