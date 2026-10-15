# app

[⬆ srcWeb](../README.md)

> The `Home` and `Welcome` pages of FakeEmailService, served as `app/Home.html` and `app/Welcome.html`; both show the fake inbox full screen.

| | |
|---|---|
| **Project** | [FakeEmailService](../../README.md) |
| **Kind** | Embedded web assets |

## Purpose

The SysWeaver HTTP server ([SysWeaver.HttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpServer/README.md)) has built-in `Welcome` and `Home` web menu entries that open `app/Welcome.html` and `app/Home.html`, and ships default versions of these pages. These files are the service's own versions: each page only holds an `iframe` that fills the window with `../fakeEmail/index.html`, the inbox UI of [SysWeaver.Email.Fake](https://github.com/dosh1974/SysWeaver/blob/main/Communication/SysWeaver.Email.Fake/README.md). The pages also reference the server's standard icons and `app/manifest.json`.

At build time the files are minified, Brotli compressed into `web/app` and embedded (see [srcWeb](../README.md)).

## Contents

| Item | Description |
|---|---|
| [`Home.html`](Home.html) | Home page: a full window `iframe` showing `../fakeEmail/index.html` |
| [`Welcome.html`](Welcome.html) | Welcome page: identical to `Home.html` apart from the title |
| [`email.css`](email.css) | Removes margins and scroll bars and makes the `iframe` fill the page |

## Relationships

- **Part of:** [FakeEmailService](../../README.md)
- **Shows:** the inbox of [SysWeaver.Email.Fake](https://github.com/dosh1974/SysWeaver/blob/main/Communication/SysWeaver.Email.Fake/README.md)
- **Related:** the default pages in [SysWeaver.HttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpServer/README.md) (`srcWeb/app`)
