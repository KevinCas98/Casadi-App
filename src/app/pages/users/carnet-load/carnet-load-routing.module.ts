import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarnetLoadPage } from './carnet-load.page';

const routes: Routes = [
  {
    path: '',
    component: CarnetLoadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarnetLoadPageRoutingModule {}
