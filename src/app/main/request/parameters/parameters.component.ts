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
