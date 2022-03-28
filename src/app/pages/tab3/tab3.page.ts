import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/api/user/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

  private userData : FormGroup;
  private data: any[] = [];
  isSubmitted = false;
  public msj: boolean;
  public msjText: string;

  constructor(private route: Router, 
    public formBuilder: FormBuilder,
    private userService: UserService,
    public storage: Storage) {}

    ngOnInit() {
      this.msj = false;
      this.msjText = "";
      this.storage.create();
      this.storage.get("token").then(token=>{
        this.userService.getUserByToken(token).subscribe(
          (response) => {
            this.data = response["user"];
          } 
        );
      });
      this.userData = this.formBuilder.group({
        sex: [''],
        dateOfBirth: ['', [Validators.required]],
        dni: ['', [Validators.required]],
        contact: ['', [Validators.required]],
        city: ['', [Validators.required]],
        province: ['', [Validators.required]],
        profileImg: ['']
      })
    }

    get errorControl() {
      return this.userData.controls;
    }
    
    async uploadFile(event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.userData.patchValue({
        profileImg: file
      });
      this.userData.get('profileImg').updateValueAndValidity()
    }

    private profileForm(){

    }

}
