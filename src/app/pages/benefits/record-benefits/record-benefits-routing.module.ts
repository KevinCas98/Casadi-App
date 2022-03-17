import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordBenefitsPage } from './record-benefits.page';

const routes: Routes = [
  {
    path: '',
    component: RecordBenefitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordBenefitsPageRoutingModule {}
