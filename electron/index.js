import { app, BrowserWindow, ipcMain } from "electron";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js')
        // }
    });

    // const distPath = path.join(__dirname, './dist/index.html');
    // console.log('distPath', distPath)
    // win.loadFile(path.join(__dirname, '../dist/index.html'));
    loadURL(`file://${path.join(__dirname, "../dist/index.html")}`);
    // win.loadURL('http://localhost:9000') 
    // Open the DevTools by default
    win.webContents.openDevTools();
};
console.log('path.join(__dirname, "preload.js")', path.join(__dirname, "preload.js"))

app.whenReady().then(() => {
    ipcMain.handle('ping', () => {
        console.log('ping handler has been called')
        const response = 'pong'
        console.log('Sending response:', response)
        return response
    })
    console.log('Ping handler registered'); // 确认注册成功
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});


app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
