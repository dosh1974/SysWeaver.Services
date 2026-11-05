# app

[⬆ srcWeb](../README.md)

> The `Home` and `Welcome` pages of FakeTextService, served as `app/Home.html` and `app/Welcome.html`: a form that sends a text message from a phone to the system (as a customer answering it), above a live table of the messages.

| | |
|---|---|
| **Project** | [FakeTextService](../../README.md) |
| **Kind** | Embedded web assets |

## Purpose

The SysWeaver HTTP server ([SysWeaver.HttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpServer/README.md)) has built-in `Welcome` and `Home` web menu entries that open `app/Welcome.html` and `app/Home.html`, and ships default versions of these pages. These files are the service's own versions, built on the standard SysWeaver web UI (new format: `../sw/core.js`, `../sw/ui.js`, `../common/theme.css`, `../sw/ui.css`; migrated from the old `../common/common.js` with `SwWeb migrate`).

`text.js` (`textMain`, run on load) builds the page from the shared Sw components (no own button / input / body rules, so it has the system look in all themes and sizes):

- the Design v2 page anatomy (`Sw.PageLayout` fill page): the page header "Fake text messages" (the service name, not the menu name "Home") and a one line explanation (send a text from a phone to the system; the table lists the texts the system sent and the ones sent to it)
- `Sw.TextBox` fields **System** (an identifier, so several users and apps can share the service; optional), **Phone number** (with the country code) and **Text**, System and Phone number remembered in the browser's `localStorage` (`FakeTextSystem`, `FakePhoneNumber`), the Text kept as a draft (`Sw.Draft` "fakeText.message": restored with "Draft restored (saved 10:42)" and Discard draft, cleared when it was received; an older `FakeTextMessage` is taken over once); side by side on wide screens, stacked on phones; on low screens (phones in landscape, max-height 500 px) the explanation is left out and the button joins the row of the fields, so the message list gets most of the height
- the primary button **Send message** (as the original) (enabled when a phone number and a text are entered; Enter moves between the fields and sends from Text) that posts `{ PhoneNumber, Text, System }` to `../Api/FakeIncoming`. The typed text is kept until the server accepted it (then it is cleared, the status line says "Text from <phone> received." and the table shows it with its next refresh, as before: no extra request); the phone number is checked by the server only, as before (it also takes a number without "+", ex: "46701234567"); a rejected phone number is explained at the phone field ("The phone number is not valid. Enter it with its country code, ex: +46 70 123 45 67."), other failures in the status line in words, never a raw "NetError: 500"
- the live message table (`Sw.Table` on `../Api/MessageTable` from `../explore/table.js` / `table.css`, cards on phones; it sends `Param: null` like the original page's framed table; an `iframe` of `../explore/table.html?q=../Api/MessageTable` only when table.js is missing)

The APIs come from [SysWeaver.TextMessage.Fake](https://github.com/dosh1974/SysWeaver/blob/main/Communication/SysWeaver.TextMessage.Fake/README.md). The user visible texts use `_TF` / `_T` with translator context descriptions.

At build time the files are minified, Brotli compressed into `web/app` and embedded (see [srcWeb](../README.md)).

## Contents

| Item | Description |
|---|---|
| [`Home.html`](Home.html) | Home page: loads `sw/core.js`, `sw/ui.js`, `explore/table.js`, `text.js` and the style sheets (`common/theme.css`, `sw/ui.css`, `explore/table.css`, `text.css`) and calls `textMain()` on load |
| [`Welcome.html`](Welcome.html) | Welcome page: identical to `Home.html` apart from the title |
| [`text.js`](text.js) | Builds the form and the message table, sends texts from a phone to the system with `../Api/FakeIncoming` |
| [`text.css`](text.css) | Page layout only (`ft-*` classes: the form card, form grid, status line, the table filling the height; phones / low screens scroll as a whole); the page header, card and controls are the shared ui components |

## Relationships

- **Part of:** [FakeTextService](../../README.md)
- **Uses:** the APIs of [SysWeaver.TextMessage.Fake](https://github.com/dosh1974/SysWeaver/blob/main/Communication/SysWeaver.TextMessage.Fake/README.md), the standard web UI of [SysWeaver.HttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpServer/README.md)
- **Related:** the default pages in [SysWeaver.HttpServer](https://github.com/dosh1974/SysWeaver/blob/main/SysWeaver.HttpServer/README.md) (`srcWeb/app`)
