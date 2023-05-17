import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestBarComponent, SelectMethodDialogComponent } from './request-bar/request-bar.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';


@NgModule({
  declarations: [
    RequestBarComponent,
    SelectMethodDialogComponent,
    TabsComponent,
    TabComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule

  ],
  exports: [
    RequestBarComponent,
    TabComponent,
    TabsComponent
  ]
})
export class SharedModule { }
