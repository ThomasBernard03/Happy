import { Component, Input } from '@angular/core';
import { Project } from 'src/models/project.interface';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent {

  @Input() selectedProject? : Project

}
