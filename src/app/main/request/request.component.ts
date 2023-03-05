import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Request } from 'src/models/request.interface';
import { HttpService } from 'src/providers/http.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Result } from 'src/models/result.interface';
import { ElectronService } from 'src/providers/electron.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  @Input() request$?: Observable<Request | undefined>
  request? : Request
  result? : Result

  constructor(private httpService : HttpService, private electronService : ElectronService){}

  ngOnInit(): void {
    this.request$?.subscribe(request => {
      this.request = request
      this.result = undefined
    })


    this.electronService.ipcRenderer?.on("send-request", (e, args) => {
      this.onSendButtonClicked()
    })
  }

  onSendButtonClicked(){
    this.result = {
      guid : crypto.randomUUID(),
      requestGuid : this.request!.guid,
      code : 0,
      status : "",
      body : "",
      headers : new Map(),
      date : new Date(),
      time : 0
    }

    this.httpService.sendRequest(this.request!).subscribe(response => {

      response.headers.keys()

      this.result!.code = response.status
      this.result!.status = response.statusText
      this.result!.body = JSON.stringify(response.body, null, 2),
      this.result!.headers = response.headers["headers"]
      this.result!.time = new Date().getMilliseconds() - this.result!.date.getMilliseconds()


      console.log(this.result?.headers);
      

    }, (e : HttpErrorResponse) => {

      e.headers.keys()

      this.result!.code = e.status
      this.result!.status = e.error
      this.result!.headers = e.headers["headers"]
      this.result!.time = new Date().getMilliseconds() - this.result!.date.getMilliseconds()

      console.log(e)
    })
  }
}
