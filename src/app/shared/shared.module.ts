import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CodeEditorComponent
  ],
  imports: [
    CommonModule,
    CodemirrorModule,
    FormsModule
  ],
  exports : [
    CodeEditorComponent
  ]
})
export class SharedModule { }
