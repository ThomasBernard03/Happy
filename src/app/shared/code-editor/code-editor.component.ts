import { Component, Input, DoCheck, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements DoCheck {

  @Input() content? : string
  @Output() contentChange = new EventEmitter()

  ngDoCheck() : void {
    this.contentChange.next(this.content);
  }

}
