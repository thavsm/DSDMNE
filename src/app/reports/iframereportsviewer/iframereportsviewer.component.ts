import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-iframereportsviewer',
  templateUrl: './iframereportsviewer.component.html',
  styleUrls: ['./iframereportsviewer.component.css']
})
export class IframereportsviewerComponent implements OnInit {
  urlSafe!: SafeResourceUrl;

  rptName = 'EventRegistratiron'
  url: string ="";

constructor(public activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer) {}

ngOnInit() {

  this.activatedRoute.params.subscribe(param => {  
    this.rptName=param['id'];      
    this.url = environment.REPORT_SERVER+this.rptName;
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }); 

  
}

 

}
