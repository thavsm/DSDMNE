import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import { UserService } from 'src/app/shared/user.service';
import { TreediagramService } from 'src/app/treediagram.service';
import Swal from 'sweetalert2';

declare var $: any;
export interface lexdata {
  name: string;
  value: string;
}


@Component({
  selector: 'app-reassign-user-tasks',
  templateUrl: './reassign-user-tasks.component.html',
  styleUrls: ['./reassign-user-tasks.component.css']
})
export class ReassignUserTasksComponent implements OnInit {


  public editUser;
  assignedlocations: any[];
  Userss: any[];
  public List: any;
  UsersList :any[];
  EditList :0;
  hideCancelButton: boolean = false;
  
  formModel = this.fb.group({
    FirstName:[''],
    UsersList:[''],
    //AssignedBy: [''],
    //AssignedTo :[''],
    Start: [''],
    End: ['']
   
  });

  StartDate:  any;
  EndDate:  any;
  userDetail: any;
  AssignedBy : string;
  AssignedTo: any;
  formData: any = [];
  userlocation: any;
  userID : 0;
  AssignToUserID:0;
  //editUser:string;
  AssignedtoID:0;
  taskID:string;
  addEditTask: string = 'Add';

//today's date
todayDate:Date = new Date();

  constructor(private fb: FormBuilder, public datepipe: DatePipe,private spinner: NgxSpinnerService, private service: UserService, public fservice : FormbuilderService,public tservice: TreediagramService) { }

  ngOnInit(): void {

    this.service.getUserProfile().subscribe(
      res => {
        this.formData = res['formData'];
       this.userDetail = res;
       this.userlocation = this.userDetail.formData.location;
       this.userID = this.userDetail.formData.userID;

       
       this.fservice.GetUsersByLocation(this.userlocation, this.userID).subscribe(results=>{

            this.UsersList = results;
          
     });
  
    
      //this.UsersList = this.editUser;
    

     this.refreshTaskList();
      });


  }

 
  loadUsers(userID:any)
  {
    console.log(userID.userID);
  }

  changeClient(value) {
    console.log(value);
    this.AssignToUserID = value;
}

clear()
{
  this.addEditTask = 'Add';
  this.StartDate = null;
  this.EndDate =  null;
  this.AssignedTo =  "";
  this.hideCancelButton = false;
}

InsertTaskDetails() {
console.log(this.addEditTask);
  if(this.formModel.value["Start"] != "" && this.formModel.value["End"] != "" ) 
  {
    if(this.formModel.value["Start"] != undefined && this.formModel.value["End"] != undefined )
     {
      if(this.datepipe.transform(this.formModel.value["End"], 'dd-MMM-YYYY') > this.datepipe.transform(this.formModel.value["Start"], 'dd-MMM-YYYY' )&& this.formModel.value["UsersList"] != "") 
      {
        if (this.addEditTask === 'Add')
        {
          this.spinner.show();
          var val = {
            "AssignedByID": this.userID,    
            "AssignedToID": this.AssignToUserID,
            "StartDate": this.datepipe.transform(this.formModel.value["Start"], 'dd-MMM-YYYY') ,       
            "EndDate": this.datepipe.transform(this.formModel.value["End"], 'dd-MMM-YYYY'),
            //"ReassignedON": "2022-01-21",
            'ReassignByUserID' :this.userID
          
          }
          this.fservice.AddReassignedTasks(val).subscribe(res => {
          this.showNotification('top', 'center', ' Task reassigned successfully!', '', 'success');
          this.clear();      
          this.refreshTaskList();
          this.addEditTask = 'Add';
          this.spinner.hide();
          });

        }
       else
       {
          this.spinner.show();                   
          var obj = {
            "Id" :this.taskID,
            "AssignedByID": this.userID,    
            "AssignedToID": this.AssignToUserID,
            "StartDate": this.datepipe.transform(this.formModel.value["Start"], 'dd-MMM-YYYY') ,       
            "EndDate": this.datepipe.transform(this.formModel.value["End"], 'dd-MMM-YYYY'),
            "ReassignedON": "2022-01-21",
            'ReassignByUserID' :this.userID
          
          }
          this.fservice.UpdateTaskReassigned(obj ,this.taskID).subscribe(res => {
            // this.fservice.GetUsersByLocation(this.userlocation, this.userID).subscribe(results=>{

            //   this.UsersList = results;
            
            //   });
            this.showNotification('top', 'center', ' Task updated successfully!', '', 'success');
            this.clear();    
            this.refreshTaskList();
            this.addEditTask = 'Add';
            this.spinner.hide();
            });
       }
 
    }
    else{
      this.showNotification('top', 'center', 'Please  select user to assign to!', '', 'danger');
    }

    }
    else{
      this.showNotification('top', 'center', 'Please select a start date and end date before saving!', '', 'danger');
    }

  }
  else{
    this.showNotification('top', 'center', 'Please select a start date and end date before saving!', '', 'danger');
  }

}

showComment(data: any) {
  this.addEditTask = 'Edit';
  this.StartDate = data.startDate ;
  this.EndDate =data.endDate  ;
  this.editUser=  data.assignedTo;
  this.AssignToUserID = data.assignedToID;
 //this.AssignedTo = data.assignedTo;
 this.taskID = data.id;
 this.hideCancelButton = true;
  
}

deleteTasks(item:any)
{
   Swal.fire({
      title: "<h5 style='color:white;font-weight:400'> Are you sure you want to remove this task? </h5>",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      toast: true,
      position: 'top',
      allowOutsideClick: false,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#000000',
      background: '#CA0B00'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.fservice.DeleteReassignedTask(item.id).subscribe(data => {
          console.log("successfull");
          this.spinner.hide();
          this.refreshTaskList();
          this.showNotification('top', 'center', 'User tasks removed  successfully!', '', 'success');
          
     
        });
       
      }
    
    })


}

refreshTaskList()
{
  this.fservice.getReassignedUserTasks(this.userID).subscribe(data => {
    data.forEach(dfield=>{

     dfield.startDate =  dfield.startDate.split('T')[0];
     dfield.endDate = dfield.endDate.split('T')[0];
     dfield.reassignedDate = dfield.reassignedDate.split('T')[0];
    });
   
      this.List = data;

    });

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
