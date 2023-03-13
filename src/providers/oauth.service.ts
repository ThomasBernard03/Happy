import { Injectable } from '@angular/core'
import { ElectronService } from './electron.service';

@Injectable({
    providedIn: 'root'
})
export class OAuthService {

    constructor(private electronService : ElectronService){}

    githubUrl = "https://github.com/login/oauth/authorize?scope=user:email&client_id=31cd5198b88069a6c76d"


    getGrantCode(){

        this.electronService.shell?.openExternal(this.githubUrl)

        this.electronService.ipcRenderer?.once("on-login", (e, args) => {
            const grant = args.replace("happy://?code=", "")
            console.log("grant code : " + grant);
        })
    }
}