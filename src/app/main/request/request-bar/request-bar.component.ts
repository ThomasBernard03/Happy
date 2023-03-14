import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RequestMethod } from 'src/models/enums/request-method';

@Component({
  selector: 'app-request-bar',
  templateUrl: './request-bar.component.html',
  styleUrls: ['./request-bar.component.scss']
})
export class RequestBarComponent {

  @Input() method = RequestMethod.Get

  @Input() url = ""

  @Output() onSendRequest = new EventEmitter()

  onSendButtonClicked(){
    this.onSendRequest.emit({
      url: this.url,
      method : this.method
    })
  }
}
