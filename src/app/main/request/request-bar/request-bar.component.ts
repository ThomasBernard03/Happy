import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RequestMethod } from 'src/models/enums/request-method';
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
      if(method){
        this.method = method
      }
    })
  }
}
