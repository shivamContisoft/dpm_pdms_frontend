import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { CommonService } from 'src/app/shared/common.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  public form:FormGroup;
  public settings: Settings;
  constructor(
    public appSettings:AppSettings,
     public commonService: CommonService,
     public notificationService:NotificationService, 
     public fb: FormBuilder,
      public router:Router){
    this.settings = this.appSettings.settings; 
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required])],
    });
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      this.commonService.resetPassword(this.form.value)
      .subscribe(
        data => {
            if(data['status']=== 200){
              this.notificationService.showSuccess('Password Reset Successfully !!','Login');
              this.router.navigate(['/login']);
            } else {
              this.notificationService.showError('Invalid Email !!','Login Failed');
              this.router.navigate(['/']);
            }
        },
        err => {
          console.log(err);
          this.notificationService.showWarning('Server Error !!','Server Failed');
        }
      );
    } else 
    {
      this.router.navigate(['/']);
    }
    
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
  }

}