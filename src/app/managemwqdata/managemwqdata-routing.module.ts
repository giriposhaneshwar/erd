import { Routes } from '@angular/router';
import { ManagemwqdataComponent } from './managemwqdata.component';
import { ConfigureBuoysComponent } from './configure-buoys/configure-buoys.component';
import { ConfigureParametersComponent } from './configure-parameters/configure-parameters.component';
import { ConfigureCategoriesComponent } from './configure-categories/configure-categories.component';
import { ManageStationsComponent } from './manage-stations/manage-stations.component';
import { ManageSitesComponent } from './manage-sites/manage-sites.component';
import { ManageVendorDetailsComponent } from './manage-vendor-details/manage-vendor-details.component';
import { ManageLimsServicesComponent } from './manage-lims-services/manage-lims-services.component';

export const ManagemwqdataRoutes: Routes = [{
  path: '',
  redirectTo: 'configure-buoys',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'configure-buoys',
    component: ConfigureBuoysComponent
  }, {
    path: 'configure-parameters',
    component: ConfigureParametersComponent
  }, {
    path: 'configure-categories',
    component: ConfigureCategoriesComponent
  }, {
    path: 'manage-stations',
    component: ManageStationsComponent
  }, {
    path: 'manage-sites',
    component: ManageSitesComponent
  }, {
    path: 'manage-vendor-details',
    component: ManageVendorDetailsComponent
  }, {
    path: 'manage-lims-services',
    component: ManageLimsServicesComponent
  }]
}];