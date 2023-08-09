import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { FormbuilderService } from './shared/formbuilder.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private _router: Subscription;

  constructor(private router: Router, private bnIdle: BnNgIdleService, private formService:FormbuilderService, private _dialog: MatDialog){
  }

    ngOnInit() {

      //60 = 1 minute

      this.bnIdle.startWatching(300).subscribe((res) => {
            if (res) {      
              console.log('session expired');
              localStorage.removeItem('token');
              this.router.navigate(['/home']);
              let formData= JSON.parse(localStorage.getItem('formDesignInfo') || '{}');
              this.formService.unlockForm(formData.formID,formData);
              // this.router.navigateByUrl('logout');
              this._dialog.closeAll();
            }
          });

      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe( {
        next: () => {
        const body = document.getElementsByTagName('body')[0];
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (body.classList.contains('modal-open')) {
          body.classList.remove('modal-open');
          modalBackdrop.remove();
        }}
      });
    }
}
