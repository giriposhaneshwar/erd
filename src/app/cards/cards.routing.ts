import { Routes } from '@angular/router';

import { BasicCardsComponent}  from './basic/basic-cards.component';
import { AdvanceCardsComponent}  from './advance/advance-cards.component';

export const CardsRoutes: Routes = [{
  path: '',
  redirectTo: 'basic-cards',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'basic-cards',
    component: BasicCardsComponent
  }, {
    path: 'advance-cards',
    component: AdvanceCardsComponent
  }]
}];
