import { Component } from '@angular/core';
import { ElectronService } from 'src/providers/electron.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateTeamDialogComponent } from './create-team-dialog/create-team-dialog.component';

@Component({
  selector: 'app-teams',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.scss']
})
export class TeamsComponent {

  constructor(private electronService : ElectronService, private dialog : MatDialog){
  }


  onNewTeamButtonClicked(){
    console.log("zeiufn")

    this.dialog.open(CreateTeamDialogComponent)
    
  }

}
