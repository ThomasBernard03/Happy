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

}
