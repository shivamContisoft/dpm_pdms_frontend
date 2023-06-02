import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const routes = [
  {
      path: '', 
      component: ProfileComponent,
      children:[
        { path: '', redirectTo: 'projects', pathMatch: 'full'},
        { path: 'projects', component: ProjectsComponent, data: { breadcrumb: 'Projects' } },
        { path: 'user-info', component: UserInfoComponent, data: { breadcrumb: 'User Information' } },
        { path: 'change-password', component: ChangePasswordComponent, data: { breadcrumb: 'Change Password' } }
      ]
  }
];

@NgModule({
  declarations: [
    ProfileComponent, 
    ProjectsComponent, 
    UserInfoComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
