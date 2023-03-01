import { Component, ViewChild } from '@angular/core';
import { Project } from 'src/models/project.interface';
import { RequestsComponent } from './requests/requests.component';

@Component({
    selector: 'app-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent {
    constructor() { }

    project? : Project

    onProjectSelected(project : Project){
        this.project = project
    }

}
