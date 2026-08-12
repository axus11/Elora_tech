/* =====================================================
   ELORA AI CHATBOT
   Frontend Assistant
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const aiButton =
        document.getElementById("elora-ai-button");

    const aiChat =
        document.getElementById("elora-ai-chat");

    const aiClose =
        document.getElementById("elora-ai-close");

    const aiInput =
        document.getElementById("elora-ai-input");

    const aiSend =
        document.getElementById("elora-ai-send");

    const aiMessages =
        document.getElementById("elora-ai-messages");

    const typing =
        document.getElementById("elora-ai-typing");

    const quickActions =
        document.querySelectorAll(
            ".ai-quick-actions button"
        );


    if (
        !aiButton ||
        !aiChat ||
        !aiInput ||
        !aiSend ||
        !aiMessages
    ) {
        return;
    }


    /* =================================================
       OPEN CHAT
    ================================================= */

    function openChat() {

        aiChat.classList.add("active");

        aiChat.setAttribute(
            "aria-hidden",
            "false"
        );

        setTimeout(() => {

            aiInput.focus();

        }, 300);

    }


    /* =================================================
       CLOSE CHAT
    ================================================= */

    function closeChat() {

        aiChat.classList.remove("active");

        aiChat.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    aiButton.addEventListener(
        "click",
        openChat
    );


    aiClose.addEventListener(
        "click",
        closeChat
    );


    /* =================================================
       CLOSE WITH ESC
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                aiChat.classList.contains("active")
            ) {

                closeChat();

            }

        }
    );


    /* =================================================
       SCROLL CHAT
    ================================================= */

    function scrollChat() {

        aiMessages.scrollTop =
            aiMessages.scrollHeight;

    }


    /* =================================================
       ADD USER MESSAGE
    ================================================= */

    function addUserMessage(text) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "user-message";


        wrapper.innerHTML = `

            <div class="message-content">

                <p></p>

            </div>

        `;


        wrapper
            .querySelector("p")
            .textContent = text;


        aiMessages.appendChild(
            wrapper
        );


        scrollChat();

    }


    /* =================================================
       ADD AI MESSAGE
    ================================================= */

    function addAIMessage(text) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "ai-message";


        const avatar =
            document.createElement("div");

        avatar.className =
            "message-avatar";


        avatar.innerHTML =
            '<i class="fas fa-robot"></i>';


        const content =
            document.createElement("div");

        content.className =
            "message-content";


        const paragraph =
            document.createElement("p");


        /*
         * Convert safe basic formatting.
         */

        paragraph.textContent =
            text;


        const time =
            document.createElement("span");

        time.className =
            "message-time";

        time.textContent =
            "ELORA AI";


        content.appendChild(
            paragraph
        );

        content.appendChild(
            time
        );


        wrapper.appendChild(
            avatar
        );

        wrapper.appendChild(
            content
        );


        aiMessages.appendChild(
            wrapper
        );


        scrollChat();

    }


    /* =================================================
       TYPING
    ================================================= */

    function showTyping() {

        typing.classList.add(
            "active"
        );

        scrollChat();

    }


    function hideTyping() {

        typing.classList.remove(
            "active"
        );

    }


    /* =================================================
       ELORA KNOWLEDGE BASE
    ================================================= */

    function getELORAResponse(question) {

        const q =
            question
                .toLowerCase()
                .trim();


        /* ---------------------------------------------
           GREETING
        --------------------------------------------- */

        if (
            q.includes("hello") ||
            q.includes("hi") ||
            q.includes("hey") ||
            q.includes("yo")
        ) {

            return `
Hello 👋 I'm ELORA AI.

Welcome to ELORA Tech.

I can help you learn about our mission, services, projects, values, and how to become part of ELORA.
            `.trim();

        }


        /* ---------------------------------------------
           WHAT IS ELORA
        --------------------------------------------- */

        if (
            q.includes("what is elora") ||
            q.includes("who is elora") ||
            q.includes("about elora") ||
            q.includes("elora tech")
        ) {

            return `
ELORA Tech stands for "Logical Architecture for Global Solutions."

We are a youth-driven technology and innovation movement focused on using artificial intelligence, technology, and global collaboration to create meaningful solutions for real-world challenges.

Our vision is to connect innovators, students, professionals, researchers, entrepreneurs, and institutions through one collaborative ecosystem.
            `.trim();

        }


        /* ---------------------------------------------
           MISSION
        --------------------------------------------- */

        if (
            q.includes("mission") ||
            q.includes("goal") ||
            q.includes("purpose")
        ) {

            return `
ELORA's mission is built around three major pillars:

Innovation — developing breakthrough technologies that address real-world challenges.

Collaboration — connecting people and organizations so knowledge and ideas can move further.

Ethics — promoting responsible technology that benefits humanity.
            `.trim();

        }


        /* ---------------------------------------------
           SERVICES
        --------------------------------------------- */

        if (
            q.includes("service") ||
            q.includes("services") ||
            q.includes("what do you do")
        ) {

            return `
ELORA Tech focuses on technology and digital innovation.

Our areas can include AI solutions, software development, digital transformation, intelligent systems, research, automation, and technology-driven projects.

Visit the Services page to explore the services ELORA offers.
            `.trim();

        }


        /* ---------------------------------------------
           PROJECTS
        --------------------------------------------- */

        if (
            q.includes("project") ||
            q.includes("projects") ||
            q.includes("built")
        ) {

            return `
ELORA Tech develops technology projects designed to solve practical problems and create meaningful impact.

Our projects can involve artificial intelligence, software, automation, intelligent systems, digital platforms, and other emerging technologies.

Check the Projects page to explore our work.
            `.trim();

        }


        /* ---------------------------------------------
           VALUES
        --------------------------------------------- */

        if (
            q.includes("value") ||
            q.includes("values") ||
            q.includes("believe")
        ) {

            return `
ELORA is guided by five core values:

🌍 Global Impact
🤝 Collaboration
💡 Innovation
🚀 Progress
🌱 Sustainability

These principles shape how we approach technology and collaboration.
            `.trim();

        }


        /* ---------------------------------------------
           JOIN
        --------------------------------------------- */

        if (
            q.includes("join") ||
            q.includes("become part") ||
            q.includes("membership") ||
            q.includes("work with elora")
        ) {

            return `
You can become part of ELORA by visiting our Join page.

ELORA welcomes people who are interested in technology, innovation, AI, research, entrepreneurship, collaboration, and building solutions for the future.

Click "Join ELORA" in the navigation to continue.
            `.trim();

        }


        /* ---------------------------------------------
           AI
        --------------------------------------------- */

        if (
            q.includes("artificial intelligence") ||
            q.includes("ai")
        ) {

            return `
Artificial intelligence is one of ELORA Tech's major areas of focus.

We believe AI should be developed responsibly and used to empower people, improve systems, solve meaningful problems, and create opportunities for global collaboration.
            `.trim();

        }


        /* ---------------------------------------------
           CONTACT
        --------------------------------------------- */

        if (
            q.includes("contact") ||
            q.includes("email") ||
            q.includes("reach")
        ) {

            return `
You can contact ELORA Tech through the Contact page.

Open the Contact section from the navigation menu to find the available ways to reach the team.
            `.trim();

        }


        /* ---------------------------------------------
           TECHNOLOGY
        --------------------------------------------- */

        if (
            q.includes("technology") ||
            q.includes("tech")
        ) {

            return `
ELORA Tech explores modern technologies including artificial intelligence, software engineering, automation, digital systems, and emerging technologies.

Our goal is not technology for technology's sake — it is technology designed to create useful solutions.
            `.trim();

        }


        /* ---------------------------------------------
           THANK YOU
        --------------------------------------------- */

        if (
            q.includes("thank") ||
            q.includes("thanks")
        ) {

            return `
You're welcome! 😎

If you want to know more about ELORA Tech, ask me anything about our mission, projects, services, values, or joining ELORA.
            `.trim();

        }


        /* ---------------------------------------------
           DEFAULT
        --------------------------------------------- */

        return `
That's an interesting question.

I'm currently focused on helping visitors understand ELORA Tech, including our mission, services, projects, values, AI work, and how to join.

Try asking:

"What is ELORA Tech?"
"What services do you provide?"
"What is ELORA's mission?"
"What projects do you build?"
"How can I join ELORA?"
        `.trim();

    }


    /* =================================================
       SEND MESSAGE
    ================================================= */

    async function sendMessage(text = null) {

        const message =
            text ||
            aiInput.value.trim();


        if (!message) {
            return;
        }


        addUserMessage(
            message
        );


        aiInput.value = "";

        aiSend.disabled = true;


        showTyping();


        /*
         * Simulate AI thinking.
         * Replace this section with your
         * backend API later.
         */

        const thinkingTime =
            Math.min(
                1800,
                Math.max(
                    600,
                    message.length * 15
                )
            );


        setTimeout(() => {

            const response =
                getELORAResponse(
                    message
                );


            hideTyping();

            addAIMessage(
                response
            );


            aiSend.disabled =
                false;


            aiInput.focus();

        }, thinkingTime);

    }


    /* =================================================
       SEND BUTTON
    ================================================= */

    aiSend.addEventListener(
        "click",
        () => {

            sendMessage();

        }
    );


    /* =================================================
       ENTER KEY
    ================================================= */

    aiInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );


    /* =================================================
       QUICK QUESTIONS
    ================================================= */

    quickActions.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const question =
                        button.dataset.question;

                    sendMessage(
                        question
                    );

                }
            );

        }
    );


    /* =================================================
       WELCOME AUTO OPEN
    ================================================= */

    setTimeout(() => {

        /*
         * Don't automatically open the
         * chatbot on mobile.
         */

        if (
            window.innerWidth > 700 &&
            !sessionStorage.getItem(
                "eloraAISeen"
            )
        ) {

            openChat();

            sessionStorage.setItem(
                "eloraAISeen",
                "true"
            );

        }

    }, 3500);


});