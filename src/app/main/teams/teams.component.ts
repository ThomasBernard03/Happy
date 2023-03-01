import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateTeamDialogComponent } from './create-team-dialog/create-team-dialog.component';
import { TeamService } from 'src/providers/team.service';
import { Project } from 'src/models/project.interface';

@Component({
  selector: 'app-teams',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.scss']
})
export class TeamsComponent implements OnInit {

  constructor(private teamService : TeamService, private dialog : MatDialog){
  }

  projects! : Project[]

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
}
