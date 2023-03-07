import { Component, OnInit } from '@angular/core';
import { Result } from 'src/models/result.interface';
import { RequestService } from 'src/providers/request.service';

@Component({
  selector: 'app-result',
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private requestService : RequestService){}

  result : Result | null = null


  ngOnInit(): void {

    this.requestService.selectedRequest$.subscribe(request => {
      if(request?.result){
        this.result = request?.result
      }
    })

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
}
