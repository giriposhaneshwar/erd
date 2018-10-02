import { Routes } from '@angular/router';

import { CropperComponent}  from './image-cropper/image-cropper.component';
import { ColorPickerComponent}  from './color-picker/color-picker.component';
import { DragulaDemoComponent}  from './dragula/dragula.component';
import { SortableDemoComponent}  from './sortablejs/sortable.component';
import { ResizableComponent }  from './resizable/resizable.component';

export const FeaturesRoutes: Routes = [{
  path: '',
  redirectTo: 'dashboard-v1',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'cropper',
    component: CropperComponent
  },{
    path: 'colorpicker',
    component: ColorPickerComponent
  },{
    path: 'dragula',
    component: DragulaDemoComponent
  },{
    path: 'sortable',
    component: SortableDemoComponent
  },{
    path: 'resizable',
    component: ResizableComponent
  }]
}];
