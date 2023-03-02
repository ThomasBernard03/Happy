import { Injectable } from '@angular/core'
import { Project } from 'src/models/project.interface';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    projects : Project[]

    constructor(){
        this.projects = this.getProjects()
    }

    saveProjects(){
        localStorage.setItem("projects", JSON.stringify(this.projects))
    }

    addProject(project : Project) : Project{
        this.projects.push(project)

        return project
    }

    private getProjects() : Project[]{
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