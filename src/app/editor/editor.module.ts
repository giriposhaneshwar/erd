import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material';
import { QuillModule } from 'ngx-quill';
import { CKEditorModule } from 'ng2-ckeditor';
import { AceEditorModule } from 'ng2-ace-editor';
import { DirectivesModule } from '../core/widgster/directives.module';

import { EditorComponent}  from './wysiwyg-editor/editor.component';
import { Ckeditor } from './ckeditor/ckeditor.component';
import { AceEditorDemoComponent } from './ace-editor/ace-editor.component';

import { EditorRoutes } from './editor.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    QuillModule,
    CKEditorModule,
    AceEditorModule,
    DirectivesModule,
    RouterModule.forChild(EditorRoutes)
  ],
  declarations: [ 
    EditorComponent,
    Ckeditor,
    AceEditorDemoComponent,
  ]
})

export class EditorDemoModule {}
