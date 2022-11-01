import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/shared/user.service';


declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  // images = [  
  //   { img: "./assets/img/Department.jpg" },  
  //   { img: "./assets/img/hope.jpg" },  
  //   { img: "./assets/img/gbv.png" },   
  // ];  
  
  images = [  
    { img: "./assets/img/carousel1.jpg" },  
    { img: "./assets/img/carousel2.JPG" },  
    { img: "./assets/img/carousel3.JPG" },
    { img: "./assets/img/carousel4.JPG" },  
    { img: "./assets/img/carousel5.JPG" },   
    { img: "./assets/img/carousel6.JPG" },  
    { img: "./assets/img/carousel7.JPG" },   
    { img: "./assets/img/carousel8.JPG" },  
    { img: "./assets/img/carousel9.jpg" },   
    { img: "./assets/img/carousel10.jpg" },  
    { img: "./assets/img/carousel11.jpg" },   
    { img: "./assets/img/carousel12.jpg" },  
    { img: "./assets/img/carousel13.jpg" },   
    { img: "./assets/img/carousel14.jpg" },  
    { img: "./assets/img/carousel15.jpg" },  
    { img: "./assets/img/carousel16.jpg" },  
    { img: "./assets/img/carousel17.jpg" },
    { img: "./assets/img/carousel18.jpg" },  
    { img: "./assets/img/carousel19.jpg" },
    { img: "./assets/img/carousel20.jpg" }
  ];  
  

  slideConfig = {  
    "slidesToShow": 1,  
    "slidesToScroll": 1,  
    "dots": true,  
    "infinite": true,
    "autoplay":true
  };  

  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  formModel = this.fb.group({
    UserName: ['',[Validators.required,Validators.email]],
    Password: ['', Validators.required]
   
  });

    

  constructor(private element: ElementRef, private fb: FormBuilder, private service: UserService, private router: Router, private spinner: NgxSpinnerService) {
      this.nativeElement = element.nativeElement;
      this.sidebarVisible = false;
  }

  ngOnInit() {
      var navbar : HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('login-page');
      body.classList.add('off-canvas-sidebar');
      const card = document.getElementsByClassName('card')[0];
      setTimeout(function() {
          // after 1000 ms we add the class animated to the login/register card
          card.classList.remove('card-hidden');
      }, 700);
  }
  sidebarToggle() {
      var toggleButton = this.toggleButton;
      var body = document.getElementsByTagName('body')[0];
      var sidebar = document.getElementsByClassName('navbar-collapse')[0];
      if (this.sidebarVisible == false) {
          setTimeout(function() {
              toggleButton.classList.add('toggled');
          }, 500);
          body.classList.add('nav-open');
          this.sidebarVisible = true;
      } else {
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          body.classList.remove('nav-open');
      }
  }
  ngOnDestroy(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.remove('off-canvas-sidebar');
  }

  showNotification(from: any, align: any, message: any, title: any, type: string) {
    //const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    //const color = Math.floor((Math.random() * 6) + 1);

    $.notify({
        icon: 'notifications',
        title: title,
        message: message
    }, {
        type: type,
      delay: 1500,
timer: 1500,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
  
  onSubmit() {
      
      //let bd ={UserName: this.formModel.value.UserName, Password: this.formModel.value.Password};
      this.spinner.show();
      this.service.login(this.formModel.value).subscribe(
        (res: any) => {
          this.spinner.hide();
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.spinner.hide();
          if (err.status == 400) {
          this.showNotification('top','right',err.error.message, 'Authentication failed.','danger');
          }
          else
          {
            this.showNotification('top','right','Unable to login', 'Authentication failed.','danger');
            console.log(err);
          }
        }
      );
  }
}
