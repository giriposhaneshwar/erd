import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadDataComponent } from './download-data.component';

const routes: Routes = [];

export const DownloadDataRoutes: Routes = [{
  path: '',
  children: [{
      path: '',
      component: DownloadDataComponent
  }]
}];

