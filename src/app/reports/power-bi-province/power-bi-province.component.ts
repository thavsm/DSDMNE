import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-power-bi-province',
  templateUrl: './power-bi-province.component.html',
  styleUrls: ['./power-bi-province.component.css']
})
export class PowerBiProvinceComponent implements OnInit {

  urlSafe!: SafeResourceUrl; 
  url: string ="";

constructor(public activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer) {}


  ngOnInit() {

    this.activatedRoute.params.subscribe(param => {  
           
      this.url = environment.PowerBiREPORT_Province_URL;
      this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      }); 
  
    
  }

}
