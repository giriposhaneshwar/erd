import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastModule } from 'ng6-toastr/ng2-toastr';

import { MwqDataEntryRoutes } from "./mwq-data-entry-routing.module";
import { MwqDataEntryComponent } from "./mwq-data-entry.component";
import { RouterModule } from "@angular/router";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule, MatCardModule } from "@angular/material";
import { DirectivesModule } from "app/core/widgster/directives.module";
import { SiteDataComponent } from "./tabs/site-data/site-data.component";
import { InSituParametersComponent } from "./tabs/in-situ-parameters/in-situ-parameters.component";
import { GeneralChemistryComponent } from "./tabs/general-chemistry/general-chemistry.component";
import { InOrganicChemistryComponent } from "./tabs/in-organic-chemistry/in-organic-chemistry.component";
import { OrganicChemistryComponent } from "./tabs/organic-chemistry/organic-chemistry.component";
import { MicroBiologyComponent } from "./tabs/micro-biology/micro-biology.component";
import { UploadFilesComponent } from "./tabs/upload-files/upload-files.component";
import { DemoMaterialModule } from "../material-demo.module";
import { DataEntryComponent } from "./tabs/data-entry/data-entry.component";
import { HistoricalGraphDirective } from '../partials/historical-graph.directive';
import { QcInfoComponent } from './tabs/qc-info/qc-info.component';
import { QcRemarksComponent } from './tabs/qc-remarks/qc-remarks.component';
import { GraphComponent } from '../partials/graph/graph.component';
import { OnlyNumber } from "./onlynumber.directive";

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    DirectivesModule,
    DemoMaterialModule,
    ToastModule.forRoot(),
    RouterModule.forChild(MwqDataEntryRoutes)
  ],
  declarations: [
    MwqDataEntryComponent,
    SiteDataComponent,
    InSituParametersComponent,
    GeneralChemistryComponent,
    InOrganicChemistryComponent,
    OrganicChemistryComponent,
    MicroBiologyComponent,
    UploadFilesComponent,
    DataEntryComponent,
    QcInfoComponent,
    QcRemarksComponent,
    HistoricalGraphDirective,
    GraphComponent,
    OnlyNumber
  ],
  exports: [MwqDataEntryComponent, HistoricalGraphDirective]
})
export class MwqDataEntryModule {}
