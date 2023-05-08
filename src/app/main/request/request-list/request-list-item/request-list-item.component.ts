import { Component, Input } from '@angular/core';
import { Request } from 'src/models/request.interface';

@Component({
  selector: 'app-request-list-item',
  templateUrl: './request-list-item.component.html',
  styleUrls: ['./request-list-item.component.scss']
})
export class RequestListItemComponent {

  @Input() request? : Request

}
