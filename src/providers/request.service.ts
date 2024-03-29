import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, map } from 'rxjs';
import { RequestMethod } from 'src/models/enums/request-method';
import { Project } from 'src/models/project.interface';
import { Request } from '../models/request.interface';
import { ElectronService } from './electron.service';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    private requests: Request[] = [];
    private requests$ = new BehaviorSubject<Request[]>([]);

    selectedRequest$ = new BehaviorSubject<Request | null>(null);

    constructor(private electronService : ElectronService) {
        this.requests = this.getAllRequestsFromLocalStorage()
        this.requests$.next(this.requests)

        this.electronService.ipcRenderer?.once("application_will_quit", (e, args) => {
            console.log("saving requests...");
            this.saveRequests()
        })
    }

    saveRequests() {
        localStorage.setItem("requests", JSON.stringify(this.requests))
    }

    addRequest(project: Project) {

        const request: Request = {
            guid: crypto.randomUUID(),
            projectGuid: project.guid,
            name: "New request",
            method: RequestMethod.Get,
            url: "",
            body: "",
            headers : [],
            notes : ""
        }

        this.requests.push(request);
        this.requests$.next(this.requests);
    }

    duplicateRequest(request : Request) : Request{
        let newRequest = Object.assign({}, request)
        newRequest.guid = crypto.randomUUID()
        this.requests.push(newRequest);
        this.requests$.next(this.requests);
        return newRequest
    }

    deleteRequest(request: Request) {
        const index = this.requests.indexOf(request)

        this.requests.splice(index, 1)
        this.requests$.next(this.requests)
    }


    getProjectRequests(project: Project): Observable<Request[]> {
        return this.requests$.asObservable().pipe(map(x => x.filter(p => p.projectGuid == project.guid)));
    }

    deleteProjectRequests(project : Project) {
        const newRequests = this.requests.filter(p => p.projectGuid != project.guid)
        this.requests = newRequests
        this.requests$.next(this.requests)
    }


    private getAllRequestsFromLocalStorage(): Request[] {
        const rawData = localStorage.getItem("requests")

        if (rawData != null) {
            const requests: Request[] = JSON.parse(rawData)
            return requests
        }
        else {
            return []
        }
    }
}