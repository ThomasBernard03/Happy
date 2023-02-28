// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const dialog = require('electron').remote.dialog
const BrowserWindow = require('electron').remote.BrowserWindow
const { remote, ipcRenderer } = require('electron')

let newTeamButton = document.getElementById('new_team_button')
let teamsList = document.getElementById('teams_list')

ipcRenderer.on('team-created', (e, team) => {
    let teamArticle = document.createElement("article")
    let image = document.createElement('img')
    image.src = team.picture
    teamArticle.appendChild(image)
    teamArticle.style.backgroundImage = team.picture
    teamsList.insertBefore(teamArticle, teamsList.firstChild)
})

ipcRenderer.on('teams', (e, teams) => {
    console.log(teams)

    teams.forEach(team => {
        let teamArticle = document.createElement("article")
        let image = document.createElement('img')
        image.src = team.picture
        teamArticle.appendChild(image)
        teamsList.insertBefore(teamArticle, teamsList.firstChild)
    });
})

ipcRenderer.send('get-teams')


newTeamButton.addEventListener('click', e => {

    const child = new BrowserWindow(
        {
            modal: true,
            parent: remote.getCurrentWindow(),
            backgroundColor : '#232429',
            width: 500,
            height: 600,
            resizable : false,
            webPreferences : {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            }
        })
    child.loadFile('src/main/team/modal.html')

    // child.on('blur', e => {
    //     child.hide()
    // })

    //child.loadURL('https://github.com')
})
