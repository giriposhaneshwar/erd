import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';

export const ReportRoutes: Routes = [{
  path: '',
  children: [{
      path: '',
      component: ReportsComponent
  }]
}];

