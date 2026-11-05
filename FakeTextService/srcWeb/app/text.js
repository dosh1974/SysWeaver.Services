/**
 * @file app/text.js - the Home / Welcome page of FakeTextService (app/Home.html, app/Welcome.html): send a text message that a
 * phone sends to the system, above the live table of all fake messages.
 *
 * Loading: classic `defer` script after ../sw/core.js, ../sw/ui.js and ../explore/table.js; started by `<body onload="textMain()">`.
 * Global: `textMain` (everything else is private).
 * UI (shared Sw components, styled by sw/ui.css + text.css): the Design v2 page anatomy (Sw.PageLayout fill page: the page header with
 * a one line explanation; Sw.Card "Send a text message" with the form with System (the id the
 * receiving service listens to), Phone number (with its country code) and Text (System and Phone number remembered in localStorage FakeTextSystem
 * and FakePhoneNumber; the Text is a Sw.Draft "fakeText.message", restored with "Draft restored" and cleared when sent), the button "Send message" (as the original) (Enter moves between the fields and sends from Text) and a
 * status line, then the message table (Sw.Table on ../Api/MessageTable, cards on phones; an iframe of explore/table.html when
 * explore/table.js is not available).
 * Sending posts `{PhoneNumber, Text, System}` to ../Api/FakeIncoming. The typed text is kept until the server accepted it (then it is
 * cleared, the status says so and the table shows it with its next refresh, as before). The phone number is checked by the server only
 * (as before); errors are shown in words next to the button (a phone number the server rejects marks the phone field: "Enter it with
 * its country code"), never as a raw "NetError: 500".
 */

