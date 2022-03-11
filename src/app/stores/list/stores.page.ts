import { Component, OnInit } from '@angular/core';
import { StoresService, SearchType } from '../../services/api/stores.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {

  results: Observable<any>;
  data: any[] = [];

  constructor(private storesService: StoresService) {
   }

  ngOnInit() {
    this.data = [];
    this.listStores();
  }

  listStores(){
    this.results = this.storesService.getListStores();  
    this.results.subscribe((response) => {
      this.data = response;
    });
  }

}
