import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../../services/api/stores/stores.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from '../../../services/api/user/user.service';
import { GlobalCommon } from '../../../commons/global/global.commons';


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
  public checked: number;
  public urlWeb: string;
  
  constructor(private storesService: StoresService, private actRoute: ActivatedRoute, private route: Router, private userService: UserService,
    public storage: Storage, private globalCommon: GlobalCommon,) { 
    this.id = this.actRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.data=[];
    this.category=[];
    this.benefit=[];
    this.urlWeb = this.globalCommon.getBaseWebUrl();
    this.getStoreById();
    this.storage.create();
    this.storage.get("token").then(token=>{
      this.userService.getUserByToken(token).subscribe(
        (response) => {
          this.checked = response["user"][response["user"]["id"]]["checked"];
        } 
      );
    });
  }

  public getStoreById(){
    this.results = this.storesService.getStoreById(this.id);
    this.results.subscribe((response) => {
      this.data = response['stores'][this.id];
      this.category = response['stores'][this.id]["category"];
      this.benefit = response['stores'][this.id]["benefit"];
    });
  }

  public goToTakeBenefits(idStore, idBenefits){
    this.route.navigate([encodeURI('/benefits-take/'+idStore+'/'+idBenefits)]);
  }



}
