import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api/user/user.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public checked: number;

  constructor( 
    private userService: UserService,
    public storage: Storage
  ) {}

  ngOnInit () {
    this.storage.create();
    this.storage.get("token").then(token=>{
      this.userService.getUserByToken(token).subscribe(
        (response) => {
          this.checked = response["user"][response["user"]["id"]]["checked"];
        } 
      );
    });
  }


}
