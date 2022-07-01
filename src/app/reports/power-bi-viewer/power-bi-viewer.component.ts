import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-power-bi-viewer',
  templateUrl: './power-bi-viewer.component.html',
  styleUrls: ['./power-bi-viewer.component.css']
})
export class PowerBiViewerComponent implements OnInit {

  urlSafe!: SafeResourceUrl; 
  url: string ="";

constructor(public activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer) {}

ngOnInit() {

  this.activatedRoute.params.subscribe(param => {  
         
    this.url = environment.PowerBiREPORT_URL;
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }); 

  
}

}
