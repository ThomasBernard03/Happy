import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectDialogComponent } from './projects/create-project-dialog/create-project-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestsComponent } from './requests/requests.component';
import { FormsModule } from '@angular/forms';
import { RequestComponent } from './request/request.component';
import { ResultComponent } from './request/result/result.component';
import { ParametersComponent } from './request/parameters/parameters.component';
import { RequestContextMenuComponent } from './requests/request-context-menu/request-context-menu.component';
import { ProjectContextMenuComponent } from './projects/project-context-menu/project-context-menu.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectSettingsComponent } from './requests/project-settings/project-settings.component';


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
    RequestsComponent,
    RequestComponent,
    ResultComponent,
    ParametersComponent,
    RequestContextMenuComponent,
    ProjectContextMenuComponent,
    ProjectSettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    FormsModule,
    SharedModule
  ],
  providers : []
})
export class MainModule { }
