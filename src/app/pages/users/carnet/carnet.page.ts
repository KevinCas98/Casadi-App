import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/api/user/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-carnet',
  templateUrl: './carnet.page.html',
  styleUrls: ['./carnet.page.scss'],
})
export class CarnetPage implements OnInit {

  public carnetState: number;
  public data: any[] = [];


  constructor(
    private userService: UserService,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.storage.create();
    this.storage.get("token").then(token=>{
      this.userService.getUserByToken(token).subscribe(
        (response) => {
          this.data = response["user"][response["user"]["id"]];
          this.carnetState = response["user"][response["user"]["id"]]["checked"];
        } 
      );
    });
  }
}
