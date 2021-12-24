import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';

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
  roleID: string;

  constructor(private service: UserService, private spinner: NgxSpinnerService) {

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
          this.roleID =this.formData['roleId'];
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
    
    let formData1 = {
      WorkflowID: parseInt(wkid),
      TaskID: parseInt(tid),
      ProcessID:0,
      ActionTakenID: parseInt(this.actTakenID),
      NextUserID: parseInt(this.nextUserID),
      Comment: this.comment,
      Role: this.roleID
    };
    this.service.completeTask(formData1).subscribe(
      res => {
        this.spinner.hide();
        //this.data1 = res;
        window.location.replace("/dashboard");
      },
      err => {
        this.spinner.hide();
        console.log(err);
      },
    );
  }

}