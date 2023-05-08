import { Component, OnInit } from '@angular/core';
import { Request } from 'src/models/request.interface';
import { HttpVerb } from 'src/models/verb.enum';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

  requests? : Request[] 


  ngOnInit(): void {

    this.requests = [
      {
        "id": "1",
        "name": "Request 1",
        "method": HttpVerb.Get
      },
      {
        "id": "2",
        "name": "Request 2",
        "method": HttpVerb.Post
      },
      {
        "id": "3",
        "name": "Request 3",
        "method": HttpVerb.Put
      },
      {
        "id": "4",
        "name": "Request 4",
        "method": HttpVerb.Patch
      },
      {
        "id": "5",
        "name": "Request 5",
        "method": HttpVerb.Delete
      },
      {
        "id": "6",
        "name": "Request 6",
        "method": HttpVerb.Post
      },
      {
        "id": "7",
        "name": "Request 7",
        "method": HttpVerb.Get
      }
    ]
       
    

  }

}
