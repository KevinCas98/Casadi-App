import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/api/user/user.service';
import { Storage } from '@ionic/storage';
import { GlobalCommon } from '../../../commons/global/global.commons';

@Component({
  selector: 'app-carnet-load',
  templateUrl: './carnet-load.page.html',
  styleUrls: ['./carnet-load.page.scss'],
})
export class CarnetLoadPage implements OnInit {

  public isShown1: boolean = false;
  public isShown2: boolean = true;
  public isShown3: boolean = true;
  public isShown4: boolean = true;
  public idButton: number = 2;
  public userData : FormGroup;
  public data: any[] = [];
  isSubmitted = false;
  public msj: boolean;
  public msjText: string;
  public success: number;
  public urlWeb: string;
  
  constructor(private route: Router, 
    public formBuilder: FormBuilder,
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private globalCommon: GlobalCommon,
    public storage: Storage) { }

  ngOnInit() {
    this.msj = false;
      this.msjText = "";
      this.urlWeb = this.globalCommon.getBaseWebUrl();
      this.actRoute.queryParams.subscribe(params => {
        if (params) {
          console.log(params)
          if(params["success"]){
            this.msj = true;
            this.msjText = "Los datos se actualizaron con éxito";
          }
        }
      });
      this.storage.create();
      this.userData = this.formBuilder.group({
        token: [''],
        dose_quantity: ['', [Validators.required]],
        type_Of_card: ['', [Validators.required]],
        imagen1: [''],
        imagen2: [''],
        imagen3: [''],
        imagen4: ['']
      });
      this.storage.get("token").then(token=>{
        this.userData.get("token").setValue(token);
      });
  }

  get errorControl() {
    return this.userData.controls;
  }

  async toggleDisplay(idButton:number) {
    switch (idButton) {
      case 2:
        this.isShown2 = false;
        this.idButton++;
        break;
      case 3:
        this.isShown3 = false;
        this.idButton++;
        break;
      case 4:
        this.isShown4 = false;
        this.idButton++;
        break;
    }
    
  }

  async uploadFile1(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userData.patchValue({
      imagen1: file
    });
    this.userData.get('imagen1').updateValueAndValidity()
  }

  async uploadFile2(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userData.patchValue({
      imagen2: file
    });
    this.userData.get('imagen2').updateValueAndValidity()
  }

  async uploadFile3(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userData.patchValue({
      imagen3: file
    });
    this.userData.get('imagen3').updateValueAndValidity()
  }

  async uploadFile4(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userData.patchValue({
      imagen4: file
    });
    this.userData.get('imagen4').updateValueAndValidity()
  }

  public carnetLoadForm(){
    this.isSubmitted = true;
    if (!this.userData.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      var formData: any = new FormData();
        formData.append("token", this.userData.get("token").value);
        formData.append("dose_quantity", this.userData.get("dose_quantity").value);
        formData.append("type_Of_card", this.userData.get("type_Of_card").value);
        formData.append("imagen1", this.userData.get("imagen1").value);
        formData.append("imagen2", this.userData.get("imagen2").value);
        formData.append("imagen3", this.userData.get("imagen3").value);
        formData.append("imagen4", this.userData.get("imagen4").value);
        
        this.userService.carnetLoadUser(formData).subscribe(
          (response) => {
            if(response["success"]){
              this.storage.create();
              this.storage.set("carnet-load", true);
              this.route.navigate([encodeURI("tabs/profile_success")], { queryParams: { success: '1' } });
            }else{
              this.msj = true;
              this.msjText = response["msj"];
            }
          }
        );
    }
  }


}