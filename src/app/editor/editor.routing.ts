import { Routes } from '@angular/router';

import { EditorComponent}  from './wysiwyg-editor/editor.component';
import { Ckeditor } from './ckeditor/ckeditor.component';
import { AceEditorDemoComponent } from './ace-editor/ace-editor.component';

export const EditorRoutes: Routes = [{
  path: '',
  redirectTo: 'grid',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'wysiwyg',
    component: EditorComponent
  }, {
    path: 'ckeditor',
    component: Ckeditor 
  }, {
    path: 'ace-editor',
    component: AceEditorDemoComponent 
  }]
}];
