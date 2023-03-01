import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/models/project.interface';
import { ElectronService } from 'src/providers/electron.service';
import { TeamService } from 'src/providers/team.service';


@Component({
  selector: 'app-create-team-dialog',
  templateUrl: './create-team-dialog.component.html',
  styleUrls: ['./create-team-dialog.component.scss']
})
export class CreateTeamDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateTeamDialogComponent>,
    private electronService: ElectronService,
    private teamService : TeamService
  ) {
    this.electronService.ipcRenderer?.on("open-file-picker-result", (e, args) => {
      this.teamImage = args.filePaths[0]
    })
  }

  teamImage = "assets/empty_team_image.png"
  teamName = ""


  onImageClicked() {
    const options = {
      filters: [
        { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'svg'] }
      ]
    }
    this.electronService.ipcRenderer?.send("open-file-picker", options)
  }

  onCreateButtonClicked(){

    const team : Project = {
      guid : crypto.randomUUID(),
      name : this.teamName,
      picture : this.teamImage
    }

    this.teamService.createTeam(team)
    this.dialogRef.close(team)
  }

}
