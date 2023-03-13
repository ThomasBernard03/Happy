import { Component } from '@angular/core';
import { ElectronService } from 'src/providers/electron.service';
import { OAuthService } from 'src/providers/oauth.service';

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent {

    constructor(private electronService : ElectronService, private oauthService : OAuthService){}

    closeSettings(){        
        this.electronService.ipcRenderer?.send("close-settings")
    }

    onLoginWithGithub(){
        this.oauthService.getGrantCode()
    }

}
