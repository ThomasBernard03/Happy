import { Component, ViewChild } from '@angular/core';
import { Project } from 'src/models/project.interface';
import { Subject } from 'rxjs';
import { Request } from 'src/models/request.interface';

@Component({
    selector: 'app-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent {
    constructor() { }

    projectSubject: Subject<Project> = new Subject<Project>();
    requestSubject : Subject<Request> = new Subject<Request>

    onProjectSelected(project: Project) {
        this.projectSubject.next(project);
    }

    onRequestSelected(request : Request){
        this.requestSubject.next(request)
    }
}
