import { Component } from '@angular/core';
import { Project } from 'src/models/project.interface';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent {

  selectedProject? : Project

}
