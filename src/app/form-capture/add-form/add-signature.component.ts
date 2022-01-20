import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormAddComponent } from 'src/app/form-list/form-add/form-add.component';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import Swal from 'sweetalert2'
import { merge } from 'jquery';
import { SignaturePad } from 'angular2-signaturepad';
declare var $: any;

@Component({
  selector: 'app-add-form',
  templateUrl: './add-signature.component.html',
  styleUrls: ['./add-signature.component.css']
})
export class AddSignatureComponent {

  signatureImg: string;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 760,
    'canvasHeight': 150
  };

  constructor(public dialogRef: MatDialogRef<AddSignatureComponent>) {
  }

  ngAfterViewInit() {
   // this.signaturePad.clear();
   const val=localStorage.getItem('imageData').toString();
   this.signaturePad.fromDataURL(val);
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    localStorage.setItem('imageData',base64Data);
    this.dialogRef.close();
  }

   dataURLtoFile(dataURL:any, filename:any) {
    var arr = dataURL.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}
}


