import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Request } from 'src/models/request.interface';
import { DialogResult } from 'src/models/enums/dialog-result';

@Component({
  selector: 'app-request-context-menu',
  templateUrl: './request-context-menu.component.html',
  styleUrls: ['./request-context-menu.component.scss']
})
export class RequestContextMenuComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Request,
    public dialogRef: MatDialogRef<RequestContextMenuComponent>){}

    onRenameClicked(){
      this.dialogRef.close(DialogResult.Rename)
    }

    onCopyClicked(){
      this.dialogRef.close(DialogResult.Copy)
    }

    onDeleteClicked(){
      this.dialogRef.close(DialogResult.Delete)
    }
}
