const { remote } = require('electron');
const dialog = require('electron').remote.dialog
const ipcRenderer = require('electron').ipcRenderer

console.log(ipcRenderer);

let teamImage = document.getElementById('team_image')
let teamName = document.getElementById('team_name')

let cancelButton = document.getElementById('cancel_button')
let createButton = document.getElementById('create_button')

ipcRenderer.on('team-created', (e, team) => {
    remote.getCurrentWindow().close()
})

teamImage.addEventListener('click', e => {
    dialog.showOpenDialog({
        defaultPath : remote.app.getPath('desktop'),
        filters : [
            { name : 'Images', extensions: ['png', 'jpg', 'jpeg', 'svg']}
        ]
    }).then( result => {
        if(!result.canceled){
            console.log(result.filePaths[0]);
            teamImage.src = result.filePaths[0]
        }
    })
})

cancelButton.addEventListener('click', e => {
    remote.getCurrentWindow().close()
})

createButton.addEventListener('click', e => {
    console.log("create")

    ipcRenderer.send('new-team', {
        picture : teamImage.src,
        name : teamName.value
    })
})

