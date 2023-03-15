import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RequestMethod } from 'src/models/enums/request-method';

@Component({
  selector: 'app-select-method-dialog',
  templateUrl: './select-method-dialog.component.html',
  styleUrls: ['./select-method-dialog.component.scss']
})
export class SelectMethodDialogComponent {

  methods : RequestMethod[] = [RequestMethod.Get, RequestMethod.Post, RequestMethod.Delete, RequestMethod.Put, RequestMethod.Patch]

  constructor(public dialogRef: MatDialogRef<SelectMethodDialogComponent>){}


  onMethodClicked(method : RequestMethod){
    this.dialogRef.close(method)
  }
}
