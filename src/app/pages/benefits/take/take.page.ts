import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BenefitsService } from '../../../services/api/benefits/benefits.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-take',
  templateUrl: './take.page.html',
  styleUrls: ['./take.page.scss'],
})
export class TakePage implements OnInit {

  private benefitData : FormGroup;
  isSubmitted = false;
  public store: number;
  public benefits: number;
  public msj: boolean;
  public msjText: string;

  constructor(private route: Router, public formBuilder: FormBuilder, private actRoute: ActivatedRoute, private benefitsService: BenefitsService) {
    this.store = this.actRoute.snapshot.params.store;
    this.benefits = this.actRoute.snapshot.params.benefit;
    this.msj = false;
    this.msjText = "";
   }

  ngOnInit() {
    this.benefitData = this.formBuilder.group({
      pin: ['', [Validators.required]]
    })
  }

  get errorControl() {
    return this.benefitData.controls;
  }
  
  public sendBenefitTake(){
      this.isSubmitted = true;
      if (!this.benefitData.valid) {
        console.log('Please provide all the required values!')
        return false;
      } else {
        var formData: any = new FormData();
        formData.append("id_store", this.store);
        formData.append("id_benefit", this.benefits);
        formData.append("pin", this.benefitData.get("pin").value);
        formData.append("token", "a238dacde7");
        this.benefitsService.setRecordBenefits(formData).subscribe(
          (response) => {
            if(response["success"]){
              this.route.navigate([encodeURI("record-benefits")]);
            }else{
              this.msj = true;
              this.msjText = response["msj"];
            }
          }
        );
      }
  }

}
