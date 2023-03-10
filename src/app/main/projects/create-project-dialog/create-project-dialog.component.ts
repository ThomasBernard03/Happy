import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/models/project.interface';
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
    private electronService: ElectronService,
    private projectService: ProjectService
  ) {
    this.electronService.ipcRenderer?.on("open-image-picker-result", (e, image) => {
      this.projectImage = image
    })
  }


  ngOnInit(): void {
    const input = document.getElementById("create-project-name-input")
    input?.addEventListener("keyup", e => {
      this.onProjectNameChange()
    })
  }


  onImageClicked() {
    this.electronService.ipcRenderer?.send("open-image-picker")
  }

  onProjectNameChange() {

    console.log(name);
    
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
