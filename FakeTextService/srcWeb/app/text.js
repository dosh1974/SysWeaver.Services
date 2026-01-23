

async function textMain() {
    const page = document.body;
    const closeLoader = AddLoading(page);
    try {

        const p = document.createElement("SysWeaver-Page");
        page.appendChild(p);

        //  System
        const sl = document.createElement("SysWeaver-Label");
        sl.innerText = _TF("System", 'The label of a user text input field that determines the "System" that should be used for sending this virtual text messages, this act as an id so that multiple users and apps can use the same service without "collisions"');
        sl.title = _TF("Enter the identifier that the receiving service is set up to listen to", 'A tool tip description of the "System" that should be used for sending text messages, this act as an id so that multiple users and apps can use the same service without "collisions"');
        p.appendChild(sl);

        const si = document.createElement("input");
        si.type = "text";
        si.value = localStorage.getItem("FakeTextSystem") ?? "";
        p.appendChild(si);

        //  Phone number
        const pl = document.createElement("SysWeaver-Label");
        pl.innerText = _TF("Phone number", 'The label of a user text input field that contains the phone number to send a virtual text message too');
        pl.title = _TF("A phone number (starting with the country code) that will be used to send the virtual text message", 'A tool tip description of the phone number input');
        p.appendChild(pl);

        const pi = document.createElement("input");
        pi.type = "tel";
        pi.value = localStorage.getItem("FakePhoneNumber") ?? "";
        p.appendChild(pi);

        //  Text
        const tl = document.createElement("SysWeaver-Label");
        tl.innerText = _TF("Text", "The label of a user text input field that contains a text message that can be sent to a virtual phone number (and service)");
        tl.title = _TF("The text message to send", "A tool tip description of a user text input field that contains a text message that can be sent to a virtual phone number (and service)");
        p.appendChild(tl);

        const ti = document.createElement("input");
        ti.type = "text";
        ti.value = localStorage.getItem("FakeTextMessage") ?? "";
        p.appendChild(ti);





        const sb = document.createElement("button");
        sb.innerText = _TF("Send message", "The text of a button that will send some user defined text message to a service");
        sb.title = _TF("Click to send the message to the entered phone number and system", "A tool tip description of a button that will send some user defined text message to a service");
        p.appendChild(sb);


        const msgList = createIFrame();
        msgList.src = "../explore/table.html?q=../Api/MessageTable";
        page.appendChild(msgList);


        function CheckEnabled() {
            const system = si.value.trim();
            const phone = pi.value.trim();
            const text = ti.value.trim();
            localStorage.setItem("FakeTextSystem", system);
            localStorage.setItem("FakePhoneNumber", phone);
            localStorage.setItem("FakeTextMessage", text);
            const enabled = (phone.length > 0) && (text.length > 0);
            sb.disabled = !enabled;
        }


        CheckEnabled();
        pi.oninput = CheckEnabled;
        pi.onchange = CheckEnabled;
        ti.oninput = CheckEnabled;
        ti.onchange = CheckEnabled;

        async function Send() {
            const system = si.value.trim();
            const phone = pi.value.trim();
            const text = ti.value.trim();
            ti.value = "";
            CheckEnabled();
            try {

                await sendRequest("../Api/FakeIncoming",
                    {
                        PhoneNumber: phone,
                        Text: text,
                        System: system
                    });
            }
            catch (e) {
                Fail(_T("Failed to send message.\n{0}", e, "An error message that is shown when the back end failed to send a text message. {0} is replaced with the text of a java script exception"));
            }
            ti.focus();
        }

        si.onkeyup = ev => {
            if (ev.key === "Enter") {
                if (isPureClick(ev)) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    pi.focus();
                }
            }
        }

        pi.onkeyup = ev => {
            if (ev.key === "Enter") {
                if (isPureClick(ev)) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    ti.focus();
                }
            }
        }

        ti.onkeyup = async ev => {
            if (ev.key === "Enter") {
                if (isPureClick(ev)) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    await Send();
                }
            }
        }

        sb.onclick = async ev => {
            if (badClick(ev))
                return;
            await Send();
        };

        if (pi.value)
            ti.focus();
        else
            pi.focus();

        closeLoader();
    }
    catch (e) {
        Fail(e);
        closeLoader();
    }


}