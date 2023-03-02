import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Request } from 'src/models/request.interface';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  private eventsSubscription? : Subscription;
  @Input() request$?: Observable<Request>

  request? : Request

  ngOnInit(): void {
    this.eventsSubscription = this.request$?.subscribe(request => {
      console.log(request);
      this.request = request
    })
  }
}
