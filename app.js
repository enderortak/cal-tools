const url = require("url");
const path = require("path");
const { BrowserWindow, app, createWindow, ipcMain } = require("electron");
// const { client } = require("electron-connect");
const isDev = process.env.NODE_ENV === "development";

let mainWindow;

const mainWindowOptions = {
    width: 800,
    height: 600,
    backgroundColor: '#F9F9FF',
    show: false,
    frame: false,
    resizable: true,
    "node-integration": "iframe", // and this line
    "web-preferences": {
      "web-security": false,
    },
}

const appLocation = 
isDev ?
"http://localhost:9000" 
:
url.format({
  pathname: path.join(__dirname, 'dist/index.html'),
  protocol: 'file:',
  slashes: true,
});

app.commandLine.appendSwitch("disable-web-security");

app.on("ready", () => {
    mainWindow = new BrowserWindow(mainWindowOptions);
    mainWindow.loadURL(appLocation);
    
    mainWindow.on("maximize", () => { mainWindow.webContents.send("maximize"); });
    mainWindow.on("unmaximize", () => { mainWindow.webContents.send("restore"); });
    mainWindow.once('ready-to-show', () => { mainWindow.show(); /* win.webContents.openDevTools(); */ });
    mainWindow.on('closed', () => { mainWindow = null; process.exit(); });

    if (isDev) {
        mainWindow.webContents.openDevTools();
        // client.create(mainWindow);
    }
    
});

