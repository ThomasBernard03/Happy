import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/models/project.interface';
import { DeviceService } from 'src/providers/device.service';
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
    private zone : NgZone,
    private projectService : ProjectService,
    private deviceService : DeviceService,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    public dialogRef: MatDialogRef<ProjectSettingsComponent>){}


    ngOnInit(): void {
      this.name = this.data.name
      this.picture = this.data.picture
      this.guid = this.data.guid
    }


    onImageClicked() {
      this.deviceService.openImagePicker(image => {
        this.zone.run(() => {
          this.picture = image
        })
      })
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
