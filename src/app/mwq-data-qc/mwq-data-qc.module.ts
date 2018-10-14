import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MwqDataQcRoutes } from './mwq-data-qc-routing.module';
import { RouterModule } from '@angular/router';
import { MwqDataQcComponent } from './mwq-data-qc.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from 'app/core/widgster/directives.module';
import { QcGeneralChemistryComponent } from './tabs/qc-general-chemistry/qc-general-chemistry.component';
import { QcInOrganicChemistryComponent } from './tabs/qc-in-organic-chemistry/qc-in-organic-chemistry.component';
import { QcInSituParametersComponent } from './tabs/qc-in-situ-parameters/qc-in-situ-parameters.component';
import { QcMicroBiologyComponent } from './tabs/qc-micro-biology/qc-micro-biology.component';
import { QcOrganicChemistryComponent } from './tabs/qc-organic-chemistry/qc-organic-chemistry.component';
import { QcSiteDetailsComponent } from './tabs/qc-site-details/qc-site-details.component';
import { QcRemarksComponent } from './tabs/qc-remarks/qc-remarks.component';
import { QcInfoComponent } from './tabs/qc-info/qc-info.component';
import { QcUploadFilesComponent } from './tabs/qc-upload-files/qc-upload-files.component';
import { QcHistoricalGraphDirective} from '../partials/qc-historical-graph.directive';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    DirectivesModule,
    RouterModule.forChild(MwqDataQcRoutes)
  ],
  declarations: [MwqDataQcComponent, 
    QcGeneralChemistryComponent, 
    QcInOrganicChemistryComponent, 
    QcInSituParametersComponent, 
    QcMicroBiologyComponent, 
    QcOrganicChemistryComponent, 
    QcSiteDetailsComponent, 
    QcRemarksComponent, 
    QcInfoComponent, 
    QcUploadFilesComponent,
    QcHistoricalGraphDirective
    ],
    exports:[
      MwqDataQcComponent,QcHistoricalGraphDirective
    ]
})
export class MwqDataQcModule { }
