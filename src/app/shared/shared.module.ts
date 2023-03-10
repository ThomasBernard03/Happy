import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';
import { HappyLoaderComponent } from './happy-loader/happy-loader.component';
import { LottieModule } from 'ngx-lottie';



@NgModule({
  declarations: [
    CodeEditorComponent,
    HappyLoaderComponent
  ],
  imports: [
    CommonModule,
    CodemirrorModule,
    FormsModule,
    LottieModule
  ],
  exports : [
    CodeEditorComponent, HappyLoaderComponent
  ]
})
export class SharedModule { }
