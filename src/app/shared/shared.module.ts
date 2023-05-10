import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestBarComponent, SelectMethodDialogComponent } from './request-bar/request-bar.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    RequestBarComponent,
    SelectMethodDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule

  ],
  exports: [
    RequestBarComponent,
    SelectMethodDialogComponent
  ]
})
export class SharedModule { }
