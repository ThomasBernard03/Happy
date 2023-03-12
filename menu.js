const { Menu, shell } = require('electron')

module.exports = () => {

    let template = [
        {
            role : 'appMenu',
            submenu : [
                {
                    label : 'About'
                },
                {
                    label : 'Check for updates'
                },
                {
                    type: 'separator'
                },
                {
                    label : 'Settings',
                    accelerator : 'CmdOrCtrl+,'
                },
                {
                    type: 'separator'
                },
                {
                    label : 'Hide',
                    accelerator : 'CmdOrCtrl+H'
                },
                {
                    label : 'Quit',
                    accelerator : 'CmdOrCtrl+Q'
                },
            ]
        },
        {
            label : 'Items',
        },
        {
            role : 'editMenu'
        },
        {
            role : 'windowMenu'
        },
        {
            role : 'help',
            submenu : [
                {
                    label : 'Report a bug',
                    click : () => {
                        shell.openExternal("https://github.com/ThomasBernard03/Happy/issues")
                    }
                }
            ]
        }

    ]


    //if (process.platform === "darwin") template.unshift({role : 'appMenu'})

    let menu = Menu.buildFromTemplate(template)


    Menu.setApplicationMenu(menu)
}