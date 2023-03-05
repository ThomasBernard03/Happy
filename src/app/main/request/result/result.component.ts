import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/models/result.interface';

@Component({
  selector: 'app-result',
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.scss']
})
export class ResultComponent implements OnInit {


  ngOnInit(): void {
    const bodyTab = document.getElementById("result_body_tab")
    const headersTab = document.getElementById("result_headers_tab")

    const bodyContent = document.getElementById("result_body_content")
    const headersContent = document.getElementById("result_headers_content")


    bodyTab?.addEventListener("click", e => {
    console.log("f");

      bodyContent!.style.display = "flex"
      headersContent!.style.display = "none"
    })


    headersTab?.addEventListener("click", e => {
      bodyContent!.style.display = "none"
      headersContent!.style.display = "flex"
    })
  }

  @Input() result? : Result

}
