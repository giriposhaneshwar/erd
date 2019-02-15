import {Component, Optional, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import { AppStorageService } from './appConfiguration/app-config.service';

@Component({
     selector: 'silk-app',
     template:'<router-outlet></router-outlet><ngx-spinner bdColor="rgba(51,51,51,0.8)"  size="medium" color="#fff" type="ball-scale-multiple"> <p style="font-size: 20px; color: white"></p></ngx-spinner>',
    encapsulation: ViewEncapsulation.None
})
export class SilkAppComponent {

   constructor( private router:Router, public translate: TranslateService, 
      public localStore: AppStorageService) {
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('en');

      const browserLang: string = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
      localStore.store.set("role", ["admin", "dept", "vendor"]);

      sessionStorage.setItem("firstName", "Raghuveer");
      sessionStorage.setItem("groups", "2");
      sessionStorage.setItem("isInternal","true");
      sessionStorage.setItem("lastName","Kalluri");
      sessionStorage.setItem("userId","349940");
      sessionStorage.setItem("username","raghuveer.kalluri"); 
   }

   /* These following methods used for theme preview, you can remove this methods */
    
   /* ngOnInit() { 

   } */


}
