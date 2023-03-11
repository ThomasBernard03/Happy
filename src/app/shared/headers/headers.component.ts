import { Component, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { Header } from 'src/models/header.interface';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements DoCheck {

  @Input() readonly = false

  @Input() headers? : Header[]
  @Output() headersChange = new EventEmitter()

  ngDoCheck(): void {
    this.headersChange.next(this.headers)
  }
}
