import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuoysdashboardComponent } from './buoysdashboard.component';
import { RouterModule } from '@angular/router';
import { BuoysDashboardRoutes } from './buoysdashboard.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from '../core/widgster/directives.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatInputModule, 
    MatCardModule, 
    DirectivesModule,
    HttpClientModule,
   
    RouterModule.forChild(BuoysDashboardRoutes)
  ],
  declarations: [BuoysdashboardComponent]
})
export class BuoysdashboardModule { 
  BuoysdashboardComponent:any;
}

