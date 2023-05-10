import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpVerb } from 'src/models/verb.enum';
import { MatDialog } from '@angular/material/dialog';
import { SelectMethodDialogComponent } from './select-method-dialog/select-method-dialog.component';

@Component({
  selector: 'app-request-bar',
  templateUrl: './request-bar.component.html',
  styleUrls: ['./request-bar.component.scss']
})
export class RequestBarComponent {

  constructor(private dialog : MatDialog){}

  @Input() method = RequestMethod.Get
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