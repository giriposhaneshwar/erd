import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MwqDataEntryComponent } from './mwq-data-entry.component';

export const MwqDataEntryRoutes: Routes = [{
  path: '',
  children: [{
      path: '',
      component: MwqDataEntryComponent
  }]
}];

