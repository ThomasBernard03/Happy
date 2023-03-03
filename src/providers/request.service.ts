import { Injectable } from '@angular/core'
import { Project } from 'src/models/project.interface';
import { Request } from '../models/request.interface';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    requests : Request[]

    constructor(){
        this.requests = this.getAllRequests()
    }

    saveRequests(){
        localStorage.setItem("requests", JSON.stringify(this.requests))
    }

    addRequest(project : Project) : Request{

        const request : Request = {
            guid : crypto.randomUUID(),
            projectGuid : project.guid,
            name : "New request",
            method : "GET",
            url : "",
            body : ""
        }

        this.requests.push(request)

        return request
    }

    deleteRequest(request : Request){
        const index = this.requests.indexOf(request)
        this.requests.splice(index, 1)
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
        return this.requests.filter(r => r.projectGuid == project.guid)
    }
}