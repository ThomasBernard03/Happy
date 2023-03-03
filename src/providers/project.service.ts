import { Injectable } from '@angular/core'
import { Project } from 'src/models/project.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    private projects : Project[]
    private projects$ = new BehaviorSubject<Project[]>([]);

    constructor(){
        this.projects = this.getAllProjectsFromLocalStorage()
        this.projects$.next(this.projects)
    }

    saveProjects(){
        localStorage.setItem("projects", JSON.stringify(this.projects))
    }

    addProject(project : Project){
        this.projects.push(project)
        this.projects$.next(this.projects)
    }

    deleteProject(project : Project) {
        const index = this.projects.indexOf(project)

        this.projects.splice(index, 1)
        this.projects$.next(this.projects)
    }

    getProjects() : Observable<Project[]>{
        return this.projects$.asObservable()
    }

    private getAllProjectsFromLocalStorage() : Project[]{
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