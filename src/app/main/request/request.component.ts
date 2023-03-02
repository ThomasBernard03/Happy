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

  @Input() request$?: Observable<Request>
  request? : Request
  result! : Result

  constructor(private httpService : HttpService){

  }

  ngOnInit(): void {
    this.request$?.subscribe(request => {
      console.log(request);
      this.request = request
    })
  }


  onSendButtonClicked(){
    this.httpService.sendRequest(this.request!).subscribe(response => {

      this.result = {
        guid : crypto.randomUUID(),
        requestGuid : this.request!.guid,
        code : response.status,
        status : response.statusText,
        body : JSON.stringify(response.body),
        headers : ""
      }

      console.log(this.result);
    }, (e : HttpErrorResponse) => {

      this.result = {
        guid : crypto.randomUUID(),
        requestGuid : this.request!.guid,
        code : e.status,
        status : e.statusText,
        body : "",
        headers : ""
      }

      console.log(this.result)
    })
  }
}
