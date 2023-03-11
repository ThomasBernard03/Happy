import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/providers/request.service';
import { Request } from 'src/models/request.interface';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  request : Request | null = null
  tab = "Body"

  constructor(private requestService : RequestService){}

  ngOnInit(): void {

    this.requestService.selectedRequest$.asObservable().subscribe(request => {

      console.log(request);
      
      this.request = request
    })
  }

  onAddHeader(){
    this.request?.headers.push({
      key : "Your key",
      value : "Your value"
    })

    console.log(this.request?.headers);
  }

  onClearHeaders(){
    this.request!.headers = []
  }

  onBodyClicked(){
    this.tab = "Body"
  }

  onHeadersClicked(){
    this.tab = "Headers"
  }

  onNotesClicked(){
    this.tab = "Notes"
  }
}
