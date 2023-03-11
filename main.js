const { app, BrowserWindow, ipcMain, dialog, clipboard, TouchBar, nativeImage } = require('electron')
const windowStateKeeper = require('electron-window-state')
const appMenu = require('./menu')

let mainWindow, settingsWindow

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

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`)
  state.manage(mainWindow)


  //appMenu()


  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('close', e => {
    app.quit()
  })



  settingsWindow = new BrowserWindow({
    modal : true,
    show : false,
    parent : mainWindow
  })
  settingsWindow.loadURL(`file://${__dirname}/dist/index.html#/settings`)

  settingsWindow.on("blur", e => {
    settingsWindow.hide()
  })
}


ipcMain.on("open-settings", (e, args) => {
  settingsWindow.show()
})

ipcMain.on("close-settings", (e, args) => {
  settingsWindow.hide()
})

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