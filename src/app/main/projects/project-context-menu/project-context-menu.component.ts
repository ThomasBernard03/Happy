import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/providers/project.service';
import { Project } from 'src/models/project.interface';
import { RequestService } from 'src/providers/request.service';

@Component({
  selector: 'app-project-context-menu',
  templateUrl: './project-context-menu.component.html',
  styleUrls: ['./project-context-menu.component.scss']
})
export class ProjectContextMenuComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Project,
    public dialogRef: MatDialogRef<ProjectContextMenuComponent>,
    private projectService : ProjectService, private requestService : RequestService){}

    onRenameClicked(){
      this.dialogRef.close()
    }

    onCopyClicked(){
      this.dialogRef.close()
    }

    onDeleteClicked(){
      this.requestService.deleteProjectRequests(this.data)
      this.projectService.deleteProject(this.data)

      this.dialogRef.close(true)
    }
}
