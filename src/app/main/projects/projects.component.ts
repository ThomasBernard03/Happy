import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTeamDialogComponent } from './create-team-dialog/create-team-dialog.component';
import { TeamService } from 'src/providers/team.service';
import { Project } from 'src/models/project.interface';

@Component({
  selector: 'app-teams',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private teamService : TeamService, private dialog : MatDialog){
  }

  projects! : Project[]

  @Output() onProjectSelected = new EventEmitter<Project>()

  ngOnInit() {
    this.projects = this.teamService.getTeams()
  }

  onNewTeamButtonClicked(){
    const instance = this.dialog.open(CreateTeamDialogComponent)

    instance.afterClosed().subscribe(result => {
      if(result != undefined){
        this.projects.push(result)
      }
    })
  }

  onRightClick(event : Event, project : Project){
    console.log(event);
    console.log(project);
  }

  onProjectClick(project : Project){
    this.onProjectSelected.emit(project)
  }
}
