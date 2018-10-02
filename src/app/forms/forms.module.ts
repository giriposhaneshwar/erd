import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TreeModule } from 'angular-tree-component';
import { DirectivesModule } from '../core/widgster/directives.module';
import { FormWizardComponent}  from './form-wizard/formwizard.component';
import { FormValidationComponent}  from './form-validation/formvalidation.component';
import { FormUploadComponent}  from './form-upload/formupload.component';
import { FormTreeComponent}  from './form-tree/formtree.component';
import { DemoMaterialModule } from '../material-demo.module';
import { FormsRoutes } from './forms.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxDatatableModule,
    TreeModule,
    DirectivesModule,
    RouterModule.forChild(FormsRoutes)
  ],
  declarations: [ 
    FormWizardComponent,
    FormValidationComponent,
    FormUploadComponent,
    FormTreeComponent,
  ]
})

export class FormsDemoModule {}
