import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagemwqdataComponent } from './managemwqdata.component';
import { ManagemwqdataRoutes } from './managemwqdata-routing.module';
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
    RouterModule.forChild(ManagemwqdataRoutes)
  ],
  declarations: [ManagemwqdataComponent]
})

export class ManagemwqdataModule { }
