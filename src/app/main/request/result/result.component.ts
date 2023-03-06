import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Result } from 'src/models/result.interface';
import * as ace from "ace-builds";

@Component({
  selector: 'app-result',
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.scss']
})
export class ResultComponent implements OnInit, AfterViewInit {


  ngOnInit(): void {
    const bodyTab = document.getElementById("result_body_tab")
    const headersTab = document.getElementById("result_headers_tab")

    const bodyContent = document.getElementById("result_body_content")
    const headersContent = document.getElementById("result_headers_content")


    bodyTab?.addEventListener("click", e => {

      bodyContent!.style.display = "flex"
      headersContent!.style.display = "none"
    })


    headersTab?.addEventListener("click", e => {
      bodyContent!.style.display = "none"
      headersContent!.style.display = "flex"
    })
  }

  ngAfterViewInit(): void {
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    const aceEditor = ace.edit(document.getElementById("result_body_content")!);
    aceEditor.session.setMode('ace/mode/json');
    aceEditor.setTheme('ace/theme/twilight');
    aceEditor.setValue(this.result!.body!)
  }

  @Input() result? : Result

}
