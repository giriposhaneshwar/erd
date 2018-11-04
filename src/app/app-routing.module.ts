import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AuthLayoutComponent } from './auth/auth-layout.component';


export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'buoysdashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'buoysdashboard',
        loadChildren: './buoysdashboard/buoysdashboard.module#BuoysdashboardModule'
      },
      {
        path: 'alerts',
        loadChildren: './alerts/alerts.module#AlertsModule'
      },
      {
        path: 'incidents',
        loadChildren: './incidents/incidents.module#IncidentsModule'
      },
      {
        path: 'manageMwqData',
        loadChildren: './managemwqdata/managemwqdata.module#ManagemwqdataModule'
      },
      {
        path: 'downloadData',
        loadChildren: './download-data/download-data.module#DownloadDataModule'
      },
      {
        path: 'reports',
        loadChildren: './reports/reports.module#ReportsModule'
      },
      {
        path: 'mwqDataEntry',
        loadChildren: './mwq-data-entry/mwq-data-entry.module#MwqDataEntryModule'
      },
      {
        path: 'mwqDataQc',
        // loadChildren: './mwq-data-qc/mwq-data-qc.module#MwqDataQcModule'
        loadChildren: './mwq-data-entry/mwq-data-entry.module#MwqDataEntryModule'
      },
      {
        path: 'analytics',
        loadChildren: './analytics/analytics.module#AnalyticsModule'
      },


      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }, {
        path: 'emails',
        loadChildren: './emails/emails.module#EmailsModule'
      }, {
        path: 'chat',
        loadChildren: './chat/chat.module#ChatModule'
      }, {
        path: 'features',
        loadChildren: './features/features.module#FeaturesModule'
      }, {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
      }, {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule'
      }, {
        path: 'cards',
        loadChildren: './cards/cards.module#CardsModule'
      }, {
        path: 'forms',
        loadChildren: './forms/forms.module#FormsDemoModule'
      }, {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesDemoModule'
      }, {
        path: 'data-tables',
        loadChildren: './data-tables/datatables.module#DataTablesDemoModule'
      }, {
        path: 'chart',
        loadChildren: './chart/charts.module#ChartsDemoModule'
      }, {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsDemoModule'
      }, {
        path: 'pages',
        loadChildren: './custom-pages/pages.module#PagesDemoModule'
      }, {
        path: 'user-pages',
        loadChildren: './user-pages/users.module#UsersModule'
      }, {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarDemoModule'
      }, {
        path: 'media',
        loadChildren: './media/media.module#MediaModule'
      }, {
        path: 'editor',
        loadChildren: './editor/editor.module#EditorDemoModule'
      }]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'authentication',
      loadChildren: './session/session.module#SessionModule'
    }, {
      path: 'error',
      loadChildren: './error/error.module#ErrorModule'
    }]
  }];

