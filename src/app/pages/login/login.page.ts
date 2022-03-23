import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/api/user/user.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginData : FormGroup;
  isSubmitted = false;
  private data: any[] = [];
  public msj: boolean;
  public msjText: string;

  constructor(private route: Router, 
    public formBuilder: FormBuilder,
    private userService: UserService,
    public storage: Storage) { }

  ngOnInit() {
    this.msj = false;
    this.msjText = "";
    this.loginData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.minLength(8), Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    })
  }

  get errorControl() {
    return this.loginData.controls;
  }

  public loginForm() {
    this.isSubmitted = true;
    if (!this.loginData.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      var formData: any = new FormData();
        formData.append("user_name", this.loginData.get("email").value);
        formData.append("password", this.loginData.get("password").value);
        this.userService.loginUser(formData).subscribe(
          (response) => {
            if(response["success"]){
              this.data = response["user"][response["user"]["id"]];
              this.storage.create();
              this.storage.set("id", this.data["id"]);
              this.storage.set("token", this.data["token"]);
              this.storage.set("name", this.data["name"]);
              this.storage.set("lastName", this.data["lastName"]);
              this.storage.set("checked", this.data["checked"]);
              this.storage.set("register", true);
              if(this.data["checked"]==0){
                this.route.navigate([encodeURI("tabs/profile")]);
              }else{
                this.route.navigate([encodeURI("/tabs/home")]);
              }
            }else{
              this.msj = true;
              this.msjText = response["msj"];
            }
          }
        );
    }
  }

}
