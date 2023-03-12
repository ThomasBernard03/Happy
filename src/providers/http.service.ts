import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Request } from 'src/models/request.interface'
import { RequestMethod } from 'src/models/enums/request-method'

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private httpClient : HttpClient){

    }

    sendRequest(request : Request) {

        const httpHeaders = request.headers.reduce((acc, curr) => {
            return acc.set(curr.key, curr.value);
          }, new HttpHeaders());

        switch(request.method){
            case RequestMethod.Get : 
                return this.httpClient.get<HttpResponse<any>>(request.url, {observe : 'response', headers : httpHeaders})
            case RequestMethod.Post :
                return this.httpClient.post<HttpResponse<any>>(request.url, request.body, {observe : 'response', headers : httpHeaders})
            case RequestMethod.Delete :
                return this.httpClient.delete<HttpResponse<any>>(request.url, {observe : 'response', headers : httpHeaders})
            case RequestMethod.Patch : 
                return this.httpClient.patch<HttpResponse<any>>(request.url, request.body, {observe : 'response', headers : httpHeaders})
            case RequestMethod.Put : 
                return this.httpClient.put<HttpResponse<any>>(request.url, request.body, {observe : 'response', headers : httpHeaders})
        }
    }
}