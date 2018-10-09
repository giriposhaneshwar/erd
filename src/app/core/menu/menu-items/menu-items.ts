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
  children?: ChildrenItems[];
}

const MENUITEMS: Menu[] = [
  {
    state: 'buoysdashboard',
    name: 'BUOYS',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'alerts',
    name: 'ALERT',
    type: 'link',
    icon: 'battery_alert'
  },
  {
    state: 'incidents',
    name: 'INCIDENTS',
    type: 'sub',
    icon: 'bug_report',
    children: [
      {state: 'buoys-incidents', name: 'BUOYS_INCIDENT'},
      {state: 'blooms-incidents', name: 'BLOOMS_INCIDENT'},
     
    ]
  },

  /*{
    state: 'manageBuoys',
    name: 'MANAGEBUOYS',
    type: 'link',
    icon: 'data_usage'
  },{
    state: 'manageMwqData',
    name: 'MANAGEMWQDATA',
    type: 'link',
    icon: 'people'
  },*/
  {
    state: 'manageMwqData',
    name: 'MANAGEMWQDATA',
    type: 'sub',
    icon: 'data_usage',
    children: [
      {state: 'configure-buoys', name: 'CONFIGURE_BUOYS'},
      {state: 'configure-parameters', name: 'CONFIGURE_PARAMETERS'},
      {state: 'configure-categories', name: 'CONFIGURE_CATEGORIES'},
      {state: 'manage-stations', name: 'MANAGE_STATIONS'},
      {state: 'manage-sites', name: 'MANAGE_SITES'},
      {state: 'manage-vendor-details', name: 'MANAGE_VENDOR_DETAILS'},
      {state: 'manage-lims-services', name: 'MANAGE_LIMS_SERVICES'},
    ]
  },
  /*{
    state: 'downloadData',
    name: 'DOWNLOADDATA',
    type: 'link',
    icon: 'cloud_download'
  },*/
  {
    state: 'downloadData',
    name: 'DOWNLOADDATA',
    type: 'sub',
    icon: 'cloud_download',
    children: [
      {state: 'download-mwq-data', name: 'DOWNLOAD_MWQ_DATA'},
      {state: 'download-buoys-data', name: 'DOWNLOAD_BUOYS_DATA'},
      {state: 'download-mwq-indicies-data', name: 'DOWNLOAD_MWQ_INDICIES_DATA'},
    ]
  },
  {
    state: 'reports',
    name: 'REPORTS',
    type: 'link',
    icon: 'report'
  },
  {
    state: 'mwqDataEntry',
    name: 'MWQDATAENTRY',
    type: 'link',
    icon: 'perm_data_setting'
  },
  {
    state: 'mwqDataQc',
    name: 'MWQDATAQC',
    type: 'link',
    icon: 'high_quality'
  },
  {
    state: 'analytics',
    name: 'ANALYTICS',
    type: 'link',
    icon: 'import_export'
  },

  /*{
    state: 'dashboard',
    name: 'HOME',
    type: 'link',
    icon: 'home'
  },
  {
    state: 'emails',
    name: 'Emails',
    type: 'link',
    icon: 'mail'
  },
  {
    state: 'chat',
    name: 'CHAT',
    type: 'link',
    icon: 'chat_bubble_outline'
  },
  {
    state: 'features',
    name: 'FEATURES',
    type: 'sub',
    icon: 'library_books',
    children: [
      {state: 'colorpicker', name: 'COLOR PICKER'},
      {state: 'cropper', name: 'CROPPER'},
      {state: 'dragula', name: 'DRAGULA'},
      {state: 'sortable', name: 'SORTABLE'}
    ]
  },
  {
    state: 'components',
    name: 'COMPONENTS',
    type: 'sub',
    icon: 'local_activity',
    children: [
      {state: 'accordion', name: 'ACCORDION'},
      {state: 'alerts', name: 'ALERTS'},
      {state: 'buttons', name: 'BUTTONS'},
      {state: 'carousel', name: 'CAROUSEL'},
      {state: 'collapse', name: 'COLLAPSE'},
      {state: 'datepicker', name: 'DATEPICKER'},
      {state: 'dropdown', name: 'DROPDOWN'},
      {state: 'modal', name: 'MODAL'},
      {state: 'pagination', name: 'PAGINATION'},
      {state: 'popover', name: 'POPOVER'},
      {state: 'progressbar', name: 'PROGRESS BAR'},
      {state: 'rating', name: 'RATING'},
      {state: 'tabs', name: 'TABS'},
      {state: 'timepicker', name: 'TIMEPICKER'},
    ]
  },
  {
    state: 'icons',
    name: 'ICONS',
    type: 'sub',
    icon: 'center_focus_weak',
    children: [
      {state: 'linea', name: 'LINEA'},
      {state: 'font-awesome', name: 'FONT AWESOME'},
      {state: 'simple-line-icons', name: 'SIMPLE LINE ICONS'},
      {state: 'material-icons', name: 'MATERIAL ICONS'},
    ]
  },
  {
    state: 'cards',
    name: 'CARDS',
    type: 'sub',
    icon: 'grid_on',
    children: [
      {state: 'basic-cards', name: 'BASIC CARDS'},
      {state: 'advance-cards', name: 'ADVANCE CARDS'}
    ]
  },
  {
    state: 'forms',
    name: 'FORMS',
    type: 'sub',
    icon: 'format_align_justify',
    children: [
      {state: 'form-wizard', name: 'FORM CONTROLS'},
      {state: 'form-validation', name: 'FORM VALIDATION'},
      {state: 'form-upload', name: 'UPLOAD'},
      {state: 'form-tree', name: 'TREE'}
    ]
  },
  {
    state: 'tables',
    name: 'TABLES',
    type: 'sub',
    icon: 'grid_on',
    children: [
      {state: 'basic-tables', name: 'BASIC TABLES'},
      {state: 'responsive-tables', name: 'RESPONSIVE TABLES'}
    ]
  },
  {
    state: 'data-tables',
    name: 'DATA TABLES',
    type: 'sub',
    icon: 'format_line_spacing',
    children: [
      {state: 'selection', name: 'SELECTION'},
      {state: 'pinning', name: 'PINNING'},
      {state: 'sorting', name: 'SORTING'},
      {state: 'paging', name: 'PAGING'},
      {state: 'editing', name: 'EDITING'},
      {state: 'filter', name: 'FILTER'}
    ]
  },
  {
    state: 'chart',
    name: 'CHARTS',
    type: 'sub',
    icon: 'insert_chart',
    children: [
      {state: 'bar-charts', name: 'BAR'},
      {state: 'pie-charts', name: 'PIE'},
      {state: 'line-charts', name: 'LINE'},
      {state: 'mixed-charts', name: 'MIXED'},
      {state: 'ng2-charts', name: 'NG2 CHARTS'},
    ]
  },
    {
    state: 'maps',
    name: 'MAPS',
    type: 'sub',
    icon: 'map',
    children: [
      {state: 'googlemap', name: 'GOOGLE MAP'},
      {state: 'leafletmap', name: 'LEAFLET MAP'}
    ]
  },
    {
    state: 'pages',
    name: 'PAGES',
    type: 'sub',
    icon: 'web',
    children: [
      {state: 'about', name: 'ABOUT'},
      {state: 'contact', name: 'CONTACT'},
      {state: 'timeline', name: 'TIMELINE'},
      {state: 'pricing', name: 'PRICING'},
      {state: 'blank', name: 'BLANK'},
    ]
  },
  {
    state: 'user-pages',
    name: 'USERS',
    type: 'sub',
    icon: 'person',
    children: [
      {state: 'userlist', name: 'USER LIST'},
      {state: 'userprofile', name: 'USER PROFILE'},
    ]
  },
  {
    state: 'authentication',
    name: 'AUTHENTICATION',
    type: 'sub',
    icon: 'security',
    children: [
      {state: 'login', name: 'LOGIN'},
      {state: 'register', name: 'REGISTER'},
      {state: 'forgot-password', name: 'FORGOT'},
      {state: 'lockscreen', name: 'LOCKSCREEN'}
    ]
  },
  {
    state: 'error',
    name: 'ERROR',
    type: 'sub',
    icon: 'error_outline',
    children: [
      {state: '404', name: '404'},
      {state: '503', name: '503'}
    ]
  },
  {
    state: 'calendar',
    name: 'CALENDAR',
    type: 'link',
    icon: 'date_range'
  },
  

  {
    state: 'media',
    name: 'MEDIA',
    type: 'sub',
    icon: 'perm_media',
    children: [
      {state: 'grid', name: 'GRID'},
      {state: 'list', name: 'LIST'}
    ]
  },
  {
    state: 'editor',
    name: 'EDITOR',
    type: 'sub',
    icon: 'format_shapes',
    children: [
      {state: 'ace-editor', name: 'ACE EDITOR'},
      {state: 'ckeditor', name: 'CKEDITOR'},
      {state: 'wysiwyg', name: 'WYSIWYG EDITOR'}
    ]
  }*/

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
