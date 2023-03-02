import { Component, ViewChild } from '@angular/core';
import { Project } from 'src/models/project.interface';
import { RequestsComponent } from './requests/requests.component';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent {
    constructor() { }

    projectSubject: Subject<Project> = new Subject<Project>();

    onProjectSelected(project: Project) {
        this.projectSubject.next(project);
    }

}
