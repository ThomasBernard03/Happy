import { Component, Input, DoCheck, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements DoCheck, OnInit {

  @Input() readonly: boolean = false

  @Input() content!: string
  @Output() contentChange = new EventEmitter()

  options: any

  ngOnInit(): void {
    this.options = {
      readOnly: this.readonly,
      lineNumbers: true,
      theme: 'material',
      height: 'auto',
      mode: {
        name: 'javascript',
        json: true,
        statementIndent: 2
      },
      lineWrapping: true
    }
  }

  ngDoCheck(): void {
    this.contentChange.next(this.content);
  }

}
