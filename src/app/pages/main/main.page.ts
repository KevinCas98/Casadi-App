import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/api/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public checked: number;


  constructor(private route: Router,  public storage: Storage,  private userService: UserService,) { 
    this.storage.create();
    this.storage.get("token").then(token=>{
      if(token){
        this.userService.getUserByToken(token).subscribe(
          (response) => {
            this.checked = response["user"][response["user"]["id"]]["checked"];
            if(this.checked == 0){
              this.route.navigate([encodeURI("tabs/profile")]);
            }else{
              this.route.navigate([encodeURI("/tabs/home")]);
            }
          } 
        );
      }else{
        this.route.navigate([encodeURI("/home")]);
      }
    });
  }

  ngOnInit() {
  }

}
