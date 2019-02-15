import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  subLink: string;
  children?: ChildrenItems[];
}

const MENUITEMS: Menu[] = [
  {
    state: 'buoysdashboard',
    name: 'BUOYS',
    type: 'link',
    icon: 'dashboard',
    subLink: ''
  },
  {
    state: 'mwqDataEntry',
    name: 'MWQDATAENTRY',
    type: 'link',
    icon: 'perm_data_setting',
    subLink: 'data-entry'
  },
  {
    state: 'mwqDataQc',
    name: 'MWQDATAQC',
    type: 'link',
    icon: 'high_quality',
    subLink: 'qc-info'
  },
  {
    state: 'alerts',
    name: 'ALERT',
    type: 'link',
    icon: 'battery_alert',
    subLink: ''
  },
  {
    state: 'incidents',
    name: 'INCIDENTS',
    type: 'sub',
    icon: 'bug_report',
    subLink: '',
    children: [
      {state: 'buoys-incidents', name: 'BUOYS_INCIDENT'},
      {state: 'blooms-incidents', name: 'BLOOMS_INCIDENT'},
    /*   {state: 'algol-bloom', name: 'ALGOL_BLOOM_INCIDENT'}, */
    ]
  },
  {
    state: 'reports',
    name: 'REPORTS',
    type: 'sub',
    icon: 'report',
    subLink: '',
    children: [
      {state: 'analytics', name: 'ANALYTICS'},
      {state: 'compare-params', name: 'COMPARE_PARAMS'},
      {state: 'sites-performance', name: 'SITES_PERFORMANCE'},
    ]
  },
  {
    state: 'downloadData',
    name: 'DOWNLOADDATA',
    type: 'sub',
    icon: 'cloud_download',
    subLink: '',
    children: [
      {state: 'download-mwq-data', name: 'DOWNLOAD_MWQ_DATA'},
      {state: 'download-buoys-data', name: 'DOWNLOAD_BUOYS_DATA'},
      {state: 'download-mwq-indicies-data', name: 'DOWNLOAD_MWQ_INDICIES_DATA'},
    ]
  },
  {
    state: 'manageMwqData',
    name: 'MANAGEMWQDATA',
    type: 'sub',
    icon: 'data_usage',
    subLink: '',
    children: [
   /*   {state: 'configure-buoys', name: 'CONFIGURE_BUOYS'}, */
      {state: 'configure-parameters', name: 'CONFIGURE_PARAMETERS'},
      {state: 'configure-categories', name: 'CONFIGURE_CATEGORIES'},
      {state: 'manage-stations', name: 'MANAGE_STATIONS'},
      {state: 'manage-sites', name: 'MANAGE_SITES'},
      {state: 'manage-vendor-details', name: 'MANAGE_VENDOR_DETAILS'},
      {state: 'manage-lims-services', name: 'MANAGE_LIMS_SERVICES'},
    ]
  },
/*   {
    state: 'error',
    name: 'ERROR',
    type: "super-sub",
    subchildren: [
      { state: 'error/404', name: '404' },
      { state: 'error/503', name: '503' }
    ]
  } */


];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
