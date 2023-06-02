import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public personalForm:FormGroup;

  constructor(private formBuilder: FormBuilder,
    public commonService: CommonService,
    public notificationService:NotificationService,
    public router:Router ) { }

  ngOnInit() {
    this.personalForm = this.formBuilder.group({
      'old_password': ['', Validators.required],
      'new_password': ['', Validators.required],
      'confirm_password': ['', Validators.required]
    });
  }

  public onSubmit(values:Object):void {
    if(this.personalForm.value.new_password !== this.personalForm.value.confirm_password){
      this.notificationService.showError('new password and confirm password mismatched!!','Change Password');
      return;
    }
      if (this.personalForm.valid) {
        this.commonService.changePassword(this.personalForm.value)
      .subscribe(
        data => {
            if(data['status']=== 200){
              this.notificationService.showSuccess('Password changed Successfully !!','Change Password');
              this.router.navigate(['/dashboard']);
            } else {
              this.notificationService.showError('Please check old password Or Somthing went Wrong!!','Change Password Failed');
              this.router.navigate(['/profile/change-password']);
            }
        },
        err => {
          console.log(err);
          this.notificationService.showWarning('Server Error !!','Server Failed');
        }
      );
      }
  }
  

}