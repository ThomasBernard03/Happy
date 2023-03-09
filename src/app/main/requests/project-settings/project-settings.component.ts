import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/models/project.interface';
import { ElectronService } from 'src/providers/electron.service';
import { ProjectService } from 'src/providers/project.service';

@Component({
  selector: 'app-project-settings',
  templateUrl: 'project-settings.component.html',
  styleUrls: ['project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit {

  name = ""
  picture = ""
  guid = ""

  constructor(
    private projectService : ProjectService,
    private electronService : ElectronService,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    public dialogRef: MatDialogRef<ProjectSettingsComponent>){}


    ngOnInit(): void {
      this.name = this.data.name
      this.picture = this.data.picture
      this.guid = this.data.guid

      this.electronService.ipcRenderer?.on("open-image-picker-result", (e, image) => {
        this.picture = image
      })
    }


    onImageClicked() {
      this.electronService.ipcRenderer?.send("open-image-picker")
    }


    onSave (){
      this.data.name = this.name
      this.data.picture = this.picture
      this.dialogRef.close()
    }

    onDelete(){
      this.projectService.deleteProject(this.data)
      this.projectService.selectedProject.next(null)
      this.dialogRef.close()
    }

}
