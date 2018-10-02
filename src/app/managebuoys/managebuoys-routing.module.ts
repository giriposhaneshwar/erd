import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagebuoysComponent } from './managebuoys.component';

export const ManageBuoysRoutes: Routes = [{
  path: '',
  children: [{
      path: '',
      component: ManagebuoysComponent
  }]
}];
