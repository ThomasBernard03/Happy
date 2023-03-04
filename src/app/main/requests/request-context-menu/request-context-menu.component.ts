import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Request } from 'src/models/request.interface';
import { RequestService } from 'src/providers/request.service';
import { DialogResult } from 'src/models/enums/dialog-result';

@Component({
  selector: 'app-request-context-menu',
  templateUrl: './request-context-menu.component.html',
  styleUrls: ['./request-context-menu.component.scss']
})
export class RequestContextMenuComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Request,
    public dialogRef: MatDialogRef<RequestContextMenuComponent>,
    private requestService : RequestService){}

    onRenameClicked(){
      this.dialogRef.close(DialogResult.Rename)
    }

    onCopyClicked(){
      this.dialogRef.close(DialogResult.Copy)
    }

    onDeleteClicked(){
      this.requestService.deleteRequest(this.data)
      this.dialogRef.close(DialogResult.Delete)
    }
}
