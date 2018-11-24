import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  subchildren?: SuperChildrenItems[];
}

export interface SuperChildrenItems {
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

const HORIZONTALMENUITEMS = [

  {
    state: 'dashboard',
    name: 'HOME',
    type: 'link',
    icon: 'home'
  },

  /** Newly Added */
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
      {state: 'incidents/buoys-incidents', name: 'BUOYS_INCIDENT'},
      {state: 'incidents/blooms-incidents', name: 'BLOOMS_INCIDENT'},
      /*{state: 'incidents/vendor-incidents', name: 'VENDOR_INCIDENT'},*/
    ]
  },
  /*{
    state: 'manageBuoys',
    name: 'MANAGEBUOYS',
    type: 'link',
    icon: 'data_usage'
  },
  {
    state: 'manageMwqData',
    name: 'MANAGEMWQDATA',
    type: 'link',
    icon: 'people'
  },*/
  {
    state: 'manageMwqData',
    name: 'MANAGEMWQDATA',
    type: 'sub',
    icon: 'bug_report',
    children: [
      /*{state: 'managemwqdata/configure-buoys', name: 'CONFIGURE_BUOYS'},*/
      {state: 'managemwqdata/configure-parameters', name: 'CONFIGURE_PARAMETERS'},
      {state: 'managemwqdata/configure-categories', name: 'CONFIGURE_CATEGORIES'},
      {state: 'managemwqdata/manage-stations', name: 'MANAGE_STATIONS'},
      {state: 'managemwqdata/manage-sites', name: 'MANAGE_SITES'},
      {state: 'managemwqdata/manage-vendor-details', name: 'MANAGE_VENDOR_DETAILS'},
      {state: 'managemwqdata/manage-lims-services', name: 'MANAGE_LIMS_SERVICES'},
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
      {state: 'download-data/download-mwq-data', name: 'DOWNLOAD_MWQ_DATA'},
      {state: 'download-data/download-buoys-data', name: 'DOWNLOAD_BUOYS_DATA'},
      {state: 'download-data/download-mwq-indicies-data', name: 'DOWNLOAD_MWQ_INDICIES_DATA'},
    ]
  },
  {
    state: 'reports',
    name: 'REPORTS',
    type: 'link',
    icon: 'report',
    children: [
      {state: 'reports/analytics', name: 'ANALYTICS'},
      {state: 'reports/compare-params', name: 'COMPARE_PARAMS'},
      {state: 'reports/sites-performance', name: 'SITES_PERFORMANCE'},
    ]
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
  /** Newly End */
  
  /*{
    state: 'features',
    name: 'FEATURES',
    type: 'sub',
    icon: 'library_books',
    children: [
      { state: 'features/colorpicker', name: 'COLOR PICKER' },
      { state: 'features/cropper', name: 'CROPPER' },
      { state: 'features/dragula', name: 'DRAGULA' },
      { state: 'features/sortable', name: 'SORTABLE' },
      {
        state: 'icons',
        name: 'ICONS',
        type: "super-sub",
        subchildren: [
          { state: 'icons/linea', name: 'LINEA' },
          { state: 'icons/font-awesome', name: 'FONT AWESOME' },
          { state: 'icons/simple-line-icons', name: 'SIMPLE LINE ICONS' },
          { state: 'icons/material-icons', name: 'MATERIAL ICONS' },
        ]
      },
      {
        state: 'editor',
        name: 'EDITOR',
        type: "super-sub",
        subchildren: [
          { state: 'editor/ace-editor', name: 'ACE EDITOR' },
          { state: 'editor/ckeditor', name: 'CKEDITOR' },
          { state: 'editor/wysiwyg', name: 'WYSIWYG EDITOR' }
        ]
      }
    ]
  },
  {
    state: 'components',
    name: 'COMPONENTS',
    type: 'sub',
    icon: 'local_activity',
    children: [
      { state: 'components/accordion', name: 'ACCORDION' },
      { state: 'components/alerts', name: 'ALERTS' },
      { state: 'components/buttons', name: 'BUTTONS' },
      { state: 'components/carousel', name: 'CAROUSEL' },
      { state: 'components/collapse', name: 'COLLAPSE' },
      { state: 'components/datepicker', name: 'DATEPICKER' },
      { state: 'components/dropdown', name: 'DROPDOWN' },
      { state: 'components/modal', name: 'MODAL' },
      { state: 'components/pagination', name: 'PAGINATION' },
      { state: 'components/popover', name: 'POPOVER' },
      { state: 'components/progressbar', name: 'PROGRESS BAR' },
      { state: 'components/rating', name: 'RATING' },
      { state: 'components/tabs', name: 'TABS' },
      { state: 'components/timepicker', name: 'TIMEPICKER' },
      {
        state: 'cards',
        name: 'CARDS',
        type: "super-sub",
        subchildren: [
          { state: 'cards/basic-cards', name: 'BASIC CARDS' },
          { state: 'cards/advance-cards', name: 'ADVANCE CARDS' }
        ]
      }

    ]
  },
  {
    state: 'forms',
    name: 'FORMS',
    type: 'sub',
    icon: 'format_align_justify',
    children: [
      { state: 'forms/form-wizard', name: 'FORM CONTROLS' },
      { state: 'forms/form-validation', name: 'FORM VALIDATION' },
      { state: 'forms/form-upload', name: 'UPLOAD' },
      { state: 'forms/form-tree', name: 'TREE' }
    ]
  },
  {
    state: 'tables',
    name: 'TABLES',
    type: 'sub',
    icon: 'grid_on',
    children: [
      { state: 'tables/basic-tables', name: 'BASIC TABLES' },
      { state: 'tables/responsive-tables', name: 'RESPONSIVE TABLES' },
      {
        state: 'data-tables',
        name: 'DATA TABLES',
        type: "super-sub",
        subchildren: [
          { state: 'data-tables/selection', name: 'SELECTION' },
          { state: 'data-tables/pinning', name: 'PINNING' },
          { state: 'data-tables/sorting', name: 'SORTING' },
          { state: 'data-tables/paging', name: 'PAGING' },
          { state: 'data-tables/editing', name: 'EDITING' },
          { state: 'data-tables/filter', name: 'FILTER' }
        ]
      }
    ]
  },
  {
    state: 'chart',
    name: 'CHARTS',
    type: 'sub',
    icon: 'insert_chart',
    children: [
      { state: 'chart/bar-charts', name: 'BAR' },
      { state: 'chart/pie-charts', name: 'PIE' },
      { state: 'chart/line-charts', name: 'LINE' },
      { state: 'chart/mixed-charts', name: 'MIXED' },
      { state: 'chart/ng2-charts', name: 'NG2 CHARTS' },
    ]
  },
  {
    state: 'maps',
    name: 'MAPS',
    type: 'sub',
    icon: 'map',
    children: [
      { state: 'maps/googlemap', name: 'GOOGLE MAP' },
      { state: 'maps/leafletmap', name: 'LEAFLET MAP' }
    ]
  },
  {
    state: 'pages',
    name: 'PAGES',
    type: 'sub',
    icon: 'web',
    children: [
      { state: 'emails', name: 'Emails' },
      { state: 'chat', name: 'CHAT' },
      { state: 'calendar', name: 'CALENDAR' },

      { state: 'pages/about', name: 'ABOUT' },
      { state: 'pages/contact', name: 'CONTACT' },
      { state: 'pages/timeline', name: 'TIMELINE' },
      { state: 'pages/pricing', name: 'PRICING' },
      { state: 'pages/blank', name: 'BLANK' },
      {
        state: 'user-pages',
        name: 'USERS',
        type: "super-sub",
        subchildren: [
          { state: 'user-pages/userlist', name: 'USER LIST' },
          { state: 'user-pages/userprofile', name: 'USER PROFILE' }
        ]
      },
      {
        state: 'media',
        name: 'MEDIA',
        type: "super-sub",
        subchildren: [
          { state: 'media/grid', name: 'GRID' },
          { state: 'media/list', name: 'LIST' }
        ]
      }
    ]
  },
  {
    state: 'authentication',
    name: 'AUTHENTICATION',
    type: 'sub',
    icon: 'security',
    children: [
      { state: 'authentication/login', name: 'LOGIN' },
      { state: 'authentication/register', name: 'REGISTER' },
      { state: 'authentication/forgot-password', name: 'FORGOT' },
      { state: 'authentication/lockscreen', name: 'LOCKSCREEN' },
      {
        state: 'error',
        name: 'ERROR',
        type: "super-sub",
        subchildren: [
          { state: 'error/404', name: '404' },
          { state: 'error/503', name: '503' }
        ]
      }
    ]
  }*/

];

@Injectable()
export class HorizontalMenuItems {
  getAll(): Menu[] {
    return HORIZONTALMENUITEMS;
  }
  // add(menu: Menu) {
  //   HORIZONTALMENUITEMS.push(menu);
  // }
}
