import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import { ProjectService } from 'src/providers/project.service';
import { Project } from 'src/models/project.interface';
import { ProjectContextMenuComponent } from './project-context-menu/project-context-menu.component';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private projectService : ProjectService, private dialog : MatDialog){}

  projects! : Project[]
  selectedProject? : Project
  
  @Output() onProjectSelected = new EventEmitter<Project>()

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects
    })
  }

  onNewProjectButtonClicked(){
    const instance = this.dialog.open(CreateProjectDialogComponent)

    instance.afterClosed().subscribe(result => {
      
    })
  }

  onRightClick(event : MouseEvent, project : Project){
    const instance = this.dialog.open(ProjectContextMenuComponent, {
      data : project,
      position : {
        left : event.clientX + "px",
        top : event.clientY + "px"
      }
    })

    instance.afterClosed().subscribe(result => {

    })
  }

  onProjectClick(project : Project){
    this.selectedProject = project
    this.onProjectSelected.emit(project)
  }
}
