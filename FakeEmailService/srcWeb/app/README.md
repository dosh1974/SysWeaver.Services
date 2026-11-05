# app

[⬆ srcWeb](../README.md)

> The `Home` and `Welcome` pages of FakeEmailService, served as `app/Home.html` and `app/Welcome.html`; both forward to the fake inbox.

| | |
|---|---|
| **Project** | [FakeEmailService](../../README.md) |
| **Kind** | Embedded web assets |

## Purpose

The SysWeaver HTTP server ([SysWeaver.HttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpServer/README.md)) has built-in `Welcome` and `Home` web menu entries that open `app/Welcome.html` and `app/Home.html`, and ships default versions of these pages. These files are the service's own versions: each page forwards (meta refresh) to `../fakeEmail/index.html`, the inbox UI of [SysWeaver.Email.Fake](https://github.com/dosh1974/SysWeaver/blob/main/Communication/SysWeaver.Email.Fake/README.md). Forwarding keeps one frame in the shell, so the inbox title, breadcrumb and deep links are its own.

At build time the files are minified, Brotli compressed into `web/app` and embedded (see [srcWeb](../README.md)).

## Contents

| Item | Description |
|---|---|
| [`Home.html`](Home.html) | Home page: forwards to `../fakeEmail/index.html` |
| [`Welcome.html`](Welcome.html) | Welcome page: identical to `Home.html` apart from the title |

## Relationships

- **Part of:** [FakeEmailService](../../README.md)
- **Shows:** the inbox of [SysWeaver.Email.Fake](https://github.com/dosh1974/SysWeaver/blob/main/Communication/SysWeaver.Email.Fake/README.md)
- **Related:** the default pages in [SysWeaver.HttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpServer/README.md) (`srcWeb/app`)
