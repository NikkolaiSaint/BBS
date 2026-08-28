# bbs.py

import os
import platform
import subprocess
from datetime import datetime


class Karen:
    """BBS built-in AI assistant."""

    def __init__(self):
        self.name = "Karen"

    def respond(self, message):
        message = message.lower().strip()

        if message in ["hello", "hi", "hey"]:
            return "Hello. I'm Karen, the AI assistant for BBS."

        if "time" in message:
            return f"The current time is {datetime.now().strftime('%H:%M:%S')}."

        if "system" in message:
            return (
                f"Operating System: {platform.system()}\n"
                f"Machine: {platform.machine()}\n"
                f"Python: {platform.python_version()}"
            )

        if "help" in message:
            return (
                "I can currently help with:\n"
                "  system  - Show system information\n"
                "  time    - Show current time\n"
                "  clear   - Clear the terminal\n"
                "  exit    - Exit BBS"
            )

        return (
            "I don't understand that request yet.\n"
            "My AI capabilities are still being developed."
        )


class BBS:
    """Main BBS ecosystem."""

    def __init__(self):
        self.name = "BBS"
        self.karen = Karen()

    def banner(self):
        print("""
╔══════════════════════════════════════════╗
║                                          ║
║                  B B S                   ║
║          DIGITAL ECOSYSTEM               ║
║                                          ║
║             KAREN AI: ONLINE             ║
║                                          ║
╚══════════════════════════════════════════╝
        """)

    def execute_command(self, command):
        command = command.strip()

        if command == "help":
            print("""
BBS Commands
────────────────────────────
help       Show commands
ai         Talk to Karen
system     System information
files      List files
clear      Clear terminal
exit       Exit BBS
            """)

        elif command == "system":
            print(f"OS: {platform.system()}")
            print(f"Machine: {platform.machine()}")
            print(f"Python: {platform.python_version()}")

        elif command == "files":
            for file in os.listdir("."):
                print(file)

        elif command == "clear":
            os.system("cls" if os.name == "nt" else "clear")

        elif command == "ai":
            self.ai_mode()

        elif command == "exit":
            print("BBS shutting down...")
            return False

        elif command:
            print(f"Unknown BBS command: {command}")
            print("Type 'help' for available commands.")

        return True

    def ai_mode(self):
        print("\nKaren AI")
        print("Type 'back' to return to BBS.\n")

        while True:
            message = input("Karen> ")

            if message.lower() == "back":
                break

            response = self.karen.respond(message)
            print(f"\n{response}\n")

    def run(self):
        self.banner()

        print("Welcome to BBS.")
        print("Type 'help' to get started.\n")

        running = True

        while running:
            try:
                command = input("BBS> ")
                running = self.execute_command(command)

            except KeyboardInterrupt:
                print("\nUse 'exit' to shut down BBS.")

            except Exception as error:
                print(f"BBS Error: {error}")


if __name__ == "__main__":
    bbs = BBS()
    bbs.run()