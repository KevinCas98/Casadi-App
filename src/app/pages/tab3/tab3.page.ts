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
        name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        dni: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        password: ['', [Validators.minLength(8), Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
      })
    }

}
