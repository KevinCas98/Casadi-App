import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/api/user/user.service';
import { Storage } from '@ionic/storage';
import { GlobalCommon } from '../../commons/global/global.commons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

  public userData : FormGroup;
  public data: any[] = [];
  isSubmitted = false;
  public msj: any;
  public msjText: string;
  public success: number;
  public urlWeb: string;

  constructor(private route: Router, 
    public formBuilder: FormBuilder,
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private globalCommon: GlobalCommon,
    public storage: Storage) {}

  ngOnInit() {
    this.reloadData();
  }

  ionViewWillLeave() {
    this.reloadData();
  }

  public reloadData(){
    this.msj = false;
    this.msjText = "";
    this.urlWeb = this.globalCommon.getBaseWebUrl();
    this.actRoute.queryParams.subscribe(params => {
      if (params) {
        if(params["success"]){
          this.msj = params["success"];
          this.msjText = "Los datos se actualizaron con éxito";
        }
      }
    });
    this.storage.create();
    this.userData = this.formBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      token: [''],
      id: [''],
      img_hidden: [''],
      sex: [''],
      dateOfBirth: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      profileImg: ['']
    })
    this.storage.get("token").then(token=>{
      this.userService.getUserByToken(token).subscribe(
        (response) => {
          this.data = response["user"][response["user"]["id"]];
          this.userData.get("name").setValue(response["user"][response["user"]["id"]]["name"]);
          this.userData.get("last_name").setValue(response["user"][response["user"]["id"]]["lastName"]);
          this.userData.get("token").setValue(response["user"][response["user"]["id"]]["token"]);
          this.userData.get("id").setValue(response["user"]["id"]);
          this.userData.get("img_hidden").setValue(response["user"][response["user"]["id"]]["profileImg"]);
          this.userData.get("sex").setValue(response["user"][response["user"]["id"]]["sex"]);
          this.userData.get("dateOfBirth").setValue(response["user"][response["user"]["id"]]["dateOfBirth"]);
          this.userData.get("dni").setValue(response["user"][response["user"]["id"]]["dni"]);
          this.userData.get("contact").setValue(response["user"][response["user"]["id"]]["contact"]);
          this.userData.get("city").setValue(response["user"][response["user"]["id"]]["city"]);
          this.userData.get("province").setValue(response["user"][response["user"]["id"]]["province"]);
          this.userData.get("profileImg").setValue(response["user"][response["user"]["id"]]["profileImg"]);
        } 
      );
    });
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

   public profileForm(){
        this.isSubmitted = true;
        if (!this.userData.valid) {
          console.log('Please provide all the required values!')
          return false;
        } else {
          var formData: any = new FormData();
            formData.append("name", this.userData.get("name").value);
            formData.append("last_name", this.userData.get("last_name").value);
            formData.append("dni", this.userData.get("dni").value);
            formData.append("token", this.userData.get("token").value);
            formData.append("id", this.userData.get("id").value);
            formData.append("img_hidden", this.userData.get("img_hidden").value);
            formData.append("sex", this.userData.get("sex").value);
            formData.append("date_of_birth", this.userData.get("dateOfBirth").value);
            formData.append("contact", this.userData.get("contact").value);
            formData.append("city", this.userData.get("city").value);
            formData.append("province", this.userData.get("province").value);
            formData.append("profile_img", this.userData.get("profileImg").value);
            
            this.userService.profileUser(formData).subscribe(
              (response) => {
                if(response["success"]){
                  this.storage.set("profile", true);
                  if(this.msj==1){
                    this.route.navigate([encodeURI("tabs/profile")], { queryParams: { success: '2' } });
                  }else{
                    this.route.navigate([encodeURI("tabs/profile_success")], { queryParams: { success: '1' } });
                  }
                }else{
                  this.msj = true;
                  this.msjText = response["msj"];
                }

              }
          );
      }
  }

  public logout(){
    this.storage.clear();
    this.route.navigate([encodeURI("home")]);
  }

}
