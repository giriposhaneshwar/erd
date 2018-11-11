import { Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CompareParamsComponent } from './compare-params/compare-params.component';
import { SitesPerformanceComponent } from './sites-performance/sites-performance.component';

export const ReportRoutes: Routes = [{
  path: '',
  redirectTo: 'analytics',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'analytics',
    component: AnalyticsComponent
  }, {
    path: 'compare-params',
    component: CompareParamsComponent
  }, {
    path: 'sites-performance',
    component: SitesPerformanceComponent
  }]
}];
