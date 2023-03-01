import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectDialogComponent } from './projects/create-project-dialog/create-project-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { RequestsComponent } from './requests/requests.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
];


@NgModule({
  declarations: [
    ProjectsComponent,
    MainComponent,
    CreateProjectDialogComponent,
    RequestsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule
  ]
})
export class MainModule { }
