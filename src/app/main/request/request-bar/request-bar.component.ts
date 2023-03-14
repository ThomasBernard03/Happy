import { Component, Input, Output, EventEmitter, DoCheck } from '@angular/core';

@Component({
  selector: 'app-request-bar',
  templateUrl: './request-bar.component.html',
  styleUrls: ['./request-bar.component.scss']
})
export class RequestBarComponent implements DoCheck {

  @Input() method = ""
  @Output() methodChange = new EventEmitter()

  @Input() url = ""
  @Output() urlChange = new EventEmitter()

  @Output() onSendRequest = new EventEmitter()

  onSendButtonClicked(){
    this.onSendRequest.emit()
  }

  ngDoCheck() : void{
    this.methodChange.next(this.method)
    this.urlChange.next(this.url)
  }
}
