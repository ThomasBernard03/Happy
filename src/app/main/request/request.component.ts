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
      this.request = request
      this.result = undefined
    })
  }


  onSendButtonClicked(){
    this.result = {
      guid : crypto.randomUUID(),
      requestGuid : this.request!.guid,
      code : 0,
      status : "",
      body : "",
      headers : "",
      date : new Date(),
      time : 0
    }

    this.httpService.sendRequest(this.request!).subscribe(response => {

      console.log(response);

      this.result!.code = response.status
      this.result!.status = response.statusText
      this.result!.body = JSON.stringify(response.body, null, 2),
      this.result!.headers = ""
      this.result!.time = new Date().getMilliseconds() - this.result!.date.getMilliseconds()

    }, (e : HttpErrorResponse) => {

      this.result!.code = e.status
      this.result!.status = e.error
      this.result!.headers = ""
      this.result!.time = new Date().getMilliseconds() - this.result!.date.getMilliseconds()

      console.log(e)
    })
  }
}
