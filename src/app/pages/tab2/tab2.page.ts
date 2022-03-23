import { Component } from '@angular/core';
import { StoresService } from '../../services/api/stores/stores.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
 
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
    this.route.navigate([encodeURI('/stores-view/'+id)]);
  }

}
