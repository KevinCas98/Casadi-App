import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/api/user/user.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  private userData : FormGroup;
  isSubmitted = false;
  public msj: boolean;
  public msjText: string;

  constructor(private route: Router, 
    public formBuilder: FormBuilder,
    private userService: UserService,
    public storage: Storage) { }

  ngOnInit() {
    this.msj = false;
    this.msjText = "";
    this.userData = this.formBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.minLength(8), Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    })
  }

  get errorControl() {
    return this.userData.controls;
  }

  public registrationForm() {
    this.isSubmitted = true;
    if (!this.userData.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      var formData: any = new FormData();
        formData.append("name", this.userData.get("name").value);
        formData.append("last_name", this.userData.get("last_name").value);
        formData.append("dni", this.userData.get("dni").value);
        formData.append("email", this.userData.get("email").value);
        formData.append("password", this.userData.get("password").value);
        this.userService.registerUser(formData).subscribe(
          (response) => {
            if(response["success"]){
              this.storage.create();
              this.storage.set("register", true);
              this.route.navigate([encodeURI("login")]);
            }else{
              this.msj = true;
              this.msjText = response["msj"];
            }
          }
        );
    }
  }

}
