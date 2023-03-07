import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import * as ace from "ace-builds";
import { RequestService } from 'src/providers/request.service';
import { Request } from 'src/models/request.interface';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  request : Request | null = null

  constructor(private requestService : RequestService){}

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    this.requestService.selectedRequest$.asObservable().subscribe(request => {

      console.log(request);
      
      this.request = request

      if(request != null){
        ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
        const aceEditor = ace.edit(document.getElementById("request_body_content")!);
        aceEditor.session.setMode('ace/mode/json');
        aceEditor.setTheme('ace/theme/twilight');
        aceEditor.setValue(request.body)
      }
    })

    const bodyTab = document.getElementById("request_body_tab")
    const authTab = document.getElementById("request_auth")
    const headersTab = document.getElementById("request_headers")
    const notesTab = document.getElementById("request_notes")

    const bodyContent = document.getElementById("request_body_content")
    const authContent = document.getElementById("request_auth_content")
    const headersContent = document.getElementById("request_headers_content")
    const notesContent = document.getElementById("request_notes_content")


    bodyTab?.addEventListener("click", e => {
      bodyContent!.style.display = "flex"
      authContent!.style.display = "none"
      headersContent!.style.display = "none"
      notesContent!.style.display = "none"
    })

    authTab?.addEventListener("click", e => {
      bodyContent!.style.display = "none"
      authContent!.style.display = "flex"
      headersContent!.style.display = "none"
      notesContent!.style.display = "none"
    })

    headersTab?.addEventListener("click", e => {
      bodyContent!.style.display = "none"
      authContent!.style.display = "none"
      headersContent!.style.display = "flex"
      notesContent!.style.display = "none"
    })

    notesTab?.addEventListener("click", e => {
      bodyContent!.style.display = "none"
      authContent!.style.display = "none"
      headersContent!.style.display = "none"
      notesContent!.style.display = "flex"
    })
  }
}
