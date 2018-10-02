import { Routes } from '@angular/router';
import { BuoysdashboardComponent } from './buoysdashboard.component';

export const BuoysDashboardRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: BuoysdashboardComponent
    }]
}];