(() => {
    "use strict";

    const el = Sw.el;

    /** The message at the phone field when the server rejected the number (also reserves its line, LAY-9). */
    const PhoneBadText = () => _TF("The phone number is not valid. Enter it with its country code, ex: +46 70 123 45 67.", "Error shown on the fake text page when the server rejected the phone number of a text sent to the system");

    /**
     * A user friendly text for a failed FakeIncoming call.
     * @param {*} e The error (a Sw.Net.Error with the server's text, or any error).
     * @returns {{Text: string, Phone: boolean}} The text and whether it's about the phone number.
     */
    function failText(e) {
        let reason = String((e && (e.Text || e.message)) || e || "").trim();
        //  The message is "NetError: 500 - Internal Server Error. <reason> [500]": keep the reason
        reason = reason.replace(/^NetError:\s*\d+\s*-\s*[^.]*\.\s*/i, "").replace(/\s*\[\d+\]\s*$/, "").trim();
        //  The service requires a role (FakeTextMessageParams.Auth, when set: not signed in (401) or not allowed (403)
        if (e && (e.Status === 401 || (Sw.Access && Sw.Access.IsDenied(e))))
            return { Phone: false, Text: _TF("You are not allowed to send text messages here. Sign in with an account that may use the fake text service.", "Error shown on the fake text page when the user is not signed in or the role may not use the fake text service") };
        if (/phone|country code|prefix/i.test(reason))
            return {
                Phone: true,
                Text: PhoneBadText(),
            };
        if (e && e.Status === 0)
            return { Phone: false, Text: _TF("Could not reach the server. Check the connection and try again.", "Error shown on the fake text page when the server could not be reached") };
        return {
            Phone: false,
            Text: _T("Could not send the text: {0}", reason || _TF("unknown error", "Fallback reason on the fake text page when no error text is known"), "Error shown on the fake text page when sending a text to the system failed, {0} is the reason"),
        };
    }

    /**
     * Page entry of app/Home.html and app/Welcome.html.
     * @returns {Promise<void>}
     */
    async function textMain() {
        const closeLoader = Sw.Page.Loading();
        try {
            const store = Sw.Storage.Local;
            //  Design v2 page anatomy (ui/page.js): a fill page with the page header, the form card and the message table taking the rest
            //  of the height. The Home page keeps the service name as its heading (not the menu name "Home", like the shared Home page);
            //  the document title stays the page's own "Home", as the original page (S5-B-1; the header would set it to the heading)
            const docTitle = document.title;
            const page = Sw.PageLayout({
                Type: "fill",
                Class: "ft-page",
                Compact: false,
                MenuTitle: false,
                Title: _TF("Fake text messages", "Heading of the fake text message service page"),
                Description: _TF("Send a text message from a phone to the system, as a customer answering it. All messages are listed below: the ones the system sent and the ones sent to it.", "Explanation below the heading of the fake text message service page"),
            });
            document.title = docTitle;
            const main = page.E;
            //  A restored draft (the Draft option of Text) calls OnInput while the fields are made: changed() acts once they are all built
            let built = false;
            /** Save the field values and update the button. */
            const changed = () => {
                if (!built)
                    return;
                store.Set("FakeTextSystem", system.Get().trim());
                store.Set("FakePhoneNumber", phone.Get().trim());
                update();
            };
            //  The message is a draft (the Draft option of the Text box); a message kept by an older version of the page is taken over once
            const oldText = store.Get("FakeTextMessage", "") || "";
            store.Remove?.("FakeTextMessage");
            const system = new Sw.TextBox({
                Label: _TF("System", 'The label of a user text input field that determines the "System" that should be used for sending this virtual text messages, this act as an id so that multiple users and apps can use the same service without "collisions"'),
                Title: _TF("Enter the identifier that the receiving service is set up to listen to", 'A tool tip description of the "System" that should be used for sending text messages, this act as an id so that multiple users and apps can use the same service without "collisions"'),
                Placeholder: _TF("Optional, ex: MyApp", "Placeholder of the System input of the fake text page"),
                Value: store.Get("FakeTextSystem", "") || "",
                OnInput: changed,
                OnEnter: () => phone.Focus(),
            });
            /** The phone number the server rejected last (null: none). */
            let badPhone = null;
            const phone = new Sw.TextBox({
                Label: _TF("Phone number", "The label of a user text input field that contains the phone number to send a virtual text message too"),
                Title: _TF("A phone number (starting with the country code) that will be used to send the virtual text message", "A tool tip description of the phone number input"),
                Placeholder: _TF("+46 70 123 45 67", "Example phone number shown as the placeholder of the phone number input of the fake text page"),
                Type: "tel",
                AutoComplete: "tel",
                Value: store.Get("FakePhoneNumber", "") || "",
                //  The server checks the number (as before); the line of its "not valid" message is there from the start, so the message moves
                //  nothing (LAY-9): Validate only repeats it for the number the server rejected
                Validate: v => (badPhone !== null && String(v).trim() === badPhone ? PhoneBadText() : null),
                Messages: [PhoneBadText()],
                OnInput: () => {
                    phone.SetError(null);
                    changed();
                },
                OnEnter: () => text.Focus(),
            });
            const text = new Sw.TextBox({
                Label: _TF("Text", "The label of a user text input field that contains a text message that can be sent to a virtual phone number (and service)"),
                Title: _TF("The text message that the phone sends", "A tool tip description of a user text input field that contains a text message that can be sent to a virtual phone number (and service)"),
                Placeholder: _TF("The message", "Placeholder of the text input of the fake text page"),
                Value: oldText,
                //  The unsent text survives a reload or a closed tab (UX guide SAF-11; "Draft restored" under the field); a drafted
                //  text is safe, so leaving does not ask (Dirty: false)
                Draft: { Context: "fakeText.message", Dirty: false },
                OnInput: changed,
                OnEnter: () => send.Click(),
            });
            const status = el("p.ft-status", { attrs: { role: "status" } });
            /**
             * Show a status line.
             * @param {string} msg The text ("" clears).
             * @param {string} [kind] "ok" or "error".
             */
            const setStatus = (msg, kind) => {
                status.textContent = msg || "";
                status.className = "ft-status" + (kind ? " ft-" + kind : "");
            };
            const send = new Sw.Button({
                Text: _TF("Send message", "The text of a button that will send some user defined text message to a service"),
                Title: _TF("Send this text from the phone number to the system", "A tool tip description of the button on the fake text page that sends a text message from a phone to the system"),
                Icon: "IconSendIt",
                Kind: "primary",
                OnClick: async () => {
                    const p = phone.Get().trim();
                    const t = text.Get().trim();
                    if (!p || !t)
                        return;
                    setStatus("");
                    try {
                        await Sw.Net.Send("../Api/FakeIncoming", { PhoneNumber: p, Text: t, System: system.Get().trim() }, { NoNavigate: true });
                    }
                    catch (e) {
                        //  Keep the typed text: fix and send again
                        const f = failText(e);
                        if (f.Phone) {
                            //  Shown at the phone field (once)
                            badPhone = p;
                            phone.SetError(f.Text);
                            phone.Focus(true);
                        }
                        else
                            setStatus(f.Text, "error");
                        return;
                    }
                    text.Set("", true);
                    text.ClearDraft?.();
                    changed();
                    setStatus(_T("Text from {0} sent to the system.", p, "Status on the fake text page after a text sent from a phone to the system was accepted, {0} is the phone number"), "ok");
                    text.Focus();
                    //  The table shows the new message with its next refresh (every 2 s), as before: no extra request
                },
            });
            /** Enable the button when a phone number and a text are entered. */
            const update = () => send.SetDisabled(!(phone.Get().trim() && text.Get().trim()), !phone.Get().trim()
                ? _TF("Enter the phone number first", "Reason of the disabled Send message button of the fake text page while the phone number is empty")
                : _TF("Enter the text first", "Reason of the disabled Send message button of the fake text page while the text is empty"));
            built = true;
            update();
            main.append(Sw.Card({
                Title: _TF("Send a text message", "Title of the form card of the fake text message service page"),
                Sub: _TF("from a phone to the system", "Sub title of the form card of the fake text message service page"),
                Class: "ft-card",
                Body: el("div.ft-form", null, system.E, phone.E, text.E, el("div.ft-actions", null, send.E, status)),
            }).E);
            //  The messages (live table, cards on phones)
            const host = el("section.ft-table.sw-fill", { attrs: { "aria-label": _TF("Messages", "Accessible name of the message table on the fake text page") } });
            main.append(host);
            //  Param: null, as the original page's framed explore/table.html request (an in-page table without a Param leaves it out)
            if (Sw.Table && Sw.Table.Create)
                await Sw.Table.Create({ Url: "../Api/MessageTable", Element: host, Param: null, Name: _TF("Messages", "Name of the message table on the fake text page (exports, charts)") });
            else {
                const f = Sw.CreateIFrame();
                f.className = "ft-frame";
                f.title = _TF("Messages", "Accessible name of the message table on the fake text page");
                f.src = "../explore/table.html?q=../Api/MessageTable";
                host.append(f);
            }
            //  Initial focus (UX guide FOC-2): the field to fill, but on touch no text field (it would open the on-screen keyboard)
            const first = phone.Get() ? text : phone;
            if (Sw.Page.InitialFocus)
                Sw.Page.InitialFocus(first.Input);
            else if (!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches))
                first.Focus();
        }
        catch (e) {
            Sw.Fail(e && e.message ? e.message : String(e));
        }
        finally {
            closeLoader();
        }
    }

    window.textMain = textMain;
})();
