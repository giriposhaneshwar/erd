import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadDataRoutes } from './download-data.routing.module';
import { RouterModule } from '@angular/router';
import { DownloadDataComponent } from './download-data.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from 'app/core/widgster/directives.module';

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
  declarations: [DownloadDataComponent]
})
export class DownloadDataModule { }
