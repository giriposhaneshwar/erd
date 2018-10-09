import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagemwqdataComponent } from './managemwqdata.component';
import { ManagemwqdataRoutes } from './managemwqdata-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from 'app/core/widgster/directives.module';
import { ConfigureBuoysComponent } from './configure-buoys/configure-buoys.component';
import { ConfigureCategoriesComponent } from './configure-categories/configure-categories.component';
import { ConfigureParametersComponent } from './configure-parameters/configure-parameters.component';
import { ManageLimsServicesComponent } from './manage-lims-services/manage-lims-services.component';
import { ManageSitesComponent } from './manage-sites/manage-sites.component';
import { ManageStationsComponent } from './manage-stations/manage-stations.component';
import { ManageVendorDetailsComponent } from './manage-vendor-details/manage-vendor-details.component';

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
  declarations: [ManagemwqdataComponent, ConfigureBuoysComponent, ConfigureCategoriesComponent, ConfigureParametersComponent, ManageLimsServicesComponent, ManageSitesComponent, ManageStationsComponent, ManageVendorDetailsComponent]
})

export class ManagemwqdataModule { }
