import { Component, OnInit } from '@angular/core';
import { BenefitsService } from '../../../services/api/benefits/benefits.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-benefits',
  templateUrl: './record-benefits.page.html',
  styleUrls: ['./record-benefits.page.scss'],
})
export class RecordBenefitsPage implements OnInit {

  results: Observable<any>;
  data: any[] = [];


  constructor(private route: Router, private benefitsService: BenefitsService, public storage: Storage) { }

  ngOnInit() {
    this.data = [];
    this.listBenefits();
  }

  private listBenefits(){
    this.storage.create();
    this.storage.get("id").then(id=>{
      this.results = this.benefitsService.getListBenefitsByUser(id);  
      this.results.subscribe((response) => {
        this.data = response;
      });
    });
  }


}
