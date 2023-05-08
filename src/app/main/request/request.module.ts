import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './request.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestListItemComponent } from './request-list/request-list-item/request-list-item.component';


const routes: Routes = [
  {
    path: '',
    component: RequestComponent,
    children : [
      // { path: 'home', loadChildren:() => import('./home/home.module').then(x => x.HomeModule)},
      // { path: 'shelter', loadChildren: () => import('./shelter/shelter.module').then(x => x.ShelterModule)},
      // { path: 'settings', loadChildren: () => import('./settings/settings.module').then(x => x.SettingsModule)},
      // { path: 'logout', loadChildren: () => import('../authentication/authentication.module').then(x => x.AuthenticationModule)},
  ]},
]


@NgModule({
  declarations: [
    RequestComponent,
    RequestListComponent,
    RequestListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RequestModule { }
