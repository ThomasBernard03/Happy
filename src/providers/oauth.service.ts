import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { ElectronService } from './electron.service';

@Injectable({
    providedIn: 'root'
})
export class OAuthService {

    constructor(private electronService : ElectronService, private httpClient : HttpClient){}


    private clientSecret = " "
    private githubUrl = `https://github.com/login/oauth/authorize?scope=read:user&client_id=`
    private clientId = " "


    getGrantCode(){

        this.electronService.shell?.openExternal(`${this.githubUrl}${this.clientId}`)

        this.electronService.ipcRenderer?.once("on-login", (e, args) => {
            const grant = args.replace("happy://?code=", "")
            console.log("grant code : " + grant)

            this.getAccessToken(grant)
        })
    }

    getAccessToken(code : string){
        const tokenUrl = 'https://github.com/login/oauth/access_token'
        const body = {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code: code
        }
        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }

        this.httpClient.post(tokenUrl, body, {headers}).subscribe(result => {
            console.log(result);
            
        })
    }
}