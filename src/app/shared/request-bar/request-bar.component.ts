import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpVerb } from 'src/models/verb.enum';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-bar',
  templateUrl: './request-bar.component.html',
  styleUrls: ['./request-bar.component.scss']
})
export class RequestBarComponent {

  constructor(private dialog : MatDialog){}

  @Input() method = HttpVerb.Get
  @Output() methodChange = new EventEmitter()

  @Input() url = ""
  @Output() onSendRequest = new EventEmitter()

  onSendButtonClicked(){
    this.onSendRequest.emit({
      url: this.url,
      method : this.method
    })
  }

  onMethodClicked(){
    var selectPostion = document.getElementById("request-method-select")?.getBoundingClientRect()

    const instance = this.dialog.open(SelectMethodDialogComponent, {
      position : {
        left : selectPostion?.left + "px",
        top : selectPostion?.top + "px"
      }
    })

    instance.afterClosed().subscribe(method => {
      if(method && method != this.method){
        this.method = method
        this.methodChange.next(this.method)
      }
    })
  }
}


import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-method-dialog',
  template: `
  <section>
    <div (click)="onMethodClicked(method)" *ngFor="let method of methods" class="{{method}}">{{method.toUpperCase()}}</div>
  </section>`,
  styles : [
    `section {
      div {
          cursor: pointer;
          height: 20px;
          display: flex;
          align-items: center;
          padding: 10px;
          width: 80px;
      }
  
      div:hover{
          background-color: var(--light);
      }
  }`
  ]
})
export class SelectMethodDialogComponent {

  methods : HttpVerb[] = [HttpVerb.Get, HttpVerb.Post, HttpVerb.Delete, HttpVerb.Put, HttpVerb.Patch]

  constructor(public dialogRef: MatDialogRef<SelectMethodDialogComponent>){}


  onMethodClicked(method : HttpVerb){
    this.dialogRef.close(method)
  }
}