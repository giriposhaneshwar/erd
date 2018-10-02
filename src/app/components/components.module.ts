import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, AlertModule, ButtonsModule, CarouselModule, CollapseModule, DatepickerModule, BsDropdownModule, ModalModule, PaginationModule, PopoverModule, ProgressbarModule, RatingModule, TabsModule, TimepickerModule, TooltipModule, TypeaheadModule  } from 'ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from '../core/widgster/directives.module';

import { AccordionComponent }   from './accordion/accordion.component';
import { AlertComponent }   from './alert/alert.component';
import { ButtonComponent}  from './button/button.component';
import { CarouselComponent }  from './carousel/carousel.component';
import { CollapseComponent }  from './collapse/collapse.component';
import { DatepickerComponent}  from './date-picker/datepicker.component';
import { DropdownComponent }  from './dropdown/dropdown.component';
import { ModalComponent }  from './modal/modal.component';
import { PaginationComponent}  from './pagination/pagination.component';
import { PopoverComponent}  from './popover/popover.component';
import { ProgressBarComponent}  from './progress-bar/progress-bar.component';
import { RatingComponent }  from './rating/rating.component';
import { TabsComponent}  from './tabs/tabs.component';
import { TimepickerComponent }  from './timepicker/timepicker.component';
import { TypeaheadComponent}  from './typeahead/typeahead.component';

import { ComponentsRoutes } from './components.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    DirectivesModule,
    RouterModule.forChild(ComponentsRoutes)
  ],
  declarations: [ 
    AccordionComponent,
    AlertComponent,
    ButtonComponent,
    CarouselComponent,
    CollapseComponent,
    DatepickerComponent,
    DropdownComponent,
    ModalComponent,
    PaginationComponent,
    PopoverComponent,
    ProgressBarComponent,
    RatingComponent,
    TabsComponent,
    TimepickerComponent,
    TypeaheadComponent,
  ]
})

export class ComponentsModule {}
