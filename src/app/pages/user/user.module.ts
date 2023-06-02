import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { CreateComponent } from './component/create/create.component';
import { ListComponent } from './component/list/list.component';
import { EditComponent } from './component/edit/edit.component';
import { DeleteComponent } from './component/delete/delete.component';
import { HttpClientModule } from '@angular/common/http';


export const routes = [
  { path: 'list', component: ListComponent, pathMatch: 'full' },
  { path: 'create', component: CreateComponent, pathMatch: 'full' },
  { path: 'edit', component: EditComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    SharedModule
  ],
  declarations: [
    CreateComponent,
    ListComponent,
    EditComponent,
    DeleteComponent
  ]
})
export class UserModule { }
