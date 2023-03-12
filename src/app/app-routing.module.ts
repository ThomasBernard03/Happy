import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path : '',
    loadChildren : () => import('./main/main.module').then(x => x.MainModule)
  },
  {
    path : 'settings',
    loadChildren : () => import('./settings/settings.module').then(x => x.SettingsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
