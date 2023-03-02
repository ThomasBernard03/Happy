import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/models/project.interface';
import { Observable, Subscription } from 'rxjs';
import { RequestService } from 'src/providers/request.service';
import { Request } from 'src/models/request.interface';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  constructor(private requestService : RequestService){

  }

  private eventsSubscription? : Subscription;
  @Input() project$?: Observable<Project>

  @Output() onRequestSelected = new EventEmitter<Request>()

  project? : Project
  requests? : Request[]

  ngOnInit() {
    this.eventsSubscription = this.project$?.subscribe(project => {
      console.log(project);
      this.project = project

      this.requests = this.requestService.getProjectRequests(project)
    })
  }

  createRequest(){
    const request = this.requestService.createRequest(this.project!)
    this.requests?.push(request)
  }

  onRequestClicked(request : Request){
    this.onRequestSelected.emit(request)
  }
}
