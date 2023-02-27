const { remote } = require('electron');
const dialog = require('electron').remote.dialog

console.log(remote);

let teamImage = document.getElementById('team_image')

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