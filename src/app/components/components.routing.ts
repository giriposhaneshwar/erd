import { Routes } from '@angular/router';

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

export const ComponentsRoutes: Routes = [{
  path: '',
  redirectTo: 'accordion',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'accordion',
    component: AccordionComponent
  },{
    path: 'alerts',
    component: AlertComponent
  },{
    path: 'buttons',
    component: ButtonComponent
  },{
    path: 'carousel',
    component: CarouselComponent
  },{
    path: 'collapse',
    component: CollapseComponent
  },{
    path: 'datepicker',
    component: DatepickerComponent
  },{
    path: 'dropdown',
    component: DropdownComponent
  },{
    path: 'modal',
    component: ModalComponent
  },{
    path: 'pagination',
    component: PaginationComponent
  },{
    path: 'popover',
    component: PopoverComponent
  },{
    path: 'progressbar',
    component: ProgressBarComponent
  },{
    path: 'rating',
    component: RatingComponent
  },{
    path: 'tabs',
    component: TabsComponent
  },{
    path: 'timepicker',
    component: TimepickerComponent
  },{
    path: 'typeahead',
    component: TypeaheadComponent
  }]
}];
