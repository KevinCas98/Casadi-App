import { Component, OnInit } from '@angular/core';
import { StoresService, SearchType } from '../../services/api/stores.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  public id: number;
  results: Observable<any>;
  data: any[] = [];
  category: any[] = [];
  benefit: any[] = [];

  constructor(private storesService: StoresService, private actRoute: ActivatedRoute) { 
    this.id = this.actRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.data=[];
    this.category=[];
    this.benefit=[];
    this.getStoreById();
  }

  public getStoreById(){
    this.results = this.storesService.getStoreById(this.id);
    this.results.subscribe((response) => {
      this.data = response['stores'][this.id];
      this.category = response['stores'][this.id]["category"];
      this.benefit = response['stores'][this.id]["benefit"];
    });
  }

}
