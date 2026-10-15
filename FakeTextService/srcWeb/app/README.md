# app

[⬆ srcWeb](../README.md)

> The `Home` and `Welcome` pages of FakeTextService, served as `app/Home.html` and `app/Welcome.html`: a form that sends a fake incoming text message, above a live table of the messages.

| | |
|---|---|
| **Project** | [FakeTextService](../../README.md) |
| **Kind** | Embedded web assets |

## Purpose

The SysWeaver HTTP server ([SysWeaver.HttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpServer/README.md)) has built-in `Welcome` and `Home` web menu entries that open `app/Welcome.html` and `app/Home.html`, and ships default versions of these pages. These files are the service's own versions, built with the standard SysWeaver web UI script and theme (`../common/common.js`, `../common/theme.css`).

`text.js` (`textMain`, run on load) builds the page:

- inputs for **System** (an identifier, so several users and apps can share the service), **Phone number** and **Text**, remembered in the browser's `localStorage`
- a **Send message** button (enabled when a phone number and a text are entered; Enter moves between the fields and sends) that posts `{ PhoneNumber, Text, System }` to `../Api/FakeIncoming`
- an `iframe` below with the message table `../explore/table.html?q=../Api/MessageTable`

The APIs come from [SysWeaver.TextMessage.Fake](https://github.com/dosh1974/SysWeaver/blob/main/Communication/SysWeaver.TextMessage.Fake/README.md). The user visible texts use `_TF` / `_T` with translator context descriptions.

At build time the files are minified, Brotli compressed into `web/app` and embedded (see [srcWeb](../README.md)).

## Contents

| Item | Description |
|---|---|
| [`Home.html`](Home.html) | Home page: loads `common.js`, `text.js` and the style sheets and calls `textMain()` on load |
| [`Welcome.html`](Welcome.html) | Welcome page: identical to `Home.html` apart from the title |
| [`text.js`](text.js) | Builds the send form and the message table, sends messages to `../Api/FakeIncoming` |
| [`text.css`](text.css) | Styles of the inputs, button, labels and the message table `iframe` (using the theme variables) |

## Relationships

- **Part of:** [FakeTextService](../../README.md)
- **Uses:** the APIs of [SysWeaver.TextMessage.Fake](https://github.com/dosh1974/SysWeaver/blob/main/Communication/SysWeaver.TextMessage.Fake/README.md), the standard web UI of [SysWeaver.HttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpServer/README.md)
- **Related:** the default pages in [SysWeaver.HttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpServer/README.md) (`srcWeb/app`)
