import { Injectable } from '@angular/core'
import { ElectronService } from './electron.service';

@Injectable({
    providedIn: 'root'
})
export class OAuthService {

    constructor(private electronService : ElectronService){}


    getGrantCode(){

    }

}