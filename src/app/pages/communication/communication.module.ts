import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { ListComponent } from './component/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './component/create/create.component';

export const routes = [
  { path: 'list', component: ListComponent, pathMatch: 'full' },
  { path: 'create', component: CreateComponent, pathMatch: 'full' },
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
  ]
})
export class CommunicationModule { }
