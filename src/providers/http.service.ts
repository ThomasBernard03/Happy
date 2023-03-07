import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Request } from 'src/models/request.interface'
import { RequestMethod } from 'src/models/enums/request-method'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private httpClient : HttpClient){

    }

    sendRequest(request : Request) {
        switch(request.method){
            case RequestMethod.Get : 
                return this.httpClient.get<HttpResponse<any>>(request.url, {observe : 'response'})
            case RequestMethod.Post :
                return this.httpClient.post<HttpResponse<any>>(request.url, request.body, {observe : 'response'})
            case RequestMethod.Delete :
                return this.httpClient.delete<HttpResponse<any>>(request.url, {observe : 'response'})
            case RequestMethod.Patch : 
                return this.httpClient.patch<HttpResponse<any>>(request.url, request.body, {observe : 'response'})
            case RequestMethod.Put : 
                return this.httpClient.put<HttpResponse<any>>(request.url, request.body, {observe : 'response'})
        }
    }
}