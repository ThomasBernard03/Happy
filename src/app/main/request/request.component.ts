import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Request } from 'src/models/request.interface';
import { HttpService } from 'src/providers/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Result } from 'src/models/result.interface';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  @Input() request$?: Observable<Request | undefined>
  request? : Request
  result? : Result

  constructor(private httpService : HttpService){

  }

  ngOnInit(): void {
    this.request$?.subscribe(request => {
      console.log(request);
      this.request = request
      this.result = undefined
    })
  }


  onSendButtonClicked(){
    this.httpService.sendRequest(this.request!).subscribe(response => {

      console.log(response);
      

      this.result = {
        guid : crypto.randomUUID(),
        requestGuid : this.request!.guid,
        code : response.status,
        status : response.statusText,
        body : JSON.stringify(response.body, null, 2),
        headers : ""
      }

    }, (e : HttpErrorResponse) => {

      this.result = {
        guid : crypto.randomUUID(),
        requestGuid : this.request!.guid,
        code : e.status,
        status : e.error,
        body : "",
        headers : ""
      }

      console.log(e)
    })
  }
}
