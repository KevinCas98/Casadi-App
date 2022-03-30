import { Component, OnInit } from '@angular/core';

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
  
  constructor() { }

  ngOnInit() {
  }

  async toggleDisplay(idButton:number) {

    console.log(idButton);
    
    switch (idButton) {
      case 2:
        this.isShown2 = false;
        this.idButton++;
          console.log("Segundo Boton");
          break;
      case 3:
          this.isShown3 = false;
          this.idButton++;
          console.log("Tercer Boton");
          break;
      case 4:
          this.isShown4 = false;
          this.idButton++;
          console.log("Cuarto Boton");
          break;
    }
    
  }

  loadImageFromDevice(event) {

    const file = event.target.files[0];
  
    const reader = new FileReader();
  
    reader.readAsArrayBuffer(file);
  
    reader.onload = () => {
  
      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
  
      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob);
  
    };
  
    reader.onerror = (error) => {
  
      //handle errors
  
    };
  };
}