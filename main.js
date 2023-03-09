const { app, BrowserWindow, ipcMain, dialog, clipboard, TouchBar, nativeImage } = require('electron')
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
    titleBarStyle: 'hidden',
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


// Open a file picker and return image result in base 64
ipcMain.on("open-image-picker", (e, args) => {

  const options = {
    filters: [
      { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'svg'] }
    ]
  }

  dialog.showOpenDialog(options).then(result => {
    if (!result.canceled) {
      const natImage = nativeImage.createFromPath(result.filePaths[0])
      e.sender.send("open-image-picker-result", natImage.toDataURL())
    }
  })
})

ipcMain.on("add-clipboard", (e, args) => {
  clipboard.writeText(args)
})