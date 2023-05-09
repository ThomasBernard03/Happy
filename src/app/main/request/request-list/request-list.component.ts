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
        guid: "aa7d8e84-8375-4a88-8a4c-ecdd9b9fa501",
        name: "Request 1",
        method: HttpVerb.Post
      },
      {
        guid: "b8d9a49f-2e55-42b7-8d0a-327c1fcfbae6",
        name: "Request 2",
        method: HttpVerb.Get
      },
      {
        guid: "c0c3ef09-832d-43c2-a9b6-10b6af30d6a1",
        name: "Request 3",
        method: HttpVerb.Get
      },
      {
        guid: "d2a1b772-0d6a-4726-8721-855f8d7c3346",
        name: "Request 4",
        method: HttpVerb.Patch
      },
      {
        guid: "e55e82e7-bb9f-4bb5-b3aa-56b7fb8d6804",
        name: "Request 5",
        method: HttpVerb.Put
      },
      {
        guid: "f6c3140f-3ef3-43e6-96e6-853822259c33",
        name: "Request 6",
        method: HttpVerb.Delete
      },
      {
        guid: "g7d88a6c-61c8-4237-8d5e-6a1065f5d5af",
        name: "Request 7",
        method: HttpVerb.Post
      },
      {
        guid: "h2d5e22e-f6d8-46f1-9ec9-0b261a6e8f87",
        name: "Request 8",
        method: HttpVerb.Get
      },
      {
        guid: "i4c4bba4-c4c7-4b06-a1ed-cc955b44eb3e",
        name: "Request 9",
        method: HttpVerb.Get
      },
      {
        guid: "j0d96724-159f-4662-a9ac-d4a4e77112ba",
        name: "Request 10",
        method: HttpVerb.Get
      },
      {
        guid: "k7e768e8-8e02-4170-a36e-546f364fbf23",
        name: "Request 11",
        method: HttpVerb.Post
      },
      {
        guid: "l7b5f47d-8f6d-4319-bef7-1c21c10d7cb3",
        name: "Request 12",
        method: HttpVerb.Get
      },
      {
        guid: "m6d61b13-3ed6-488f-8472-b6d2f6e200c6",
        name: "Request 13",
        method: HttpVerb.Get
      },
      {
        guid: "n8d9647f-f9a9-4d56-bf28-fa2494131c50",
        name: "Request 14",
        method: HttpVerb.Delete
      }
    ]
  }

}
