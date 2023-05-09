import { Component } from '@angular/core';
import { Request } from 'src/models/request.interface';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent {

  selectedRequest? : Request

}
