import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakePageRoutingModule } from './take-routing.module';

import { TakePage } from './take.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TakePageRoutingModule
  ],
  declarations: [TakePage]
})
export class TakePageModule {}
