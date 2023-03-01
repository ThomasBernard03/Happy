import { Component } from '@angular/core';
import { ElectronService } from 'src/providers/electron.service';

@Component({
  selector: 'app-teams',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.scss']
})
export class TeamsComponent {

  constructor(private electronService : ElectronService){
  }


  onNewTeamButtonClicked(){
    console.log("zeiufn");
    
  }

}
