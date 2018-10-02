
import { Routes } from '@angular/router';
import { MwqDataQcComponent } from './mwq-data-qc.component';

export const MwqDataQcRoutes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: MwqDataQcComponent
  }]
}];
