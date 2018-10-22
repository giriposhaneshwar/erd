import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadDataRoutes } from './download-data.routing.module';
import { RouterModule } from '@angular/router';
import { DownloadDataComponent } from './download-data.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from 'app/core/widgster/directives.module';
import { DownloadMwqIndiciesDataComponent } from './download-mwq-indicies-data/download-mwq-indicies-data.component';
import { DownloadBuoysDataComponent } from './download-buoys-data/download-buoys-data.component';
import { DownloadMwqDataComponent } from './download-mwq-data/download-mwq-data.component';
import { DownloadBuoysDataService } from './download-buoys-data/download-buoys-data.service';
import { DownloadMwqDataService } from './download-mwq-data/download-mwq-data.service';
import { DownloadMwqIndicesDataService } from './download-mwq-indicies-data/download-mwq-indices-data.service';


@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, 
    MatCardModule, 
    DirectivesModule,
    RouterModule.forChild(DownloadDataRoutes)
  ],
  declarations: [DownloadDataComponent,DownloadMwqIndiciesDataComponent,DownloadBuoysDataComponent,DownloadMwqDataComponent],
  providers: [DownloadBuoysDataService,DownloadMwqDataService,DownloadMwqIndicesDataService]
})
export class DownloadDataModule { }
