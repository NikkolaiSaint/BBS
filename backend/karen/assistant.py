from karen.tools import system_status


class Karen:

    def __init__(self):
        self.name = "Karen"

    def respond(self, message):

        message = message.lower().strip()

        # -----------------------------------------
        # Greetings
        # -----------------------------------------

        if message in ["hello", "hi", "hey"]:
            return "Hello. I'm Karen, the AI assistant for BBS."


        # -----------------------------------------
        # Identity
        # -----------------------------------------

        if "who are you" in message:

            return (
                "I'm Karen, the artificial intelligence "
                "integrated into BBS."
            )


        # -----------------------------------------
        # BBS
        # -----------------------------------------

        if "what is bbs" in message:

            return (
                "BBS is a terminal-based digital ecosystem "
                "with Karen as its integrated AI assistant."
            )


        # -----------------------------------------
        # SYSTEM DIAGNOSTICS
        # -----------------------------------------

        if (
            "check system" in message
            or "system status" in message
            or "system diagnostics" in message
            or "check my computer" in message
        ):

            return self.check_system()


        # -----------------------------------------
        # Default
        # -----------------------------------------

        return (
            "I understand your request, but I don't "
            "have a tool for that yet."
        )


    def check_system(self):

        status = system_status()

        return (
            "SYSTEM DIAGNOSTICS\n"
            "────────────────────────\n"
            f"OS: {status['os']}\n"
            f"Machine: {status['machine']}\n"
            f"CPU Usage: {status['cpu_percent']}%\n"
            f"Memory Usage: {status['memory_percent']}%\n"
            f"Disk Usage: {status['disk_percent']}%\n"
        )