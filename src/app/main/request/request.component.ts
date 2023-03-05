import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from 'src/models/request.interface';
import { HttpService } from 'src/providers/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ElectronService } from 'src/providers/electron.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  @Input() request$?: Observable<Request | undefined>
  request? : Request

  constructor(private httpService : HttpService, private electronService : ElectronService){}

  ngOnInit(): void {
    this.request$?.subscribe(request => {
      this.request = request
    })


    this.electronService.ipcRenderer?.on("send-request", (e, args) => {
      this.onSendButtonClicked()
    })
  }

  onSendButtonClicked(){
    this.request!.result = {
      guid : crypto.randomUUID(),
      requestGuid : this.request!.guid,
      code : 0,
      status : "",
      body : "",
      headers : new Map(),
      date : new Date().getUTCMilliseconds(),
      time : 0
    }

    this.httpService.sendRequest(this.request!).subscribe(response => {

      response.headers.keys()

      this.request!.result!.code = response.status
      this.request!.result!.status = response.statusText
      this.request!.result!.body = JSON.stringify(response.body, null, 2),
      this.request!.result!.headers = response.headers["headers"]
      this.request!.result!.time = new Date().getUTCMilliseconds() - this.request!.result!.date
      

    }, (e : HttpErrorResponse) => {

      e.headers.keys()

      this.request!.result!.code = e.status
      this.request!.result!.status = e.error
      this.request!.result!.headers = e.headers["headers"]
      this.request!.result!.time = new Date().getUTCMilliseconds() - this.request!.result!.date

      console.log(e)
    })
  }
}
