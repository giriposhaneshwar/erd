import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../core/widgster/directives.module';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PricingComponent } from './pricing/pricing.component';
import { BlankComponent } from './blank/blank.component';

import { PagesRoutes } from './pages.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    RouterModule.forChild(PagesRoutes)
  ],
  declarations: [ 
    AboutComponent,
    ContactComponent,
    TimelineComponent,
    PricingComponent,
    BlankComponent,
  ]
})

export class PagesDemoModule {}
