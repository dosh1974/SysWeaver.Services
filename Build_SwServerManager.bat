@echo off
cd /D "%~dp0"
dotnet publish SwServerManager\SwServerManager.csproj -p:PublishProfile=WIndows_x64
dotnet publish SwServerManager\SwServerManager.csproj -p:PublishProfile=WIndows_x64
if [%1] == [] pause
