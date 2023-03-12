import { Component } from '@angular/core';
import { ElectronService } from 'src/providers/electron.service';

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent {


    constructor(private electronService : ElectronService){}


    closeSettings(){        
        this.electronService.ipcRenderer?.send("close-settings")
    }

    onLoginWithGithub(){
        this.electronService.shell?.openExternal("https://github.com/login/oauth/authorize?scope=user:email&client_id=31cd5198b88069a6c76d")
        // this.electronService.shell?.openExternal("https://github.com/")
    }

}
