import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadMwqDataComponent } from './download-mwq-data/download-mwq-data.component';
import { DownloadBuoysDataComponent } from './download-buoys-data/download-buoys-data.component';
import { DownloadMwqIndiciesDataComponent } from './download-mwq-indicies-data/download-mwq-indicies-data.component';

const routes: Routes = [];

export const DownloadDataRoutes: Routes = [{
  path: '',
  redirectTo: 'download-mwq-data',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'download-mwq-data',
    component: DownloadMwqDataComponent
  }, {
    path: 'download-buoys-data',
    component: DownloadBuoysDataComponent
  }, {
    path: 'download-mwq-indicies-data',
    component: DownloadMwqIndiciesDataComponent
  }]
}];