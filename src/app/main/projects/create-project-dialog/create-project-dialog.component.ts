import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/models/project.interface';
import { DeviceService } from 'src/providers/device.service';
import { ElectronService } from 'src/providers/electron.service';
import { ProjectService } from 'src/providers/project.service';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: 'create-project-dialog.component.html',
  styleUrls: ['create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent implements OnInit {

  projectImage = "assets/empty_project_image.png"
  projectName = ""
  isFormValid = false
  errorMessage = ""

  constructor(
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private projectService: ProjectService,
    private deviceService : DeviceService,
    private zone: NgZone
  ) {}


  ngOnInit(): void {
    const input = document.getElementById("create-project-name-input")
    input?.addEventListener("keyup", e => {
      this.onProjectNameChange()
    })
  }


  onImageClicked() {
    this.deviceService.openImagePicker(image => {
      this.zone.run(() => {
        this.projectImage = image
      })
    })
  }

  onProjectNameChange() {
    this.errorMessage = ""
    if(this.projectName.trim().length <= 0){
      this.isFormValid = false
    } 
    else if(!this.projectService.isProjectNameUnique(this.projectName)){
      this.errorMessage = "You already have a project with this name !"
      this.isFormValid = false
    }
    else {
      this.isFormValid = true
    }
  }

  onCreateButtonClicked() {

    const project: Project = {
      guid: crypto.randomUUID(),
      name: this.projectName,
      picture: this.projectImage
    }

    this.projectService.addProject(project)
    this.dialogRef.close(project)
  }

}
