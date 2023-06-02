import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BounceComponent } from './bounce/bounce.component';
import { DeliveryComponent } from './delivery/delivery.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'delivery'
  },
  {
    path: 'delivery',
    component: DeliveryComponent
  },
  {
    path: 'bounce',
    component: BounceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
