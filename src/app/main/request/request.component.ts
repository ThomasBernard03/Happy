import { Component, OnInit } from '@angular/core';
import { Request } from 'src/models/request.interface';
import { HttpService } from 'src/providers/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestService } from 'src/providers/request.service';
import { Header } from 'src/models/header.interface';
import { RequestMethod } from 'src/models/enums/request-method'

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  request: Request | null = null

  isSendingRequest = false

  constructor(private httpService: HttpService, private requestService: RequestService) { }

  ngOnInit(): void {

    this.requestService.selectedRequest$.asObservable().subscribe(request => {
      console.log("Request received :");
      console.log(this.request);
      
      this.request = request
    })
  }

  onSendButtonClicked(params : {url : string, method : RequestMethod}) {

    this.isSendingRequest = true

    this.request!.url = params.url
    this.request!.method = params.method

    this.request!.result = {
      guid: crypto.randomUUID(),
      requestGuid: this.request!.guid,
      code: 0,
      status: "",
      body: "",
      headers: new Array(),
      date: new Date().getTime(),
      time: 0
    }

    this.httpService.sendRequest(this.request!).subscribe(response => {

      response.headers.keys()

      this.request!.result!.code = response.status
      this.request!.result!.status = response.statusText
      this.request!.result!.body = JSON.stringify(response.body, null, 2),
      this.request!.result!.time = new Date().getTime() - this.request!.result!.date

      const responseHeaders = Array.from(response.headers["headers"].entries())
      this.request!.result!.headers =responseHeaders.map( x => {

        var val = x as [string, string[]]

        var header : Header = {
          key : val[0],
          value : val[1][0]
        }

        return header
      })

      this.requestService.selectedRequest$.next(this.request)
      this.isSendingRequest = false

    }, (e: HttpErrorResponse) => {

      e.headers.keys()

      this.request!.result!.code = e.status
      this.request!.result!.body = JSON.stringify(e.error, null, 2)
      this.request!.result!.time = new Date().getTime() - this.request!.result!.date


      const responseHeaders = Array.from(e.headers["headers"].entries())
      this.request!.result!.headers = responseHeaders.map( x => {

        var val = x as [string, string[]]

        var header : Header = {
          key : val[0],
          value : val[1][0]
        }

        return header
      })


      console.log(e)
      this.requestService.selectedRequest$.next(this.request)
      this.isSendingRequest = false
    })
  }
}
