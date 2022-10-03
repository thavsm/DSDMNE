import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html'
})

export class TaskDetailComponent implements OnInit {
  
  workflowData: any;
  formData: any;
  comment = '';
  actTakenID: string;
  nextUserID: string;
  actionTakenAll: any[];
  asgnUsers: any[];
  pid: number;
  taskArray: any[];
  actionTaken: number;

  roles = [
    {value: '1', viewValue: 'Admin'},
    {value: '3', viewValue: 'System Administrator'},
    {value: '4', viewValue: 'Head of M&E'},
    {value: '5', viewValue: 'Head Of Department'},
    {value: '6', viewValue: 'Chief Director'},
    {value: '7', viewValue: 'Director'},
    {value: '8', viewValue: 'Assistant Director'},
    {value: '9', viewValue: 'Programme Manager'},
    {value: '10', viewValue: 'District Manager'},
    {value: '11', viewValue: 'Service Point Manager'},
    {value: '12', viewValue: 'Social Worker/CDP'},
    {value: '13', viewValue: 'Facility Manager'},
    {value: '14', viewValue: 'M&E Coordinator'},
    {value: '15', viewValue: 'Social Worker Manager'}
  ];

  cities = [
    {value: '7', viewValue: 'Western Cape'},
    {value: '1', viewValue: 'Eastern Cape'},
    {value: '2', viewValue: 'Northern Cape'},
    {value: '3', viewValue: 'Kwa-ZuluNatal'},
    {value: '4', viewValue: 'Free State'},
    {value: '5', viewValue: 'Gauteng'},
    {value: '6', viewValue: 'North West'},
    {value: '8', viewValue: 'Mphumulanga'},
    {value: '9', viewValue: 'Limpopo'}
  ];
  
  
  constructor(private service: UserService, private spinner: NgxSpinnerService, private router: Router) {
    
     
  }

  onActionSelected(event) {
    
    this.actTakenID = event.value;
    this.setAssignUser(this.actTakenID);
    
 }

 setAssignUser(actiontkn: string) {
  
  let act = this.actionTakenAll;
  for(let i=0; i<act.length;i++) {
       if(act[i]['id'] == actiontkn) {
           this.asgnUsers = act[i]['assignUsers'];
           if(act[i]['assignUsers'].length == 1) {
            this.nextUserID = act[i]['assignUsers'][0]['key'];
           }
           break;
       }
    }
  }

 onUserSelected(event) {

  this.nextUserID = event.value;

 }

  public ngOnInit() {
    
    const urlObj = new URLSearchParams(window.location.search);
    const wkid = urlObj.get('workflowid');
    const tid = urlObj.get('taskid');
    //this.pid = urlObj.get('pid');
    let body = {
        WorkflowID: parseInt(wkid),
        TaskID: parseInt(tid),
        ProcessID:0
      };

    this.service.getuserTask(body).subscribe(
        res => {
          
          this.workflowData = res['workflow'];
          this.formData = res['formData'];
          this.pid = res['workflow']['processID'];
          this.taskArray = res['workflow']['list'];
          let taskpend = this.taskArray.find((obj1: { id: number; }) => {
            return obj1.id == parseInt(tid)
        });
        
        if (taskpend !== undefined) {
           
            this.actionTaken = taskpend.actionTaken;
            // if (taskpend.actionTaken > 0) {
                
            // }
            if (taskpend.actionTakenAll != null) {
                this.actionTakenAll = taskpend.actionTakenAll;
                if(taskpend.actionTakenAll.length ==1) {
                  this.actTakenID = taskpend.actionTakenAll[0]['id'];
                  this.setAssignUser(this.actTakenID);
                }
            }
        }

        },
        err => {
          console.log(err);
        },
      );
  }

  completeTask() {

    Swal.fire({
      title: 'Are you sure you want to approve?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      toast: true,
      position: 'top',
      allowOutsideClick: false,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#000000',
      allowEscapeKey:true
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        const wkid =new URLSearchParams(window.location.search).get('workflowid');
        const tid =new URLSearchParams(window.location.search).get('taskid');
        
        let appUserModel =this.formData;
        
        if(this.pid === 2) {
          this.nextUserID = "-1";//do not complete task
          if(this.actTakenID === undefined) {
              this.actTakenID = "1";
          }
        }
        
        if(this.pid === 1) {
          this.nextUserID = "11";//system user
          if(this.actTakenID === undefined) {
            this.actTakenID = "1";
          }
      }

        let formData1 = {
          WorkflowID: parseInt(wkid),
          TaskID: parseInt(tid),
          ProcessID:0,
          ActionTakenID: parseInt(this.actTakenID),
          NextUserID: parseInt(this.nextUserID),
          Comment: this.comment,
          ApplicationUserModel: appUserModel
          //Role: this.formData['roleId']
        };
        this.service.completeTask(formData1).subscribe(
          res => {
            this.spinner.hide();
            this.showNotification('top','center','User account approved successfully','','success');
            this.router.navigate(['/dashboard']);
          },
          err => {
            this.spinner.hide();
            console.log(err);
          },
        );
      }
    })


    
  }

  rejectTask() {

    
    Swal.fire({
      title: 'Are you sure you want to reject?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      toast: true,
      position: 'top',
      allowOutsideClick: false,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#000000'
    }).then((result) => {
      if (result.value) {

        this.spinner.show();
          const wkid =new URLSearchParams(window.location.search).get('workflowid');
          const tid =new URLSearchParams(window.location.search).get('taskid');
          
          let appUserModel = this.formData;

          let formData1 = {
            WorkflowID: parseInt(wkid),
            TaskID: parseInt(tid),
            ProcessID:0,
            ActionTakenID: 0,
            NextUserID: -1,
            Comment: this.comment,
            ApplicationUserModel: appUserModel
            //Role: this.formData['roleId']  
          };
          this.service.rejectTask(formData1, 'dd').subscribe(
            res => {
              this.spinner.hide();
              this.showNotification('top','center','User account rejected succesfully','','success');
              this.router.navigate(['/dashboard']);
            },
            err => {
              this.spinner.hide();
              console.log(err);
            },
          );
       
      }
    })


    
  }

  addItem(newItem: any) {
    //this.items.push(newItem);
    this.formData = newItem;
  }

  
  showNotification(from: any, align: any, message: any, title: any, type: string) {
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

}




