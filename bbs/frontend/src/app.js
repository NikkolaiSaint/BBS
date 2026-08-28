const input = document.getElementById("command-input");
const output = document.getElementById("terminal-output");

// --------------------------------------------------
// BBS ASCII LOGO
// --------------------------------------------------

const BBS_ASCII = `
██████╗ ██████╗ ███████╗
██╔══██╗██╔══██╗██╔════╝
██████╔╝██████╔╝███████╗
██╔══██╗██╔══██╗╚════██║
██████╔╝██████╔╝███████║
╚═════╝ ╚═════╝ ╚══════╝
`;


// --------------------------------------------------
// BBS STARTUP
// --------------------------------------------------

function boot() {
    addOutput(BBS_ASCII);

    addOutput("BBS DIGITAL ECOSYSTEM");
    addOutput("────────────────────────────");
    addOutput("CORE ............... ONLINE");
    addOutput("KAREN AI ........... ONLINE");
    addOutput("TERMINAL ........... ONLINE");
    addOutput("");

    addOutput("Welcome to BBS.");
    addOutput("Type 'help' for available commands.");
    addOutput("");
}


// --------------------------------------------------
// BBS COMMANDS
// --------------------------------------------------

const commands = {

    help: () => [
        "",
        "BBS COMMANDS",
        "────────────────────────",
        "help       Show commands",
        "system     System information",
        "version    BBS version",
        "karen      Talk to Karen",
        "about      About BBS",
        "clear      Clear terminal",
        "home       Return to home",
        "exit       Close BBS",
        ""
    ],

    system: () => [
        "",
        "BBS SYSTEM",
        "────────────────────────",
        `Platform: ${navigator.platform}`,
        "Runtime: Electron",
        "Core: ONLINE",
        "Karen: CONNECTED",
        ""
    ],

    version: () => [
        "",
        "BBS DIGITAL ECOSYSTEM",
        "Version: 0.1.0",
        "Karen AI: Development",
        ""
    ],

    about: () => [
        "",
        "ABOUT BBS",
        "────────────────────────",
        "BBS is a terminal-based digital ecosystem.",
        "Karen is the integrated AI assistant.",
        ""
    ],

    clear: () => {
        output.innerHTML = "";
        return [];
    },

    home: () => {
        output.innerHTML = "";
        boot();
        return [];
   },

    exit: () => {
        window.close();
        return [];
    }

};


// --------------------------------------------------
// TERMINAL INPUT
// --------------------------------------------------

input.addEventListener("keydown", async (event) => {

    if (event.key !== "Enter") {
        return;
    }

    const command = input.value.trim();

    if (!command) {
        return;
    }

    // Display user's command
    addOutput(`BBS> ${command}`);

    // Clear input box
    input.value = "";

    // Execute command
    await executeCommand(command);
});


// --------------------------------------------------
// COMMAND EXECUTOR
// --------------------------------------------------

async function executeCommand(command) {

    const parts = command.split(" ");

    const mainCommand = parts[0].toLowerCase();

    const argument = parts.slice(1).join(" ");

    // ----------------------------------------------
    // KAREN COMMAND
    // ----------------------------------------------

    if (mainCommand === "karen") {

        if (!argument) {

            addOutput("");
            addOutput("KAREN");
            addOutput("────────────────────────");
            addOutput("Usage: karen <message>");
            addOutput("");
            addOutput("Example:");
            addOutput("BBS> karen hello");
            addOutput("");

            return;
        }

        await askKaren(argument);

        return;
    }


    // ----------------------------------------------
    // NORMAL BBS COMMAND
    // ----------------------------------------------

    if (commands[mainCommand]) {

        const result = commands[mainCommand]();

        result.forEach((line) => {
            addOutput(line);
        });

        return;
    }


    // ----------------------------------------------
    // UNKNOWN COMMAND
    // ----------------------------------------------

    addOutput("");
    addOutput(`Command not found: ${mainCommand}`);
    addOutput("Type 'help' for available commands.");
    addOutput("");
}


// --------------------------------------------------
// KAREN API
// --------------------------------------------------

async function askKaren(message) {

    addOutput("");
    addOutput("KAREN> Connecting to BBS Core...");
    addOutput("");

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/karen",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );


        // Check for HTTP errors
        if (!response.ok) {
            throw new Error(
                `Server returned ${response.status}`
            );
        }


        // Convert response to JSON
        const data = await response.json();


        // Display Karen's response
        addOutput(`KAREN> ${data.response}`);
        addOutput("");


    } catch (error) {

        console.error("Karen connection error:", error);

        addOutput(
            "KAREN ERROR: Unable to connect to BBS Core."
        );

        addOutput(
            "Make sure FastAPI is running on port 8000."
        );

        addOutput("");

    }
}


// --------------------------------------------------
// TERMINAL OUTPUT
// --------------------------------------------------

function addOutput(text) {

    const line = document.createElement("div");

    line.textContent = text;

    output.appendChild(line);

    // Automatically scroll to bottom
    output.scrollTop = output.scrollHeight;

    window.scrollTo(
        0,
        document.body.scrollHeight
    );
}


// --------------------------------------------------
// START BBS
// --------------------------------------------------

boot();