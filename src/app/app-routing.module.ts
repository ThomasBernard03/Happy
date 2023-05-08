import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path : '', loadChildren : () => import('./authentication/authentication.module').then(x => x.AuthenticationModule) },
  { path : '', loadChildren : () => import('./main/main.module').then(x => x.MainModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
