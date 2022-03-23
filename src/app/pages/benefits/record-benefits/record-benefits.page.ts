import { Component, OnInit } from '@angular/core';
import { BenefitsService } from '../../../services/api/benefits/benefits.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-benefits',
  templateUrl: './record-benefits.page.html',
  styleUrls: ['./record-benefits.page.scss'],
})
export class RecordBenefitsPage implements OnInit {

  results: Observable<any>;
  data: any[] = [];

  constructor(private route: Router, private benefitsService: BenefitsService) { }

  ngOnInit() {
    this.data = [];
    this.listBenefits();
  }

  private listBenefits(){
    this.results = this.benefitsService.getListBenefitsByUser(3);  
    this.results.subscribe((response) => {
      this.data = response;
    });
  }

}
