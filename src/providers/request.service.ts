import { Injectable } from '@angular/core'
import { Project } from 'src/models/project.interface';
import { Request } from '../models/request.interface';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(){}

    createRequest(project : Project) : Request{
        const requests = this.getAllRequests();

        const request : Request = {
            projectGuid : project.guid,
            name : "New request",
            method : "get",
            url : "",
            body : ""
        }

        requests.push(request)

        localStorage.setItem("requests", JSON.stringify(requests))

        return request
    }

    private getAllRequests() : Request[]{
        const rawData = localStorage.getItem("requests")

        if(rawData != null){
            const requests : Request[] = JSON.parse(rawData)
            return requests
        }
        else {
            return []
        }
    }

    getProjectRequests(project : Project) : Request[]{
        const rawData = localStorage.getItem("requests")

        if(rawData != null){
            const requests : Request[] = JSON.parse(rawData)
            return requests.filter(p => p.projectGuid == project.guid)
        }
        else {
            return []
        }
    }
}