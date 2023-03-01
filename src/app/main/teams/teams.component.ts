import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateTeamDialogComponent } from './create-team-dialog/create-team-dialog.component';
import { TeamService } from 'src/providers/team.service';
import { Team } from 'src/models/team.interface';

@Component({
  selector: 'app-teams',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.scss']
})
export class TeamsComponent implements OnInit {

  constructor(private teamService : TeamService, private dialog : MatDialog){
  }

  teams! : Team[]

  ngOnInit() {
    this.teams = this.teamService.getTeams()
  }

  onNewTeamButtonClicked(){
    const instance = this.dialog.open(CreateTeamDialogComponent)

    instance.afterClosed().subscribe(result => {
      if(result != undefined){
        this.teams.push(result)
      }
    })
  }
}
