const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {

    const window = new BrowserWindow({
        width: 700,
        height: 800,

        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    window.loadFile(
        path.join(__dirname, "src", "index.html")
    );
}

app.whenReady().then(() => {

    createWindow();

    app.on("activate", () => {

        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }

    });

});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {
        app.quit();
    }

});