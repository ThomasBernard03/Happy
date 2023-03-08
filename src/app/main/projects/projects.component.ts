import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import { ProjectService } from 'src/providers/project.service';
import { Project } from 'src/models/project.interface';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private projectService : ProjectService, private dialog : MatDialog){}

  projects! : Project[]
  selectedProject : Project | null = null
  
  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects
    })

    this.projectService.selectedProject.asObservable().subscribe(project => {
      this.selectedProject = project
    })
  }

  onNewProjectButtonClicked(){
    const instance = this.dialog.open(CreateProjectDialogComponent)

    instance.afterClosed().subscribe(result => {
      
    })
  }

  onProjectClick(project : Project){
    this.projectService.selectedProject.next(project)
  }
}
