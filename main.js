//carrega a janela do app
const { app, BrowserWindow } = require("electron");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        //icone a baixo 
        icon:__dirname + '/assets/calendar.png',
        webPreferences: {
            nodeIntegration: true
        }
    });
    
// Fechar o app corretamente quando o usuário sai
mainWindow.loadFile("./pages/index.html");
    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });
});
