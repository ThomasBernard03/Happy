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

  constructor(private projectService : ProjectService, private dialog : MatDialog){
  }

  projects! : Project[]
  selectedProject? : Project
  
  @Output() onProjectSelected = new EventEmitter<Project>()

  ngOnInit() {
    this.projects = this.projectService.projects
  }

  onNewProjectButtonClicked(){
    const instance = this.dialog.open(CreateProjectDialogComponent)

    instance.afterClosed().subscribe(result => {
      
    })
  }

  onRightClick(event : MouseEvent, project : Project){

  }

  onProjectClick(project : Project){
    this.selectedProject = project
    this.onProjectSelected.emit(project)
  }
}
