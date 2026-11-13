# HttpBenchService

[⬆ SysWeaver.Services overview](../README.md)

> A service host for the HTTP bench: performance tests a SysWeaver web server from a web page (many workers call a selection of public end points for a while, then a report with SysWeaver tables and charts).

| | |
|---|---|
| **Kind** | Service host (exe) |
| **Service** | [SysWeaver.HttpBench](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpBench/README.md) (`SysWeaver.HttpBench.HttpBenchService, SysWeaver.HttpBench`), the tests run in [SysWeaver.HttpBench.Core](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpBench.Core/README.md) |
| **Page** | `httpbench/bench.html`, menu *Debug / HTTP bench* |
| **Api** | `Api/httpbench/...` |

## Running

```bat
dotnet run --project HttpBenchService -- debug
```

The host needs no elevation: it listens on `http://localhost:7480/` (see `HttpBenchService.Services.json`). Open <http://localhost:7480/httpbench/bench.html>, or the app shell and *Debug / HTTP bench*.
The host runs the same services as SwServerManager (except the folder sync and server manager), so it can also test itself (the workers then share the cpu with the server).

The page, the end points and the service parameters are described in [SysWeaver.HttpBench](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpBench/README.md). To run tests without a page (scripts, CI), use the [HttpBench](https://github.com/dosh1974/SysWeaver.Tools/blob/main/HttpBench/README.md) console tool: it reads the parameter files that the page exports.

## Files

| File | |
|---|---|
| `HttpBenchServiceProgram.cs` | The service host entry point |
| `HttpBenchService.Services.json` | The services (a developer config: the bench service has `"Auth": null`, anyone may run tests) |
| [`Properties/`](Properties/README.md) | The debug launch settings (`debug`) and a folder publish profile (self-contained win-x64) |
