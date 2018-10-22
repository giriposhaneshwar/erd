import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { HttpModule, Http } from "@angular/http";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
// import { TourNgBootstrapModule } from 'ngx-tour-ng-bootstrap';

import { DemoMaterialModule } from "./material-demo.module";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateService } from "@ngx-translate/core";
import "hammerjs";

import { SilkAppComponent } from "./app.component";
import { AppRoutes } from "./app-routing.module";
import { MainComponent } from "./main/main.component";
import { AuthLayoutComponent } from "./auth/auth-layout.component";
import { MenuToggleModule } from "./core/menu/menu-toggle.module";
import { MenuItems } from "./core/menu/menu-items/menu-items";
import { HorizontalMenuItems } from "./core/menu/menu-items/horizontal-menu-items";
import { PageTitleService } from "./core/page-title/page-title.service";
import { Config } from "./appConfiguration/config";
import { HistoricalGraphDirective } from "./partials/historical-graph.directive";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DemoMaterialModule,
    RouterModule.forRoot(AppRoutes),
    PerfectScrollbarModule,
    MenuToggleModule,
    HttpModule,
    HttpClientModule,
       
    // TourNgBootstrapModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    SilkAppComponent,
    MainComponent,
    AuthLayoutComponent,
    
  ],
  bootstrap: [SilkAppComponent],
  providers: [
    MenuItems,
    HorizontalMenuItems,
    TranslateService,
    Config,
    PageTitleService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports:[
    
  ]
})
export class SilkAppModule {}
