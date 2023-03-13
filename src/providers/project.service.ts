import { Injectable } from '@angular/core'
import { Project } from 'src/models/project.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ElectronService } from './electron.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    private projects : Project[]
    private projects$ = new BehaviorSubject<Project[]>([]);
    selectedProject = new BehaviorSubject<Project | null>(null)

    constructor(private electronService : ElectronService){
        this.projects = this.getAllProjectsFromLocalStorage()
        this.projects$.next(this.projects)


        this.electronService.ipcRenderer?.once("application_will_quit", (e, args) => {
            console.log("saving projects...");
            this.saveProjects()
        })
    }


    // Return false if a project already have this name
    isProjectNameUnique(name: string): boolean {
        // Check if a project with the given name already exists
        const existingProject = this.projects.find(project => project.name === name);

        if (existingProject) {
            return false;
        }
        return true
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