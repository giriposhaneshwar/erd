import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material';
import { DirectivesModule } from '../core/widgster/directives.module';

import { FontAwesomeComponent}  from './font-awesome/font-awesome.component';
import { MaterialIconComponent}  from './material-icons/icons.component';
import { LineaComponent}  from './linea/linea.component';
import { SimpleLineIconsComponent}  from './simple-line-icons/simple-line-icons.component';

import { IconsRoutes } from './icons.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    DirectivesModule,
    RouterModule.forChild(IconsRoutes)
  ],
  declarations: [ 
    FontAwesomeComponent,
    MaterialIconComponent,
   	LineaComponent,
  	SimpleLineIconsComponent
  ]
})

export class IconsModule {}
