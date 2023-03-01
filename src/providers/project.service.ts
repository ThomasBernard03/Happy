import { Injectable } from '@angular/core'
import { Project } from 'src/models/project.interface';
import { ElectronService } from './electron.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private electronService : ElectronService){}

    createProject(project : Project) : Project{
        const projects = this.getProjects();

        projects.push(project)

        localStorage.setItem("projects", JSON.stringify(projects))

        return project
    }

    getProjects() : Project[]{
        const rawData = localStorage.getItem("projects")

        if(rawData != null){
            const projects : Project[] = JSON.parse(rawData)
            return projects
        }
        else {
            return []
        }
    }
}