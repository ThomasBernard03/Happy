import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/models/project.interface';
import { ElectronService } from 'src/providers/electron.service';
import { ProjectService } from 'src/providers/project.service';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: 'create-project-dialog.component.html',
  styleUrls: ['create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private electronService: ElectronService,
    private projectService : ProjectService
  ) {
    this.electronService.ipcRenderer?.on("open-file-picker-result", (e, args) => {
      this.projectImage = args.filePaths[0]
    })
  }

  projectImage = "assets/empty_project_image.png"
  projectName = ""


  onImageClicked() {
    const options = {
      filters: [
        { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'svg'] }
      ]
    }
    this.electronService.ipcRenderer?.send("open-file-picker", options)
  }

  onCreateButtonClicked(){

    const project : Project = {
      guid : crypto.randomUUID(),
      name : this.projectName,
      picture : this.projectImage
    }

    this.projectService.addProject(project)
    this.dialogRef.close(project)
  }

}
