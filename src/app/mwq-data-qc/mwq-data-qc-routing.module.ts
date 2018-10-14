
import { Routes } from '@angular/router';
import { MwqDataQcComponent } from './mwq-data-qc.component';
import { QcSiteDetailsComponent } from './tabs/qc-site-details/qc-site-details.component';
import { QcInSituParametersComponent } from './tabs/qc-in-situ-parameters/qc-in-situ-parameters.component';
import { QcGeneralChemistryComponent } from './tabs/qc-general-chemistry/qc-general-chemistry.component';
import { QcInOrganicChemistryComponent } from './tabs/qc-in-organic-chemistry/qc-in-organic-chemistry.component';
import { QcOrganicChemistryComponent } from './tabs/qc-organic-chemistry/qc-organic-chemistry.component';
import { QcMicroBiologyComponent } from './tabs/qc-micro-biology/qc-micro-biology.component';
import { QcRemarksComponent } from './tabs/qc-remarks/qc-remarks.component';
import { QcInfoComponent } from './tabs/qc-info/qc-info.component';
import { QcUploadFilesComponent } from './tabs/qc-upload-files/qc-upload-files.component';

export const MwqDataQcRoutes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: MwqDataQcComponent,
    children: [
      { path: '', redirectTo: 'qc-info', pathMatch: 'full' },
      { path: 'qc-info', component: QcInfoComponent},
      { path: 'qc-site-details', component: QcSiteDetailsComponent},
      { path: 'qc-in-situ-parameters', component: QcInSituParametersComponent},
      { path: 'qc-general-chemistry', component: QcGeneralChemistryComponent},
      { path: 'qc-in-organic-chemistry', component: QcInOrganicChemistryComponent},
      { path: 'qc-organic-chemistry', component: QcOrganicChemistryComponent},
      { path: 'qc-microbiology', component: QcMicroBiologyComponent},
      { path: 'qc-upload-files', component: QcUploadFilesComponent},
      { path: 'qc-remarks', component: QcRemarksComponent}
    ]
  }]
}];
