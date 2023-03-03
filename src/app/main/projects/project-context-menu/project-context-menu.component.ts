import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/providers/project.service';
import { Project } from 'src/models/project.interface';

@Component({
  selector: 'app-project-context-menu',
  templateUrl: './project-context-menu.component.html',
  styleUrls: ['./project-context-menu.component.scss']
})
export class ProjectContextMenuComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Project,
    public dialogRef: MatDialogRef<ProjectContextMenuComponent>,
    private projectService : ProjectService){}

    onRenameClicked(){
      this.dialogRef.close()
    }

    onCopyClicked(){
      this.dialogRef.close()
    }

    onDeleteClicked(){
      this.projectService.deleteProject(this.data)

      this.dialogRef.close(true)
    }
}
