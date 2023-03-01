import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams/teams.component';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateTeamDialogComponent } from './teams/create-team-dialog/create-team-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
];


@NgModule({
  declarations: [
    TeamsComponent,
    MainComponent,
    CreateTeamDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule
  ]
})
export class MainModule { }
