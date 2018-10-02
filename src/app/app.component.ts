import {Component, Optional, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
     selector: 'silk-app',
     template:'<router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None
})
export class SilkAppComponent {

   constructor( private router:Router, public translate: TranslateService) {
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('en');

      const browserLang: string = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

   }

   /* These following methods used for theme preview, you can remove this methods */
    
   /* ngOnInit() { 

   } */


}
