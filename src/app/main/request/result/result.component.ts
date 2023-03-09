import { Component, OnInit } from '@angular/core';
import { Result } from 'src/models/result.interface';
import { RequestService } from 'src/providers/request.service';

@Component({
  selector: 'app-result',
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private requestService: RequestService) { }

  result: Result | null = null
  formatedDate = ""


  ngOnInit(): void {

    this.requestService.selectedRequest$.subscribe(request => {
      if (request?.result) {
        this.result = request?.result

        const date = new Date(request.result?.date)

        let day = date.getDate().toString().padStart(2, '0'); // jour sur 2 chiffres
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // mois sur 2 chiffres (attention, les mois commencent à 0 en JavaScript)
        let year = date.getFullYear(); // année sur 4 chiffres
        let hours = date.getHours().toString().padStart(2, '0'); // heures sur 2 chiffres
        let minutes = date.getMinutes().toString().padStart(2, '0'); // minutes sur 2 chiffres
        let seconds = date.getSeconds().toString().padStart(2, '0'); // secondes sur 2 chiffres

        this.formatedDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
      }
      else {
        this.result = null
      }
    })
  }
}
