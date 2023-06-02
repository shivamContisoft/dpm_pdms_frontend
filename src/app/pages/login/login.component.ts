import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { CommonService } from 'src/app/shared/common.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public form:FormGroup;
  isResetPassword: boolean = false;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public commonService: CommonService,public notificationService:NotificationService, public fb: FormBuilder, public router:Router){
    this.settings = this.appSettings.settings; 
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])] 
    });
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      this.commonService.userLogin(this.form.value)
      .subscribe(
        data => {
            if(data['status']=== 200){
              window.localStorage.setItem('pdms_email', this.form.controls.email.value);
              this.notificationService.showSuccess('Login success !!','Login');
              if (this.form.controls.email.value == 'dinesh.m@dpmprinters.com') {
                this.router.navigate(['/dashboard']);
              } else {
                this.router.navigate(['/uploadpdf/list']);
              }
              
            } else {
              this.notificationService.showError('Invalid Credentials !!','Login Failed');
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

  resetPassword(){
    this.isResetPassword = true;
  }
}