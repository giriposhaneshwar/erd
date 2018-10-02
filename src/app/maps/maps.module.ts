import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { DemoMaterialModule } from '../material-demo.module';
import { GoogleMapComponent}  from './google-map/googlemap.component';
import { LeafletMapComponent}  from './leaflet-map/leafletmap.component';

import { MapsRoutes } from './maps.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DemoMaterialModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk'}),
    RouterModule.forChild(MapsRoutes)
  ],
  declarations: [ 
    GoogleMapComponent,
    LeafletMapComponent,
  ]
})

export class MapsDemoModule {}
