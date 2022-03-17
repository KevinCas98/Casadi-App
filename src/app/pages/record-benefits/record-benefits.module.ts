import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordBenefitsPageRoutingModule } from './record-benefits-routing.module';

import { RecordBenefitsPage } from './record-benefits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordBenefitsPageRoutingModule
  ],
  declarations: [RecordBenefitsPage]
})
export class RecordBenefitsPageModule {}
