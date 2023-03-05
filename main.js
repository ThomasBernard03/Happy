const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const windowStateKeeper = require('electron-window-state')

let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {

  let state = windowStateKeeper({
    defaultWidth: 900,
    defaultHeight: 600
  })

  mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 800,
    minHeight: 500,
    titleBarStyle: 'default',
    backgroundColor: '#1B1C21',
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: false
    }
  })

  mainWindow.webContents.openDevTools()

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('dist/index.html')

  state.manage(mainWindow)

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('close', e => {
    app.quit()
  })

}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

app.on('before-quit', e => {
  mainWindow.webContents.send("application_will_quit")
})

ipcMain.on("open-file-picker", (e, args) => {
  dialog.showOpenDialog(args).then(result => {
    if (!result.canceled) {
      e.sender.send("open-file-picker-result", result)
    }
  })
})