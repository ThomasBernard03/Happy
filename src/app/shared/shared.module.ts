import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';
import { HappyLoaderComponent } from './happy-loader/happy-loader.component';
import { LottieModule } from 'ngx-lottie';
import { HeadersComponent } from './headers/headers.component';



@NgModule({
  declarations: [
    CodeEditorComponent,
    HappyLoaderComponent,
    HeadersComponent
  ],
  imports: [
    CommonModule,
    CodemirrorModule,
    FormsModule,
    LottieModule
  ],
  exports : [
    CodeEditorComponent,
    HappyLoaderComponent,
    HeadersComponent
  ]
})
export class SharedModule { }
