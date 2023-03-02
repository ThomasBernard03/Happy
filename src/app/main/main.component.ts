import { Component, ViewChild, OnInit } from '@angular/core';
import { Project } from 'src/models/project.interface';
import { Subject } from 'rxjs';
import { Request } from 'src/models/request.interface';
import { ElectronService } from 'src/providers/electron.service';
import { RequestService } from 'src/providers/request.service';
import { ProjectService } from 'src/providers/project.service';

@Component({
    selector: 'app-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
    constructor(private electronService : ElectronService, private requestService : RequestService, private projectService : ProjectService) { }

    projectSubject: Subject<Project> = new Subject<Project>();
    requestSubject : Subject<Request> = new Subject<Request>


    ngOnInit(): void {
        this.electronService.ipcRenderer?.on("application_will_quit", (e, args) => {
            console.log("application will quit")
            this.projectService.saveProjects()
            this.requestService.saveRequests()
        })
    }

    onProjectSelected(project: Project) {
        this.projectSubject.next(project);
    }

    onRequestSelected(request : Request){
        this.requestSubject.next(request)
    }
}
