import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarnetLoadPageRoutingModule } from './carnet-load-routing.module';

import { CarnetLoadPage } from './carnet-load.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarnetLoadPageRoutingModule
  ],
  declarations: [CarnetLoadPage]
})
export class CarnetLoadPageModule {}
