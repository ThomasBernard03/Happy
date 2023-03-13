import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/models/project.interface';
import { Observable } from 'rxjs';
import { RequestService } from 'src/providers/request.service';
import { Request } from 'src/models/request.interface';
import { MatDialog } from '@angular/material/dialog';
import { RequestContextMenuComponent } from './request-context-menu/request-context-menu.component';
import { DialogResult } from 'src/models/enums/dialog-result';
import { ProjectService } from 'src/providers/project.service';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { DeviceService } from 'src/providers/device.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private projectService : ProjectService,
    private dialog: MatDialog,
    private deviceService : DeviceService) {}

  project : Project | null = null
  requests?: Request[]
  selectedRequest : Request | null = null

  ngOnInit() {
    this.projectService.selectedProject.asObservable().subscribe(project => {
      console.log("Selected project : ")
      console.log(project)
      
      
      this.project = project
      this.requestService.selectedRequest$.next(null)

      if(project != null){
        this.requestService.getProjectRequests(project).subscribe(result => {
          this.requests = result
        })
      }
      else {
        this.requests = undefined
      }
    })

    this.requestService.selectedRequest$.asObservable().subscribe(request => {
      console.log("Selected request : ")
      console.log(request)
      
      
      this.selectedRequest = request
    })
  }

  onDoubleClick(request: Request) {
    // search item selected
    const div = document.getElementById("requests_list")?.getElementsByClassName("selected_true")[0]

    // set edittable to item selected
    const span = div!.getElementsByTagName("h5")[0]
    span.contentEditable = "true"

    const range = document.createRange()
    range.selectNodeContents(span)
    const selection = window.getSelection();
    selection!.removeAllRanges();
    selection!.addRange(range);

    span?.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        span.contentEditable = "false"
        request.name = span.textContent!

        const newSpan = span.cloneNode(true)
        span.replaceWith(newSpan)
      }
    })

    span.addEventListener("blur", e => {
      span.contentEditable = "false"
      request.name = span.textContent!

      const newSpan = span.cloneNode(true)
      span.replaceWith(newSpan)
    })
  }

  createRequest() {
    this.requestService.addRequest(this.project!)
  }

  projectSettings(){
    const instance = this.dialog.open(ProjectSettingsComponent, {
      data : this.project
    })
  }

  onRequestClicked(request: Request) {
    // this.electronService.ipcRenderer?.send("request-selected", request)
    this.requestService.selectedRequest$.next(request)
  }

  onRightClick(event: MouseEvent, request: Request) {
    this.onRequestClicked(request)

    const instance = this.dialog.open(RequestContextMenuComponent, {
      data: request,
      position: {
        left: event.clientX + "px",
        top: event.clientY + "px"
      }
    })

    instance.afterClosed().subscribe(result => {
      // if request deleted
      if (result == DialogResult.Delete) {
        this.requestService.deleteRequest(this.selectedRequest!)
        this.selectedRequest = null
      }
      else if (result == DialogResult.Rename) {
        this.onDoubleClick(request)
      }
      else if (result == DialogResult.Copy){
        this.deviceService.addToClipboard(JSON.stringify(this.selectedRequest, null, 2))
      }
    })
  }
}
