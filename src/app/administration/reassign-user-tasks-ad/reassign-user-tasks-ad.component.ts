import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  selector: 'app-reassign-user-tasks-ad',
  templateUrl: './reassign-user-tasks-ad.component.html',
  styleUrls: ['./reassign-user-tasks-ad.component.css']
})
export class ReassignUserTasksAdComponent implements OnInit {

  public placeholder1;
  public placeholder2;
  assignedDistricts: any[];
  assignedProvinces: any[];
  assignedServicePoint: any[];
  provinces: any[];
  districts: any[];
  servicePoint: any[];
  assignedlocations: any[];
  assignedLocation : any;
  hideElementAssignFrom: boolean = false;
  hideElementAssignTo: boolean = false;
  hideElementProv: boolean = false;
  hideElementDist: boolean = false;
  hideElementService: boolean = false;
  hideCancelButton: boolean = false;
  locations: lexdata[] = [
  { name: "Province", value: "Province" }, { name: "District", value: "District" }, { name: "Service Point", value: "Service Point" }
  ];

  Userss: any[];
  public List: any;
  
  formModel = this.fb.group({
    AssignedBy: [''],
    AssignedTo :[''],
    Start: [''],
    End: [''],
    assignedServicePoint:[''],
    assignedDistricts:[''],
    assignedProvinces:[''],
    assignedLocation:['']
   
  });

  StartDate:  any;
  EndDate:  any;
  userDetail: any;
  AssignedBy : any;
  AssignedTo: any;
  formData: any = [];
  userlocation: any;
  userID : 0;
  AssignToUserID:0;
  AssignByUserID:0;
  locationTypeValue :string;
  selectedprovince:any;
  selectedDistrict:any;
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
       //this.userlocation = this.userDetail.formData.location;
       this.userID = this.userDetail.formData.userID;
       this.refreshTaskList();
      });
     
      this.getProvinces();
   
  }

  

  compareFn(option1: lexdata, option2: lexdata) {
    return option1 && option2 ? option1.name === option2.name : option1 === option2;
  }

  loadUsers(userID:any)
  {
    console.log(userID.userID);
  }

  changeClient(value) {
    console.log(value);
    this.AssignToUserID = value;
}

changeUserAssign(value){
console.log(value);
this.AssignedTo = this.AssignedBy.filter(obj => obj.userID !== value)
this.AssignByUserID = value;
}

clear(){
  this.addEditTask = 'Add';
  this.StartDate = null;
  this.EndDate =  null;
  this.userDetail = null;
  this.AssignedBy = null;
  this.AssignedTo = null;
  this.assignedLocation = null;
  this.locationTypeValue = "";
  this.hideElementAssignFrom = false;
  this.hideElementAssignTo = false;
  this.hideElementProv = false;
  this.hideElementDist = false;
  this.hideElementService = false;
  this.hideCancelButton = false;

}


locationTypeV(value) {
  //console.log(value);
    if (value == 'Province')
    {
      this.hideElementProv = true;
      this.hideElementAssignFrom = true;
      this.hideElementAssignTo = true;
      this.hideElementDist = false;
      this.hideElementService = false;
      this.getProvinces();
      // this.tservice.getNodesLevelID(4261).subscribe(data => {
      //   data.array.forEach(element => {
          
      //   });
      //   this.provinces = data;
      // });
    }
    else if(value == 'District')
    { 
      this.hideElementProv = true;
     this.hideElementDist = true;
     this.hideElementAssignFrom = true;
      this.hideElementAssignTo = true;
      this.hideElementService = false;
    }
    else if(value == 'Service Point')
    {
      this.hideElementProv = true;
      this.hideElementDist = true;
      this.hideElementAssignFrom = true;
      this.hideElementAssignTo = true;
      this.hideElementService = true;
    }
   

  this.locationTypeValue = value;
}

InsertTaskDetails() {
console.log(this.addEditTask);
  if(this.formModel.value["Start"] != "" && this.formModel.value["End"] != "" ) {
    if(this.formModel.value["Start"] != undefined && this.formModel.value["End"] != undefined ) {
      if(this.datepipe.transform(this.formModel.value["End"], 'dd-MMM-YYYY') > this.datepipe.transform(this.formModel.value["Start"], 'dd-MMM-YYYY')&& this.formModel.value["Assigned"] != "" && this.formModel.value["Assigning"] != "") 
      {
        if (this.addEditTask === 'Add')
        {
          var val = {
            "AssignedByID": this.AssignByUserID,    
            "AssignedToID": this.AssignToUserID,
            "StartDate": this.datepipe.transform(this.formModel.value["Start"], 'dd-MMM-YYYY') ,       
            "EndDate": this.datepipe.transform(this.formModel.value["End"], 'dd-MMM-YYYY'),
            //"ReassignedON": "2022-01-21",
            'ReassignByUserID' :this.userID
          
          };
    
          this.spinner.show();
          this.fservice.AddReassignedTasks(val).subscribe(res => {
          this.showNotification('top', 'center', ' Task reassigned successfully!', '', 'success');      
          this.refreshTaskList();
          this.clear();
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
            //  this.fservice.GetUsersByLocation(this.userlocation, this.userID).subscribe(results=>{
 
            //    this.UsersList = results;
             
            //    });
             this.showNotification('top', 'center', ' Task updated successfully!', '', 'success');
             this.clear();    
             this.refreshTaskList();
             this.addEditTask = 'Add';
             this.spinner.hide();
             });
        }
  

    }
    else
    {
      this.showNotification('top', 'center', 'Please select an end date after start date  before saving!', '', 'danger');
    }
    }
    else
    {
      this.showNotification('top', 'center', 'Please select a start date and end date before saving!', '', 'danger');
    }

  }
  else
  {
    this.showNotification('top', 'center', 'Please select a start date and end date before saving!', '', 'danger');
  }

}


showComment(data: any) {
  this.addEditTask = 'Edit';
  this.StartDate = data.startDate ;
  this.EndDate =data.endDate  ;
  this.AssignToUserID = data.assignedToID;
  this.AssignByUserID = data.assignedByID;
 this.taskID = data.id;
 this.hideElementAssignFrom = false;
 this.hideElementAssignTo = false;
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


getProvinces() {
  this.tservice.getNodesLevelID(4261).subscribe(data => {
    this.provinces = data;
  });
 
}

getDistrict() {
  console.log(this.selectedprovince.nodeID);
     this.service.getNodesByParent(this.selectedprovince.nodeID).subscribe(
      res => {
        this.districts = res;
      },
      err => {
        console.log(err);
      },
    );
}

getServicePoint() {
  console.log(this.selectedDistrict.nodeID);
  this.service.getNodesByParent(this.selectedDistrict.nodeID).subscribe(
   res => {
     this.servicePoint = res;
   },
   err => {
     console.log(err);
   },
 );
}

getSelectedProvince(list:any) {
  console.log(list.nodeParentD);
  this.selectedprovince = list;
  this.fservice.GetUsersByLocation(list.nodeID, this.userID).subscribe(results=>{

    this.AssignedBy = results;
  
});
  this.getDistrict();

}

getSelectedDistrict(list:any) {
  this.selectedDistrict = list;
  this.fservice.GetUsersByLocation(list.nodeID, this.userID).subscribe(results=>{

    this.AssignedBy = results;
  
});
  this.getServicePoint();
}

getSelectedServicePoint(list:any){
  this.fservice.GetUsersByLocation(list.nodeID, this.userID).subscribe(results=>{
    this.AssignedBy = results;
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
