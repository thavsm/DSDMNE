import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-programme-power-bi',
  templateUrl: './programme-power-bi.component.html',
  styleUrls: ['./programme-power-bi.component.css']
})
export class ProgrammePowerBiComponent implements OnInit {

  urlSafe!: SafeResourceUrl; 
  url: string ="";


  constructor(public activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer)  { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(param => {  
           
      this.url = environment.ProgrammePowerBiREPORT_URL;
      this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      }); 
  
    
  }

}
