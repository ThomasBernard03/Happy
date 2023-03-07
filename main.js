const { app, BrowserWindow, ipcMain, dialog, clipboard, TouchBar } = require('electron')
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

ipcMain.on("add-clipboard", (e, args) => {
  clipboard.writeText(args)
})


ipcMain.on("request-selected", (e, request) => {

  var color = "#319E73"

  switch(request.method){
    case "POST" : 
      color = "#7A76B2"
      break
    case "PUT" :
      color = "#EEE149"
      break
    case "DELETE" :
      color = "#F87659"
  }

  const methodLabel = new TouchBar.TouchBarLabel({
    label : request.method,
    textColor : color
  })
  
  const urlLabel = new TouchBar.TouchBarLabel({
    label : request.url
  })
  
  
  const spacer = new TouchBar.TouchBarSpacer({
    size : "flexible"
  })
  
  const sendButton = new TouchBar.TouchBarButton({
    label : "SEND",
    backgroundColor : "#319E73",
    click : () => {
      e.sender.send("send-request")
    }
  })
  
  const touchBar = new TouchBar({
    items : [
      methodLabel,
      urlLabel,
      spacer,
      sendButton
    ]
  })

  if(process.platform === "darwin"){
    mainWindow.setTouchBar(touchBar)
  }
})