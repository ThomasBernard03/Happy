import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() icon? : string
  @Input() text = "Send"
  
  @Output() onButtonClicked = new EventEmitter()


  buttonClicked(){
    this.onButtonClicked.emit()
  }
}
