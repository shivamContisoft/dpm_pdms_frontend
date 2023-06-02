import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public form:FormGroup;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public fb: FormBuilder, public router:Router){
    this.settings = this.appSettings.settings; 
    this.form = this.fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [null, Validators.compose([Validators.required])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    });
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
  }
}