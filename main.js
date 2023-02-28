// Modules
const {app, BrowserWindow, ipcMain} = require('electron')
const windowStateKeeper = require('electron-window-state')
const fs = require('fs')
const imageToBase64 = require('image-to-base64')
const nativeImage = require('electron').nativeImage


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

ipcMain.on('new-team', (e, team) => {

  addTeam(team)

  mainWindow.webContents.send('team-created', {
    id : 1,
    picture : team.picture,
    name : team.name
  })
})

ipcMain.on('get-teams', (e, args) => {
  e.sender.send('teams', getTeam())
})

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  let state = windowStateKeeper({
    defaultWidth : 900,
    defaultHeight: 600
  })

  mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 450,
    minHeight: 300,
    titleBarStyle: 'hidden',
    backgroundColor: '#1B1C21',
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  mainWindow.webContents.openDevTools()

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('src/main/main.html')

  state.manage(mainWindow)

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })


  mainWindow.webContents.on('dom-ready', e => {

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


function getTeam(){
  let rawdata = fs.readFileSync('assets/teams.json')
  let teams = JSON.parse(rawdata)

  console.log(teams);

  return teams
}


function addTeam(team){

  let rawdata = fs.readFileSync('assets/teams.json')
  let teams = JSON.parse(rawdata)

  console.log(Math.max(...teams.map(x => x.id)))

  console.log(team.picture)
  var image = nativeImage.createFromPath(team.picture)
  console.log(image);
  console.log(image.getSize());
  console.log(image.toDataURL());
  
  team = {...team, id : Math.max(...teams.map(x => x.id)) + 1}

  teams.push(team)
  rawdata = JSON.stringify(teams)

  fs.writeFileSync("assets/teams.json", rawdata)

  // console.log(teams);
}