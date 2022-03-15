import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../../services/api/stores.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {

  results: Observable<any>;
  data: any[] = [];

  constructor(private storesService: StoresService, private route: Router) {
   }

  ngOnInit() {
    this.data = [];
    this.listStores();
  }

  public listStores(){
    this.results = this.storesService.getListStores();  
    this.results.subscribe((response) => {
      this.data = response;
    });
  }

  public goToStoreById(id: number){
    console.log(id)
    this.route.navigate([encodeURI('/stores-view/'+id)]);
  }

}
