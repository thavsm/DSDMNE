import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import { Router } from '@angular/router';

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
  actionTakenAll: any;
  asgnUsers: any;
  

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
    
    this.actTakenID= event.value;
    let act = this.actionTakenAll as [{}];
    for(let i=0; i<act.length;i++)
    {
       if(act[0]['id'] == event.value) {
           this.asgnUsers = act[0]['assignUsers'];
           if(act[0]['assignUsers'].length == 1) {
            this.nextUserID= act[0]['assignUsers'][0]['key'];
           }

       }
    }
 }

 onUserSelected(event) {

  this.nextUserID= event.value;

 }

  public ngOnInit() {
   
    const wkid =new URLSearchParams(window.location.search).get('workflowid');
    const tid =new URLSearchParams(window.location.search).get('taskid');
    
    let body = {
        WorkflowID: parseInt(wkid),
        TaskID: parseInt(tid),
        ProcessID:0
      };

    this.service.getuserTask(body).subscribe(
        res => {
          
          this.workflowData = res['workflow'];
          this.formData = res['formData'];
          
          var taskArray = res['workflow']['list'].filter(obj1 => {
            return obj1.id == parseInt(tid)
        });
        var task;
        if (taskArray.length == 1)
            task = taskArray[0];

        if (task != null) {

            if (task.actionTaken > 0) {
                
            }

            if (task.actionTakenAll != null) {
                this.actionTakenAll = task.actionTakenAll;
            }
        }

        },
        err => {
          console.log(err);
        },
      );
  }

  completeTask() {
    this.spinner.show();
    const wkid =new URLSearchParams(window.location.search).get('workflowid');
    const tid =new URLSearchParams(window.location.search).get('taskid');
    
    let appUserModel =this.formData;

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
        //this.data1 = res;
        //window.location.replace("/dsd_demo/dashboard");
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.spinner.hide();
        console.log(err);
      },
    );
  }

  addItem(newItem: any) {
    //this.items.push(newItem);
    this.formData = newItem;
  }


}