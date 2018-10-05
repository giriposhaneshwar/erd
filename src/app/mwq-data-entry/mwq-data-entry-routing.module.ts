import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MwqDataEntryComponent } from './mwq-data-entry.component';

import { DataEntryComponent } from "./tabs/data-entry/data-entry.component";
import { SiteDataComponent } from './tabs/site-data/site-data.component';
import { InSituParametersComponent } from './tabs/in-situ-parameters/in-situ-parameters.component';
import { GeneralChemistryComponent } from './tabs/general-chemistry/general-chemistry.component';
import { InOrganicChemistryComponent } from './tabs/in-organic-chemistry/in-organic-chemistry.component';
import { OrganicChemistryComponent } from './tabs/organic-chemistry/organic-chemistry.component';
import { MicroBiologyComponent } from './tabs/micro-biology/micro-biology.component';
import { UploadFilesComponent } from './tabs/upload-files/upload-files.component';

export const MwqDataEntryRoutes: Routes = [{
  path: '',
  children: [{
      path: '',
      component: MwqDataEntryComponent,
      children: [
        { path: '', redirectTo: 'data-entry', pathMatch: 'full' },
        { path: 'data-entry', component: DataEntryComponent},
        { path: 'site-details', component: SiteDataComponent},
        { path: 'in-situ-parameters', component: InSituParametersComponent},
        { path: 'general-chemistry', component: GeneralChemistryComponent},
        { path: 'in-organic-chemistry', component: InOrganicChemistryComponent},
        { path: 'organic-chemistry', component: OrganicChemistryComponent},
        { path: 'microbiology', component: MicroBiologyComponent},
        { path: 'upload-files', component: UploadFilesComponent}
      ]
  }]
}];

