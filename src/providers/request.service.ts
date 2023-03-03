import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, filter } from 'rxjs';
import { Project } from 'src/models/project.interface';
import { Request } from '../models/request.interface';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    private requests: Request[] = [];
    private requests$ = new BehaviorSubject<Request[]>([]);

    constructor(){
        this.requests$.next(this.getAllRequestsFromLocalStorage())
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

        this.requests.push(request);
        this.requests$.next(this.requests);

        return request
    }

    deleteRequest(request : Request){
        const index = this.requests.indexOf(request)

        this.requests.splice(index, 1)
        this.requests$.next(this.requests)
    }

    private getAllRequestsFromLocalStorage() : Request[]{
        const rawData = localStorage.getItem("requests")

        if(rawData != null){
            const requests : Request[] = JSON.parse(rawData)
            return requests
        }
        else {
            return []
        }
    }

    getProjectRequests(project : Project) : Observable<Request[]>{
        return this.requests$.asObservable()
    }
}