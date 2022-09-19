import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-iframereportsviewer',
  templateUrl: './iframereportsviewer.component.html',
  styleUrls: ['./iframereportsviewer.component.css']
})
export class IframereportsviewerComponent implements OnInit {
  urlSafe!: SafeResourceUrl;

  rptName = 'EventRegistratiron'
  url: string = "";

  constructor(public activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(param => {
      if (param.id !== 'INDICATOR REPORT') {
        this.rptName = param['id'];
        this.url = environment.REPORT_SERVER + this.rptName;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      }
      else {
        this.router.navigateByUrl('/indicatorReports');
      }
    });
  }
}
