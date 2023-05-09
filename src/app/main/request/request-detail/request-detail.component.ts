import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent {

  guid : String = ""

  constructor(route : ActivatedRoute){
    const routeParams = route.snapshot.paramMap
    this.guid = routeParams.get("guid") ?? ""
  }

}
