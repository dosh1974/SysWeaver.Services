# PublishProfiles

[⬆ Properties](../README.md)

> The folder publish profile of ReverseProxyClient, producing a self-contained **win-x64** build.

| | |
|---|---|
| **Project** | [ReverseProxyClient](../../README.md) |
| **Kind** | Publish profiles |

## Purpose

Used by `dotnet publish -p:PublishProfile=<name>` or the Visual Studio publish dialog to produce a ready to deploy folder (the .NET runtime included, so the target machine needs no .NET installation). Unlike the other services, the output goes directly to `bin\publish\` (no runtime sub folder).

## Contents

| Item | Description |
|---|---|
| [`FolderProfile.pubxml`](FolderProfile.pubxml) | Release, `net10.0`, self-contained `win-x64`, ReadyToRun, not single file, not trimmed; output to `bin\publish\` |

## Relationships

- **Part of:** [ReverseProxyClient](../../README.md)
