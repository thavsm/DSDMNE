import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import { UserService } from 'src/app/shared/user.service';

declare var $: any;
@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  formComment: string = '';
  
  userDetail: any;

  formData: any = [];
  IndicatorData: any;

isViewOnly: any;
  constructor(public dialogRef: MatDialogRef<AddCommentComponent>, private userService: UserService,private service: FormbuilderService, @Inject(MAT_DIALOG_DATA) public data: any) {
    //this.formData = JSON.parse(localStorage.getItem('formCaptureDetails') || '{}');
    this.IndicatorData = data["indicatorID"];
    this.formData  = {
      formCaptureID: data["formCaptureID"],
      formID: data["formID"],
      formName: data["formName"],
      state: 'edit'
    };
   }

  ngOnInit(): void {
    this.isViewOnly = this.formData.view;
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetail = res;
        //this.refreshCommentList();
      },
      err => {
        console.log(err);
        //this.refreshCommentList();
      },
    );
  }

  addComment(){
    // let commentName = "";
    // if (localStorage.getItem('fieldNameComment') !== null || localStorage.getItem('fieldNameComment') !== undefined) {
    //   commentName = localStorage.getItem('fieldNameComment').toString();
    // }
    // if (commentName !== "") {
    if (this.formComment !== "" && this.formComment !== null) 
    {
      //this.spinner.show();
      let obj = {
        "commentID": 0,
        "userID": this.userDetail.formData.userID,
        "deviceFormGUID": "0FA12DB7-D725-48A9-BED2-A44C95E94F7D",
        "comment": this.formComment,
        "stepID": 0,
        "timeStamp": "2022-01-21T13:29:23.713Z",
        "formCaptureID": this.formData.formCaptureID,
        "fullName": "string",
        "LinkedTo": "",
        "indicatorID" :  this.IndicatorData
      }
      this.service.addFormCommentDataApproval(obj).subscribe(res => {
        this.showNotification('top', 'center', 'Form comment has been saved successfully!', '', 'success');
        this.formComment = '';
        //this.refreshCommentList();
        //this.addEditComment = 'Add';
        //localStorage.setItem('fieldNameComment', "");
        //this.spinner.hide();
      });
    }
   else 
   {
      this.showNotification('top', 'center', 'Please enter a comment before saving!', '', 'danger');
    }
  
  }

  closePopup() {
    this.dialogRef.close();
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
