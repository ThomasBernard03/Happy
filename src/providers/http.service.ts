import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Request } from 'src/models/request.interface'

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private httpClient : HttpClient){

    }

    sendRequest(request : Request){

        if(request.method == "POST"){
            return this.httpClient.post<HttpResponse<any>>(request.url, request.body, {observe : 'response'})
        }
        else {
            return this.httpClient.get<HttpResponse<any>>(request.url, {observe : 'response'})
        }
    }
}