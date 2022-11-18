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
  ngOnInit(): void {

  }
 
  name = 'Angular';
  @ViewChild('videoPlayer', { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

	download(doc:any) {
    if(doc == 1)
    {
		this.service.downloadFile().subscribe((response: any) => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			window.open(url);
			saveAs(blob, 'employees.pdf');
			}), (error: any) => console.log('Error downloading the file'),
			() => console.info('File downloaded successfully');
	  }

    if(doc == 2)
    {
		this.service.downloadFile2().subscribe((response: any) => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			window.open(url);
			saveAs(blob, 'employees.pdf');
			}), (error: any) => console.log('Error downloading the file'),
			() => console.info('File downloaded successfully');
	  }

    if(doc == 3)
    {
		this.service.downloadFile3().subscribe((response: any) => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			window.open(url);
			saveAs(blob, 'employees.pdf');
			}), (error: any) => console.log('Error downloading the file'),
			() => console.info('File downloaded successfully');
	  }
  }

}