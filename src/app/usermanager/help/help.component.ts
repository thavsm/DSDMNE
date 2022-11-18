import { HttpClient } from '@angular/common/http';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

import { saveAs } from 'file-saver';
import { UserService } from 'src/app/shared/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})

export class HelpComponent implements OnInit {
  public link:string;
  constructor(private http: HttpClient, private service: UserService) { }
  readonly BaseURI = environment.API_URL;
  readonly BaseURIHelp = environment.API_FormURLForHelp;
  ngOnInit(): void {

  }
 
  name = 'Angular';
  @ViewChild('videoPlayer', { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  download(doc: any) {
    switch (doc) {
      case 1:
        window.open(this.BaseURIHelp + '/assets/pdf/DSD_Electronic ME System_Data Capturer_UserManual.pdf', '_blank');
        break;
      case 2:
        window.open(this.BaseURIHelp + '/assets/pdf/DSD_Electronic ME System_Verifier_UserManual.pdf', '_blank');
        break;
      case 3:
        window.open(this.BaseURIHelp + '/assets/pdf/DSD_Electronic ME System_Oversight_UserManual.pdf', '_blank');
        break;
      default:
        console.log("No such manual exists!");
        break;
    }
  }
}