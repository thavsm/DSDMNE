import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import Swal from 'sweetalert2'
import { merge } from 'jquery';
import { SignaturePad } from 'angular2-signaturepad';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { lexdata } from 'src/app/form-capture/lexdata';
import { ignoreElements } from 'rxjs/operators';
import { UserService } from 'src/app/shared/user.service';
import { NgModel } from '@angular/forms';
import { ItemTemplateDirective } from '@progress/kendo-angular-dropdowns';
import { CalcReportComponent } from '../calc-report.component';

declare var $: any;

export interface DialogData {
  image: any;
}

interface Item {
  text: string;
  value: number;
}

@Component({
  selector: 'app-approval-form',
  templateUrl: './approval-form.component.html',
  styleUrls: ['./approval-form.component.css']
})
export class ApprovalFormComponent implements OnInit {

  panelOpenState = false;

  formDesign: any = [];

  oldFormDesign:any=[];

  pages: any = [];

  currentPage: any = [];

  firstPage: any = [];

  lastPage: any = [];

  formData: any = [];

  selected = -1;

  dataToSave: any = [];

  tabIndex = 0;

  formComment: string = '';

  addEditComment: string = 'Add';

  commentID: number = 0;

  public selectedValues: string = "yes";

  public attachmentList: any;
  totalNumAttachments: number = 0;

  public photoList: any;
  totalNumPhotos: number = 0;

  public commentList: any;
  totalNumComments: number = 0;

  @ViewChild('fileInput') fileInput: ElementRef;
  file: File = null;
  fileAttr = 'Choose File(Max Size:20MB)';

  @ViewChild('photoInput') photoInput: ElementRef;
  photoFile: File = null;
  photoFileAttr = 'Choose Photo(Max Size:4MB)';

  ClickedRow: any;
  HighlightRow: Number;

  ClickedRowComment: any;
  HighlightRowComment: Number;

  userDetail: any;

  pageStatus: any;

  IndicatorData: any;

  isViewOnly:boolean=true;

  disableButton:boolean;

  constructor(public dialog: MatDialog, private service: FormbuilderService, private spinner: NgxSpinnerService, public dialogRef: MatDialogRef<CalcReportComponent>, private userService: UserService, @Inject(MAT_DIALOG_DATA) data) {
    console.log(data);

    // this.IndicatorData=27;
    // this.formData  = {
    //   formID: 6,
    //   formName: 'ProvincialIndicators',
    //   formCaptureID:'8581',
    //   state: 'edit'
    // };

    this.IndicatorData = data["indicatorID"];
    this.formData  = {
      formID: data["formID"],
      formName: data["formName"],
      formCaptureID: data["formcapturedID"],
      state: 'edit'
    };

    //this.formData = JSON.parse(localStorage.getItem('formApprovalDetails') || '{}');
    this.tabIndex = parseInt(localStorage.getItem('tabIndex'));
    this.ClickedRow = function (index) {
      this.HighlightRow = index;
    }
    this.ClickedRowComment = function (i) {
      this.HighlightRowComment = i;
    }
    localStorage.setItem('fieldNameAttach', "");
    localStorage.setItem('fieldNamePhoto', "");
  }

  ngOnInit(): void {    
    localStorage.setItem('cloneNumberForEdit', "0");
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetail = res;
        let userRoleID = this.userDetail.formData.role;
        this.userService.getFormsRole(userRoleID).subscribe(formRole => {
          formRole.forEach(role => {
            if (role.id===this.formData.formID && role.capture == false) {
              this.isViewOnly=true;
            }
          });
        });
        this.refreshPageList();
        this.refreshAttachmentList();
        this.refreshPhotoList();
        this.refreshCommentList();
      },
      err => {
        console.log(err);
        this.refreshPageList();
        this.refreshAttachmentList();
        this.refreshPhotoList();
        this.refreshCommentList();
      },
    );
  }

  
  DisableButton(attachmentID:any):boolean{
    if(this.userDetail.formData.userID===attachmentID.userID){
     return true;
    }
    else{
      return false;
    }
   }

  //#region Page Methods
  prevPage() {
    var errorMessage = "Please fill in ";
    let obj = [];
    this.formDesign.forEach(field => {
      if (field.groupGUID !== "" && field.groupGUID !== "string" && field.fieldType.value !== "repeatgroup" && field.fieldType.value === "section" && field.fieldType.value !== "subSection" && field.fieldType.value !== "PageTitle") {
        let sectionValues = field.groupGUID;
        sectionValues.forEach(element => {
          element.listValue = "";
          if (element.fieldType.value === "link multi select") {
            let val = element.data;
            let s = "";
            val.forEach(listValue => {
              s += listValue.name + ","
            });
            element.data = s;
          }
          if (element.groupGUID !== "" && element.groupGUID !== "string" && element.fieldType.value !== "repeatgroup" && element.fieldType.value === "group" && element.fieldType.value !== "subSection" && element.fieldType.value !== "PageTitle") {
            let groupValues = element.groupGUID;
            groupValues.forEach(e => {
              if (e.fieldValidations[0].isRequired === true && e.isAssigned===1 && e.data === " ") {
                errorMessage = errorMessage + e.questionName + ",";
              }
              if (e.parentFieldName === element.groupGUID) {
                e.groupGUID = "";
              }
              e.listValue = "";
              if (e.fieldType.value === "link multi select") {
                let val = e.data;
                let s = "";
                val.forEach(listValue => {
                  s += listValue.name + ","
                });
               e.data = s;
              }
              obj.push(e);
              element.groupGUID = "";
              element.listValue = "";
            });
          }
          else {
            element.groupGUID = "";
            if (element.fieldValidations[0].isRequired === true && element.isAssigned===1 && element.data === " ") {
              errorMessage = errorMessage + element.questionName + ",";
            }
          }
          obj.push(element);
        });
      }
      else if (field.groupGUID !== "" && field.groupGUID !== "string" && field.fieldType.value !== "repeatgroup" && field.fieldType.value === "group" && field.fieldType.value !== "subSection" && field.fieldType.value !== "PageTitle" && field.parentFieldName === "") {
        let groupValues = field.groupGUID;
        groupValues.forEach(e => {
          e.listValue = "";
          if (e.fieldType.value === "link multi select") {
            let val = e.data;
            let s = "";
            val.forEach(listValue => {
              s += listValue.name + ","
            });
            e.data = s;
          }
          e.groupGUID = "";
          if (e.fieldValidations[0].isRequired === true && e.isAssigned===1 && e.data === " ") {
            errorMessage = errorMessage + e.questionName + ",";
          }
          obj.push(e);
        });
      }
      else {
        if (field.parentFieldName === "" && field.groupGUID === "string") {
          field.listValue = "";
          field.groupGUID = "";
          if (field.fieldType.value === "link multi select") {
            let val = field.data;
            let s = "";
            val.forEach(listValue => {
              s += listValue.name + ","
            });
            field.data = s;
          }
          obj.push(field);
        }
        if (field.fieldValidations[0].isRequired === true && field.isAssigned===1 && field.data === " ") {
          errorMessage = errorMessage + field.questionName + ","
        }
      }

    });
    if (errorMessage === "Please fill in ") {
      if (this.formData.state === 'add') {
        this.service.saveFormMetadata(this.formData.formCaptureID, obj,this.userDetail.formData.userID).subscribe(res => {
          let pg = this.currentPage.pageNumber;
          let pageStatus = {
            "userID": this.userDetail.formData.userID,
            "pageNumber": (parseInt(this.currentPage.pageNumber) + 1).toString(),
            "formCaptureID": this.formData.formCaptureID,
            "pageGUID": this.currentPage.pageGUID
          }
          this.service.modifyPageStatus(this.formData.formCaptureID, this.currentPage.pageGUID, pageStatus).subscribe(result => {
            this.showNotification('top', 'center', 'Page data has been saved successfully!', '', 'success');
            this.currentPage.color = "green";
            this.formData.state = 'edit';
            var index = -1;
            var val = this.currentPage;
            var filteredObj = this.pages.find(function (item, i) {
              if (item === val) {
                index = i;
                return i;
              }
           });
            if ((index !== -1) && ((index - 1) !== -1)) {
              this.currentPage = this.pages[index - 1];
              this.pageStatus = this.currentPage.name;
              this.getDesignPerPage(this.currentPage.pageGUID);
              //this.getDesignPerPageHistory(this.currentPage.pageGUID);
            }
            else {
              this.showNotification('top', 'center', 'There are no pages before this page for this form!', '', 'warning');
            };
          });

        });
      }
      else {
        this.service.UpdateFormMetadata(this.formData.formCaptureID, obj,this.userDetail.formData.userID).subscribe(res => {
          let pg = this.currentPage.pageNumber;
          let pageStatus = {
            "userID": this.userDetail.formData.userID,
            "pageNumber": (parseInt(this.currentPage.pageNumber) + 1).toString(),
            "formCaptureID": this.formData.formCaptureID,
            "pageGUID": this.currentPage.pageGUID
          }
          this.service.modifyPageStatus(this.formData.formCaptureID, this.currentPage.pageGUID, pageStatus).subscribe(result => {
            this.showNotification('top', 'center', 'Page data has been saved successfully!', '', 'success');
            this.currentPage.color = "green";
            this.formData.state = 'edit';
            var index = -1;
            var val = this.currentPage;
            var filteredObj = this.pages.find(function (item, i) {
              if (item === val) {
                index = i;
                return i;
              }
            });
            if ((index !== -1) && ((index - 1) !== -1)) {
              this.currentPage = this.pages[index - 1];
              this.pageStatus = this.currentPage.name;
              this.getDesignPerPage(this.currentPage.pageGUID);
              //this.getDesignPerPageHistory(this.currentPage.pageGUID);
            }
            else {
              this.showNotification('top', 'center', 'There are no pages before this page for this form!', '', 'warning');
            }
          });
        });
      }
    }
    else {
      this.showNotification('top', 'center', errorMessage, 'Error.', 'danger');
      errorMessage = "Please fill in ";
    }
  }

  savePage() {
    var errorMessage = "Please fill in ";
    let obj = [];
    let obj2=[];

    this.formDesign.forEach(field => {
      if (field.groupGUID !== "" && field.groupGUID !== "string" && field.fieldType.value !== "repeatgroup" && field.fieldType.value === "section" && field.fieldType.value !== "subSection" && field.fieldType.value !== "PageTitle") {
        let sectionValues = field.groupGUID;
        sectionValues.forEach(element => {
          element.listValue = "";
          if (element.fieldType.value === "link multi select") {
            let val = element.data;
            let s = "";
            val.forEach(listValue => {
              s += listValue.name + ","
            });
            element.data = s;
          }
          if (element.groupGUID !== "" && element.groupGUID !== "string" && element.fieldType.value !== "repeatgroup" && element.fieldType.value === "group" && element.fieldType.value !== "subSection" && element.fieldType.value !== "PageTitle") {
            let groupValues = element.groupGUID;
            groupValues.forEach(e => {
              if (e.fieldValidations[0].isRequired === true && element.isAssigned===1 && e.data === " ") {
                errorMessage = errorMessage + e.questionName + ",";
              }
              if (e.parentFieldName === element.groupGUID) {
                e.groupGUID = "";
              }
              e.listValue = "";
              if (e.fieldType.value === "link multi select") {
                let val = e.data;
                let s = "";
                val.forEach(listValue => {
                  s += listValue.name + ","
                });
                e.data = s;
              }
              obj.push(e);
              element.groupGUID = "";
              element.listValue = "";
            });
          }
          else {
            element.groupGUID = "";
            if (element.fieldValidations[0].isRequired === true && element.isAssigned===1 && element.data === " ") {
              errorMessage = errorMessage + element.questionName + ",";
            }
          }
          obj.push(element);
        });
      }
      else if (field.groupGUID !== "" && field.groupGUID !== "string" && field.fieldType.value !== "repeatgroup" && field.fieldType.value === "group" && field.fieldType.value !== "subSection" && field.fieldType.value !== "PageTitle" && field.parentFieldName === "") {
        let groupValues = field.groupGUID;
        groupValues.forEach(e => {
          e.listValue = "";
          if (e.fieldType.value === "link multi select") {
            let val = e.data;
            let s = "";
            val.forEach(listValue => {
              s += listValue.name + ","
            });
            e.data = s;
          }
          e.groupGUID = "";
          if (e.fieldValidations[0].isRequired === true && e.isAssigned===1  && e.data === " ") {
            errorMessage = errorMessage + e.questionName + ",";
          }
          obj.push(e);
        });
      }
      else {
        if (field.parentFieldName === "" && field.groupGUID === "string") {
          field.listValue = "";
          field.groupGUID = "";
          if (field.fieldType.value === "link multi select") {
            let val = field.data;
            let s = "";
            val.forEach(listValue => {
              s += listValue.name + ","
            });
            field.data = s;
          }
          obj.push(field);
        }
        if (field.fieldValidations[0].isRequired === true && field.isAssigned===1 && field.data === " ") {
          errorMessage = errorMessage + field.questionName + ","
        }
      }

    });

    this.oldFormDesign.forEach(field => {
      if (field.groupGUID !== "" && field.groupGUID !== "string" && field.fieldType.value !== "repeatgroup" && field.fieldType.value === "section" && field.fieldType.value !== "subSection" && field.fieldType.value !== "PageTitle") {
        let sectionValues = field.groupGUID;
        sectionValues.forEach(element => {
          element.listValue = "";
          if (element.fieldType.value === "link multi select") {
            let val = element.data;
            let s = "";
            val.forEach(listValue => {
              s += listValue.name + ","
            });
            element.data = s;
          }
          if (element.groupGUID !== "" && element.groupGUID !== "string" && element.fieldType.value !== "repeatgroup" && element.fieldType.value === "group" && element.fieldType.value !== "subSection" && element.fieldType.value !== "PageTitle") {
            let groupValues = element.groupGUID;
            groupValues.forEach(e => {
              if (e.fieldValidations[0].isRequired === true && element.isAssigned===1 && e.data === " ") {
                errorMessage = errorMessage + e.questionName + ",";
              }
              if (e.parentFieldName === element.groupGUID) {
                e.groupGUID = "";
              }
              e.listValue = "";
              if (e.fieldType.value === "link multi select") {
                let val = e.data;
                let s = "";
                val.forEach(listValue => {
                  s += listValue.name + ","
                });
                e.data = s;
              }
              obj2.push(e);
              element.groupGUID = "";
              element.listValue = "";
            });
          }
          else {
            element.groupGUID = "";
            if (element.fieldValidations[0].isRequired === true && element.isAssigned===1 && element.data === " ") {
              errorMessage = errorMessage + element.questionName + ",";
            }
          }
          obj2.push(element);
        });
      }
      else if (field.groupGUID !== "" && field.groupGUID !== "string" && field.fieldType.value !== "repeatgroup" && field.fieldType.value === "group" && field.fieldType.value !== "subSection" && field.fieldType.value !== "PageTitle" && field.parentFieldName === "") {
        let groupValues = field.groupGUID;
        groupValues.forEach(e => {
          e.listValue = "";
          if (e.fieldType.value === "link multi select") {
            let val = e.data;
            let s = "";
            val.forEach(listValue => {
              s += listValue.name + ","
            });
            e.data = s;
          }
          e.groupGUID = "";
          if (e.fieldValidations[0].isRequired === true && e.isAssigned===1  && e.data === " ") {
            errorMessage = errorMessage + e.questionName + ",";
          }
          obj2.push(e);
        });
      }
      else {
        if (field.parentFieldName === "" && field.groupGUID === "string") {
          field.listValue = "";
          field.groupGUID = "";
          if (field.fieldType.value === "link multi select") {
            let val = field.data;
            let s = "";
            val.forEach(listValue => {
              s += listValue.name + ","
            });
            field.data = s;
          }
          obj2.push(field);
        }
        if (field.fieldValidations[0].isRequired === true && field.isAssigned===1 && field.data === " ") {
          errorMessage = errorMessage + field.questionName + ","
        }
      }

    });

    if (errorMessage === "Please fill in ") {
      if (this.formData.state === 'add') {
        this.service.saveFormMetadata(this.formData.formCaptureID, obj, this.userDetail.formData.userID).subscribe(res => {
          let pg = this.currentPage.pageNumber;
          let pageStatus = {
            "userID": this.userDetail.formData.userID,
            "pageNumber": (parseInt(this.currentPage.pageNumber) + 1).toString(),
            "formCaptureID": this.formData.formCaptureID,
            "pageGUID": this.currentPage.pageGUID
          }
          this.service.modifyPageStatus(this.formData.formCaptureID, this.currentPage.pageGUID, pageStatus).subscribe(result => {
            this.showNotification('top', 'center', 'Page data has been saved successfully!', '', 'success');
            this.getDesignPerPage(this.currentPage.pageGUID);
            //this.getDesignPerPageHistory(this.currentPage.pageGUID);
            this.currentPage.color = "green";
            this.formData.state = 'edit';
          });
        });
      }
      else {        
          this.service.UpdateFormMetadata(this.formData.formCaptureID, obj, this.userDetail.formData.userID).subscribe(res => {
            this.service.FormHistory(this.formData.formCaptureID, this.IndicatorData, obj2).subscribe(result => {
            let pg = this.currentPage.pageNumber;
            let pageStatus = {
              "userID": this.userDetail.formData.userID,
              "pageNumber": (parseInt(this.currentPage.pageNumber) + 1).toString(),
              "formCaptureID": this.formData.formCaptureID,
              "pageGUID": this.currentPage.pageGUID
            }
            this.service.modifyPageStatus(this.formData.formCaptureID, this.currentPage.pageGUID, pageStatus).subscribe(result => {
              this.showNotification('top', 'center', 'Page data has been saved successfully!', '', 'success');
              //this.getDesignPerPage(this.currentPage.pageGUID);
              //this.getDesignPerPageHistory(this.currentPage.pageGUID);
              this.currentPage.color = "green";
              this.formData.state = 'edit';
            });
          });
        });
      }
    }
    else {
      this.showNotification('top', 'center', errorMessage, 'Error.', 'danger');
      errorMessage = "Please fill in ";
    }
  }

  goToPage(page: any) {
    this.currentPage = page;
    this.pageStatus = this.currentPage.name;
    this.getDesignPerPage(page.pageGUID);
    //this.getDesignPerPageHistory(this.currentPage.pageGUID);
  }

  closePopup() {
    this.dialogRef.close();
  }

  nextPage() {
    var errorMessage = "Please fill in ";
    let obj = [];
    this.formDesign.forEach(field => {
      if (field.groupGUID !== "" && field.groupGUID !== "string" && field.fieldType.value !== "repeatgroup" && field.fieldType.value === "section" && field.fieldType.value !== "subSection" && field.fieldType.value !== "PageTitle") {
        let sectionValues = field.groupGUID;
        sectionValues.forEach(element => {
          element.listValue = "";
          if (element.fieldType.value === "link multi select") {
            let val = element.data;
            let s = "";
            val.forEach(listValue => {
              s += listValue.name + ","
            });
            element.data = s;
          }
          if (element.groupGUID !== "" && element.groupGUID !== "string" && element.fieldType.value !== "repeatgroup" && element.fieldType.value === "group" && element.fieldType.value !== "subSection" && element.fieldType.value !== "PageTitle") {
            let groupValues = element.groupGUID;
            groupValues.forEach(e => {
              if (e.fieldValidations[0].isRequired === true && e.isAssigned===1 && e.data === " ") {
                errorMessage = errorMessage + e.questionName + ",";
              }
              if (e.parentFieldName === element.groupGUID) {
                e.groupGUID = "";
              }
              e.listValue = "";
              if (e.fieldType.value === "link multi select") {
                let val = e.data;
                let s = "";
                val.forEach(listValue => {
                  s += listValue.name + ","
                });
                e.data = s;
              }
              obj.push(e);
              element.groupGUID = "";
              element.listValue = "";
            });
          }
          else {
            element.groupGUID = "";
            if (element.fieldValidations[0].isRequired === true && element.isAssigned===1 && element.data === " ") {
              errorMessage = errorMessage + element.questionName + ",";
            }
          }
          obj.push(element);
        });
      }
      else if (field.groupGUID !== "" && field.groupGUID !== "string" && field.fieldType.value !== "repeatgroup" && field.fieldType.value === "group" && field.fieldType.value !== "subSection" && field.fieldType.value !== "PageTitle" && field.parentFieldName === "") {
        let groupValues = field.groupGUID;
        groupValues.forEach(e => {
          e.listValue = "";
          if (e.fieldType.value === "link multi select") {
            let val = e.data;
            let s = "";
            val.forEach(listValue => {
              s += listValue.name + ","
            });
            e.data = s;
          }
          e.groupGUID = "";
          if (e.fieldValidations[0].isRequired === true && e.isAssigned===1 && e.data === " ") {
            errorMessage = errorMessage + e.questionName + ",";
          }
          obj.push(e);
        });
      }
      else {
        if (field.parentFieldName === "" && field.groupGUID === "string") {
          field.listValue = "";
          field.groupGUID = "";
          if (field.fieldType.value === "link multi select") {
            let val = field.data;
            let s = "";
            val.forEach(listValue => {
              s += listValue.name + ","
            });
            field.data = s;
          }
          obj.push(field);
        }
        if (field.fieldValidations[0].isRequired === true && field.isAssigned===1&& field.data === " ") {
          errorMessage = errorMessage + field.questionName + ","
        }
      }

    });
    if (errorMessage === "Please fill in ") {
      if (this.formData.state === 'add') {
        this.service.saveFormMetadata(this.formData.formCaptureID, obj,this.userDetail.formData.userID).subscribe(res => {
          let pg = this.currentPage.pageNumber;
          let pageStatus = {
            "userID": this.userDetail.formData.userID,
            "pageNumber": (parseInt(this.currentPage.pageNumber) + 1).toString(),
            "formCaptureID": this.formData.formCaptureID,
            "pageGUID": this.currentPage.pageGUID
          }
          this.service.modifyPageStatus(this.formData.formCaptureID, this.currentPage.pageGUID, pageStatus).subscribe(result => {
            this.showNotification('top', 'center', 'Page data has been saved successfully!', '', 'success');
            this.currentPage.color = "green";
            this.formData.state = 'edit';
            var index = -1;
            var val = this.currentPage;
            var filteredObj = this.pages.find(function (item, i) {
              if (item === val) {
                index = i;
                return i;
              }
            });
            if ((index !== -1) && ((index + 1) !== Object.keys(this.pages).length)) {
              this.currentPage = this.pages[index + 1];
              this.pageStatus = this.currentPage.name;
              this.getDesignPerPage(this.currentPage.pageGUID);
              //this.getDesignPerPageHistory(this.currentPage.pageGUID);
            }
            else {
              this.showNotification('top', 'center', 'There are no more pages for this form!', '', 'warning');
            };
          });
        });
      }
      else {
        this.service.UpdateFormMetadata(this.formData.formCaptureID, obj,this.userDetail.formData.userID).subscribe(res => {
          this.showNotification('top', 'center', 'Page data has been saved successfully!', '', 'success');
          let pg = this.currentPage.pageNumber;
          let pageStatus = {
            "userID": this.userDetail.formData.userID,
            "pageNumber": (parseInt(this.currentPage.pageNumber) + 1).toString(),
            "formCaptureID": this.formData.formCaptureID,
            "pageGUID": this.currentPage.pageGUID
          }
          this.service.modifyPageStatus(this.formData.formCaptureID, this.currentPage.pageGUID, pageStatus).subscribe(result => {
            this.currentPage.color = "green";
            this.formData.state = 'edit';
            var index = -1;
            var val = this.currentPage;
            var filteredObj = this.pages.find(function (item, i) {
              if (item === val) {
                index = i;
                return i;
              }
            });
            if ((index !== -1) && ((index + 1) !== Object.keys(this.pages).length)) {
              this.currentPage = this.pages[index + 1];
              this.pageStatus = this.currentPage.name;
              this.getDesignPerPage(this.currentPage.pageGUID);
              //this.getDesignPerPageHistory(this.currentPage.pageGUID);
            }
            else {
              this.showNotification('top', 'center', 'There are no more pages for this form!', '', 'warning');
            }
          });
        });
      }
    }
    else {
      this.showNotification('top', 'center', errorMessage, 'Error.', 'danger');
      errorMessage = "Please fill in ";
    }
  }

  refreshPageList() {
    this.service.getFormPages(this.formData.formID).subscribe(data => {
      this.pages = data;
      this.getDesignPerPage(this.pages[0].pageGUID);
      this.getDesignPerPageHistory(this.pages[0].pageGUID);
      this.currentPage = this.pages[0];
      this.firstPage = this.pages[0];

      this.lastPage = Object.keys(this.pages).length;
      this.pages.forEach((page, index) => {
        this.service.getPageStatus(this.formData.formCaptureID, page.pageGUID).subscribe(val => {
          page["pageNumber"] = index;
          page["color"] = val;
        });
      });
      this.pageStatus = this.pages[0].name;
    });
  }

  refreshAttachmentList() {
    this.service.getFormAttachments(this.formData.formCaptureID).subscribe(data => {
      this.attachmentList = data;
      this.totalNumAttachments = Object.keys(this.attachmentList).length;
    });
  }

  refreshPhotoList() {
    this.service.getFormPhotos(this.formData.formCaptureID).subscribe(data => {
      this.photoList = data;
      this.totalNumPhotos = Object.keys(this.photoList).length
    });
  }

  refreshCommentList() {
    this.service.getFormComments(this.formData.formCaptureID).subscribe(data => {
      this.commentList = data;
      this.totalNumComments = Object.keys(this.commentList).length
    });
  }

  compareFn(option1: lexdata, option2: lexdata) {
    return option1 && option2 ? option1.value === option2.value : option1 === option2;
  }

  setSubSectionValue(fieldName: any, value: any) {
    this.formDesign.forEach(element => {
      if (element.fieldName === fieldName) {
        element["data"] = value;
      }
    });
  }

  getDesignPerPage(pageGUID: any) {
    this.spinner.show();
    localStorage.setItem('cloneNumberForEdit', "0");
    this.service.GetFieldsForApprovalPerPage(this.IndicatorData, pageGUID).subscribe(formFields => {
      this.formDesign = formFields;
      this.formDesign.forEach((element, index) => {
        element.fieldStyles[0].height = Math.ceil(parseInt(element.fieldStyles[0].height) / 23.2); //23.2 is the size of one row in textarea
        if (element.fieldType.value === "repeatgroup") {
          this.service.getGroupTableData(element.groupGUID, this.formData.formCaptureID).subscribe(resultant => {
            element["groupTableList"] = resultant;
          });
        }

        if (this.formData.state === 'add') {

          element["data"] = "";

          if (element.listValue !== "") {
            this.formDesign[index].listValue = this.splitString(element.listValue);
          }

          if (element.groupGUID !== "" && element.groupGUID !== "string" && element.parentFieldName === "") {
            let children: any[] = [];

            this.service.getFieldsInGroup(element.groupGUID).subscribe(groupFields => {
              children = groupFields;

              children.forEach((field, i) => {

                field.fieldStyles[0].height = Math.ceil(parseInt(field.fieldStyles[0].height) / 23.2);

                if (field.fieldType.value === "repeatgroup") {
                  this.service.getGroupTableData(field.groupGUID, this.formData.formCaptureID).subscribe(resultant => {
                    field["groupTableList"] = resultant;
                  });
                }

                if (field.listValue !== "") {
                  children[i].listValue = this.splitString(field.listValue);
                }

                if (field.groupGUID !== "" && field.groupGUID !== "string") {
                  let subChildren: any[] = [];
                  this.service.getFieldsInGroup(field.groupGUID).subscribe(result => {
                    subChildren = result;
                    subChildren.forEach((subField, j) => {
                      subField.fieldStyles[0].height = Math.ceil(parseInt(subField.fieldStyles[0].height) / 23.2);
                      if (subField.fieldType.value === "repeatgroup") {
                        this.service.getGroupTableData(subField.groupGUID, this.formData.formCaptureID).subscribe(resultant => {
                          subField["groupTableList"] = resultant;
                        });
                      }
                      if (subField.listValue !== "") {
                        subChildren[j].listValue = this.splitString(subField.listValue);
                      }
                    });
                    children[i].groupGUID = subChildren;
                  });
                }
              });
              this.formDesign[index].groupGUID = children;
            });
          }
        }

        if (this.formData.state === 'edit') {
          if (element.fieldType.value !== "subSection" && element.fieldType.value !== "section" && element.fieldType.value !== "group" && element.fieldType.value !== "repeatgroup" && element.fieldType.value !== "attachment" && element.fieldType.value !== "PageTitle" && element.parentFieldName === "") {
            this.service.getMetadataValue(pageGUID, element.fieldName, this.formData.formCaptureID).subscribe(res => {
              if (element.fieldType.value === "checkbox") {
                element["data"] = Boolean(res);
              }
              else if(element.fieldType.value === "link multi select"){
                element["data"] = this.splitString(res) as Array<string>;
              }
              else{
                element["data"] = res;
              }
            });
          }

          if (element.listValue !== "") {
              this.formDesign[index].listValue = this.splitString(element.listValue);
          }

          if (element.fieldType.value === "repeatgroup") {
            this.service.getGroupTableData(element.groupGUID, this.formData.formCaptureID).subscribe(resultant => {
              element["groupTableList"] = resultant;
            });
          }

          if (element.groupGUID !== "" && element.groupGUID !== "string" && element.parentFieldName === "") {
            let children: any[] = [];

            this.service.getFieldsInGroup(element.groupGUID).subscribe(kids => {
              children = kids.filter(item1 => this.formDesign.some(item2 => item1.fieldID === item2.fieldID));
              children.forEach((field, i) => {
                if (field.fieldType.value !== "subSection" && field.fieldType.value !== "section" && field.fieldType.value !== "group" && field.fieldType.value !== "repeatgroup" && field.fieldType.value !== "attachment" && field.fieldType.value !== "PageTitle") {
                  this.service.getGroupType(field.parentFieldName).subscribe(name => {
                    if (name === "group" || name === "section") {
                      this.service.getMetadataValue(pageGUID, field.fieldName, this.formData.formCaptureID).subscribe(res => {
                        if (field.fieldType.value === "checkbox") {
                          field["data"] = Boolean(JSON.parse(res));
                        }
                        else if(field.fieldType.value === "link multi select"){
                          field["data"] = this.splitString(res) as Array<string>;
                        }
                        else{
                          field["data"] = res;
                        }
                      });
                    }
                  });        
                }

                field.fieldStyles[0].height = Math.ceil(parseInt(field.fieldStyles[0].height) / 23.2);

                if (field.fieldType.value === "repeatgroup") {
                  this.service.getGroupTableData(field.groupGUID, this.formData.formCaptureID).subscribe(resultant => {
                    field["groupTableList"] = resultant;
                  });
                }

                if (field.listValue !== "") {
                  children[i].listValue = this.splitString(field.listValue);
                }

                if (field.groupGUID !== "" && field.groupGUID !== "string") {
                  let subChildren: any[] = [];
                  this.service.getFieldsInGroup(field.groupGUID).subscribe(result => {
                    subChildren = result;
                    subChildren.forEach((subField, j) => {
                      if (subField.fieldType.value !== "subSection" && subField.fieldType.value !== "section" && subField.fieldType.value !== "group" && subField.fieldType.value !== "repeatgroup" && subField.fieldType.value !== "attachment" && subField.fieldType.value !== "PageTitle") {
                        this.service.getGroupType(subField.parentFieldName).subscribe(name => {
                          if (name === "group" || name === "section") {
                            this.service.getMetadataValue(pageGUID, subField.fieldName, this.formData.formCaptureID).subscribe(res => {
                              if (subField.fieldType.value === "checkbox") {
                                subField["data"] = Boolean(JSON.parse(res));
                              }
                              else if(subField.fieldType.value === "link multi select"){
                                subField["data"] = this.splitString(res) as Array<string>;
                              }
                              else{
                                subField["data"] = res;
                              }
                            });
                          }
                        });
                      }
                      subField.fieldStyles[0].height = Math.ceil(parseInt(subField.fieldStyles[0].height) / 23.2);
                      if (subField.fieldType.value === "repeatgroup") {
                        this.service.getGroupTableData(subField.groupGUID, this.formData.formCaptureID).subscribe(resultant => {
                          subField["groupTableList"] = resultant;
                        });
                      }
                      if (subField.listValue !== "") {
                        subChildren[j].listValue = this.splitString(subField.listValue);
                      }
                    });
                    children[i].groupGUID = subChildren;
                  });
                }
              });
              this.formDesign[index].groupGUID = children;
            });
          }
        }
        this.spinner.hide();
      }); 
    });
  }

  getDesignPerPageHistory(pageGUID: any) {
    this.service.GetFieldsForApprovalPerPage(this.IndicatorData, pageGUID).subscribe(formFields => {
      this.oldFormDesign = formFields;
      this.oldFormDesign.forEach((element, index) => {
        element.fieldStyles[0].height = Math.ceil(parseInt(element.fieldStyles[0].height) / 23.2); //23.2 is the size of one row in textarea
        if (element.fieldType.value === "repeatgroup") {
          this.service.getGroupTableData(element.groupGUID, this.formData.formCaptureID).subscribe(resultant => {
            element["groupTableList"] = resultant;
          });
        }

        if (this.formData.state === 'edit') {
          if (element.fieldType.value !== "subSection" && element.fieldType.value !== "section" && element.fieldType.value !== "group" && element.fieldType.value !== "repeatgroup" && element.fieldType.value !== "attachment" && element.fieldType.value !== "PageTitle" && element.parentFieldName === "") {
            this.service.getMetadataValue(pageGUID, element.fieldName, this.formData.formCaptureID).subscribe(res => {
              if (element.fieldType.value === "checkbox") {
                element["data"] = Boolean(res);
              }
              else if(element.fieldType.value === "link multi select"){
                element["data"] = this.splitString(res) as Array<string>;
              }
              else{
                element["data"] = res;
              }
            });
          }

          if (element.listValue !== "") {
              this.oldFormDesign[index].listValue = this.splitString(element.listValue);
          }

          if (element.fieldType.value === "repeatgroup") {
            this.service.getGroupTableData(element.groupGUID, this.formData.formCaptureID).subscribe(resultant => {
              element["groupTableList"] = resultant;
            });
          }

          if (element.groupGUID !== "" && element.groupGUID !== "string" && element.parentFieldName === "") {
            let children: any[] = [];

            this.service.getFieldsInGroup(element.groupGUID).subscribe(kids => {
              children = kids.filter(item1 => this.formDesign.some(item2 => item1.fieldID === item2.fieldID));
              children.forEach((field, i) => {
                if (field.fieldType.value !== "subSection" && field.fieldType.value !== "section" && field.fieldType.value !== "group" && field.fieldType.value !== "repeatgroup" && field.fieldType.value !== "attachment" && field.fieldType.value !== "PageTitle") {
                  this.service.getGroupType(field.parentFieldName).subscribe(name => {
                    if (name === "group" || name === "section") {
                      this.service.getMetadataValue(pageGUID, field.fieldName, this.formData.formCaptureID).subscribe(res => {
                        if (field.fieldType.value === "checkbox") {
                          field["data"] = Boolean(JSON.parse(res));
                        }
                        else if(field.fieldType.value === "link multi select"){
                          field["data"] = this.splitString(res) as Array<string>;
                        }
                        else{
                          field["data"] = res;
                        }
                      });
                    }
                  });        
                }

                field.fieldStyles[0].height = Math.ceil(parseInt(field.fieldStyles[0].height) / 23.2);

                if (field.fieldType.value === "repeatgroup") {
                  this.service.getGroupTableData(field.groupGUID, this.formData.formCaptureID).subscribe(resultant => {
                    field["groupTableList"] = resultant;
                  });
                }

                if (field.listValue !== "") {
                  children[i].listValue = this.splitString(field.listValue);
                }

                if (field.groupGUID !== "" && field.groupGUID !== "string") {
                  let subChildren: any[] = [];
                  this.service.getFieldsInGroup(field.groupGUID).subscribe(result => {
                    subChildren = result;
                    subChildren.forEach((subField, j) => {
                      if (subField.fieldType.value !== "subSection" && subField.fieldType.value !== "section" && subField.fieldType.value !== "group" && subField.fieldType.value !== "repeatgroup" && subField.fieldType.value !== "attachment" && subField.fieldType.value !== "PageTitle") {
                        this.service.getGroupType(subField.parentFieldName).subscribe(name => {
                          if (name === "group" || name === "section") {
                            this.service.getMetadataValue(pageGUID, subField.fieldName, this.formData.formCaptureID).subscribe(res => {
                              if (subField.fieldType.value === "checkbox") {
                                subField["data"] = Boolean(JSON.parse(res));
                              }
                              else if(subField.fieldType.value === "link multi select"){
                                subField["data"] = this.splitString(res) as Array<string>;
                              }
                              else{
                                subField["data"] = res;
                              }
                            });
                          }
                        });
                      }
                      subField.fieldStyles[0].height = Math.ceil(parseInt(subField.fieldStyles[0].height) / 23.2);
                      if (subField.fieldType.value === "repeatgroup") {
                        this.service.getGroupTableData(subField.groupGUID, this.formData.formCaptureID).subscribe(resultant => {
                          subField["groupTableList"] = resultant;
                        });
                      }
                      if (subField.listValue !== "") {
                        subChildren[j].listValue = this.splitString(subField.listValue);
                      }
                    });
                    children[i].groupGUID = subChildren;
                  });
                }
              });
              this.oldFormDesign[index].groupGUID = children;
            });
          }
        }
      }); 
    });
  }

  //#endregion

  //#region group methods
  addRepeat(data: any) {
    this.spinner.show();
    if (localStorage.getItem('cloneNumberForEdit') === "0") {
      data.forEach(field => {
        field.listValue = "";
       if (field.fieldType.value === "link multi select") {
          let val = field.data;
          let s = "";
          val.forEach(listValue => {
            s += listValue.name + ","
          });
          field.data = s;
        }
      });
      this.service.saveGroupMetadata(this.formData.formCaptureID, data[0].parentFieldName, data,this.userDetail.formData.userID).subscribe(res => {
        this.showNotification('top', 'center', 'Repeat data has been saved successfully!', '', 'success');
        localStorage.setItem('cloneNumberForEdit', "0");
        this.spinner.hide();
        this.getDesignPerPage(this.currentPage.pageGUID);
        //this.getDesignPerPageHistory(this.currentPage.pageGUID);
      },
        error => {
          this.showNotification('top', 'center', 'Error saving repeat data, please try again', '', 'danger');
          this.spinner.hide();
        });
    }
    else {
      data.forEach(field => {
        field.listValue = "";
        if (field.fieldType.value === "link multi select") {
          let val = field.data;
          let s = "";
          val.forEach(listValue => {
            s += listValue.name + ","
          });
          field.data = s;
        }
      });
      this.service.UpdateGroupMetadata(this.formData.formCaptureID, data[0].parentFieldName, localStorage.getItem('cloneNumberForEdit'), data,this.userDetail.formData.userID).subscribe(res => {
        this.showNotification('top', 'center', 'Repeat data has been updated successfully!', '', 'success');
        localStorage.setItem('cloneNumberForEdit', "0");
        this.HighlightRow = -1;
        this.spinner.hide();
        this.getDesignPerPage(this.currentPage.pageGUID);
        //this.getDesignPerPageHistory(this.currentPage.pageGUID);
      },
        error => {
          this.showNotification('top', 'center', 'Error updating repeat data, please try again', '', 'danger');
          this.spinner.hide();
        });
    }
  }

  editRepeat(data: any, cloneNum: any, groupGUID: any) {
    localStorage.setItem('cloneNumberForEdit', cloneNum);
    data.forEach(field => {
      if (field.fieldType.value !== "subSection") {
        this.service.getMetadataValuePerGroup(groupGUID, field.fieldName, this.formData.formCaptureID, cloneNum).subscribe(res => {
          if (field.listValue !== "") {
            field["data"] = this.splitString(field["data"]);
          }
          else {
            field["data"] = res;
          }
        });
      }
    });
  }

  deleteClone(cloneNum: any, groupGUID: any) {
    Swal.fire({
      title: "<h5 style='color:white;font-weight:400'> Are you sure want to remove this repeat data? </h5>",
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
        this.service.deleteClone(groupGUID, this.formData.formCaptureID, cloneNum).subscribe(res => {
          this.showNotification('top', 'center', 'Repeat data has been deleted successfully!', '', 'success');
          this.getDesignPerPage(this.currentPage.pageGUID);
          //this.getDesignPerPageHistory(this.currentPage.pageGUID);
        });
      }
    })
  }
  //#endregion

  splitString(val: string): any {
    if (val !== "" && val !== "undefined" && val !== undefined) {
      let values = val.split(",");
      let obj2: any = [];
      values.forEach((listV, index) => {
        let obj = {
          name: listV,
          value: listV
        }
        obj2.push(obj);
      });
      return obj2;
    }
    else {
      return [];
    }
  }

  savePad(item: any) {
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

  isString(value: any) {
    return typeof value === 'string' || value instanceof String;
  }

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  clickDownload(data: any) {
    const file = new Blob([this.base64toBlob(data.attachmentData, data.contentType)], { type: data.contentType });
    FileSaver.saveAs(file, data.fileName + data.fileExtention);
  }

  onChange(event) {
    this.file = <File>event.target.files[0];
    if (this.file.size < 20971520) {
      this.fileAttr = this.file.name;
      let reader = new FileReader();
      reader.onload = function (readerEvt: any) {
        var arrayBuffer = readerEvt.target.result.toString().split('base64,')[1];
        document.querySelector('#hidden_upload_item').innerHTML = arrayBuffer;
        //this.Proceed();
      }.bind(this);
      reader.readAsDataURL(this.file);
    }
    else {
      this.showNotification('top', 'center', 'File exceeds maximum size of 20MB,Please upload a file of 20MB or less', '', 'danger');
      this.file = null;
    }
  }

  onUpload() {
    let fileName = "";
    if (localStorage.getItem('fieldNameAttach') !== null || localStorage.getItem('fieldNameAttach') !== undefined) {
      fileName = localStorage.getItem('fieldNameAttach').toString();
    }
    if (fileName !== "") {
      if (this.file !== null) {
        this.spinner.show();
        var item = document.querySelector('#hidden_upload_item').innerHTML;
        this.service.getFormAttachCount(fileName, this.formData.formCaptureID).subscribe(res => {
          let obj = {
            "attachmentID": 0,
            "pgcFormGUID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "createdTS": "2022-01-21T09:19:01.931Z",
            "fileName": fileName + '_' + res,
            "fileDesc": this.file.name.substring(0, this.file.name.indexOf('.')),
            "fileExtention": "." + this.file.name.split('.').pop(),
            "fileSize": this.file.size,
            "contentType": this.file.type,
            "attachmentData": item,
            "userID": this.userDetail.formData.userID,
            "formCaptureID": this.formData.formCaptureID
          }
          this.service.addFormAttachments(obj).subscribe(res => {
            this.showNotification('top', 'center', 'Attachment has been saved successfully!', '', 'success');
            this.file = null;
            this.fileAttr = 'Choose File(Max Size:20MB)';
            //this.fileInput = ElementRef;
            this.refreshAttachmentList();
            localStorage.setItem('fieldNameAttach', "");
            localStorage.setItem('fieldNamePhoto', "");
            this.getDesignPerPage(this.currentPage.pageGUID);
            //this.getDesignPerPageHistory(this.currentPage.pageGUID);
            this.spinner.hide();
          });
        });
      }
      else {
        this.showNotification('top', 'center', 'Select a file before uploading!', '', 'danger');
      }
    }
    else {
      if (this.file !== null) {
        this.spinner.show();
        var item = document.querySelector('#hidden_upload_item').innerHTML;
        let obj = {
          "attachmentID": 0,
          "pgcFormGUID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "createdTS": "2022-01-21T09:19:01.931Z",
          "fileName": this.file.name.substring(0, this.file.name.indexOf('.')),
          "fileDesc": this.file.name.substring(0, this.file.name.indexOf('.')),
          "fileExtention": "." + this.file.name.split('.').pop(),
          "fileSize": this.file.size,
          "contentType": this.file.type,
          "attachmentData": item,
          "userID": this.userDetail.formData.userID,
          "formCaptureID": this.formData.formCaptureID
        }
        this.service.addFormAttachments(obj).subscribe(res => {
          this.showNotification('top', 'center', 'Attachment has been saved successfully!', '', 'success');
          this.file = null;
          this.fileAttr = 'Choose File(Max Size:20MB)';
          // this.fileInput = null;
          this.refreshAttachmentList();
          localStorage.setItem('fieldNameAttach', "");
          localStorage.setItem('fieldNamePhoto', "");
          this.getDesignPerPage(this.currentPage.pageGUID);
          //this.getDesignPerPageHistory(this.currentPage.pageGUID);
          this.spinner.hide();
        });
      }
      else {
        this.showNotification('top', 'center', 'Select a file before uploading!', '', 'danger');
      }
    }

  }

  clickDownloadPhoto(data: any) {
    console.log(data)
    alert(data.photoDesc.split('.').pop());
    const file = new Blob([this.base64toBlob(data.photo, 'image/' + data.photoDesc.split('.').pop())], { type: 'image/' + data.photoDesc.split('.').pop()});
    FileSaver.saveAs(file, data.postedFileName);
  }

  onChangePhoto(event) {
    this.photoFile = <File>event.target.files[0];
    if (this.photoFile.size < 4194304) {
      this.photoFileAttr = this.photoFile.name;
      let reader = new FileReader();
      reader.onload = function (readerEvt: any) {
        var arrayBuffer = readerEvt.target.result.toString().split('base64,')[1];
        document.querySelector('#hidden_upload_itemPhoto2').innerHTML = arrayBuffer;
        //this.Proceed();
      }.bind(this);
      reader.readAsDataURL(this.photoFile);
    }
    else {
      this.showNotification('top', 'center', 'Photo exceeds maximum size of 4mb,Please upload a photo of 4mb or less', '', 'danger');
      this.photoFile = null;
    }
  }

  onUploadPhoto() {
    let photoName = "";
    if (localStorage.getItem('fieldNamePhoto') !== null || localStorage.getItem('fieldNamePhoto') !== undefined) {
      photoName = localStorage.getItem('fieldNamePhoto').toString();
    }
    if (photoName !== "") {
      var fileType=this.photoFile.name.split('.').pop();
     if(fileType=='jpg'){
        fileType='jpeg';
      }
      if (this.photoFile !== null) {
        this.spinner.show();
        var item = document.querySelector('#hidden_upload_itemPhoto2').innerHTML;
        this.service.getFormPhotoCount(photoName, this.formData.formCaptureID).subscribe(res => {
          let obj = {
            "pgcFormGUID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "photoGUID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "formDetailID": "0",
            "timestamp": "2022-01-21T13:29:23.713Z",
            "photo": item,
            "fileName": "",
            "postedFileName": photoName + '_' + res,
            "createDate": "string",
            "photoDesc": "."+fileType,
            "userID": this.userDetail.formData.userID,
            "formCaptureID": this.formData.formCaptureID
          }
          this.service.addFormPhotos(obj).subscribe(res => {
            this.showNotification('top', 'center', 'Photo has been saved successfully!', '', 'success');
            this.photoFile = null;
            this.photoFileAttr = 'Choose Photo(Max Size:4MB)';
            //this.photoInput = null;
            this.refreshPhotoList();
            localStorage.setItem('fieldNameAttach', "");
            localStorage.setItem('fieldNamePhoto', "");
            this.getDesignPerPage(this.currentPage.pageGUID);
            //this.getDesignPerPageHistory(this.currentPage.pageGUID);
            this.spinner.hide();
          });
        })
      }
      else {
        this.showNotification('top', 'center', 'Select a photo before uploading', '', 'danger');
      }
    }
    else {
      if (this.photoFile !== null) {
        var fileType=this.photoFile.name.split('.').pop();
        if(fileType=='jpg'){
          fileType='jpeg';
        }
        this.spinner.show();
        var item = document.querySelector('#hidden_upload_itemPhoto2').innerHTML;
        let obj = {
          "pgcFormGUID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "photoGUID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "formDetailID": "0",
          "timestamp": "2022-01-21T13:29:23.713Z",
          "photo": item,
          "fileName": "",
          "postedFileName": this.photoFile.name.substring(0, this.photoFile.name.indexOf('.')),
          "createDate": "string",
          "photoDesc": "."+fileType,
          "userID": this.userDetail.formData.userID,
          "formCaptureID": this.formData.formCaptureID
        }
        this.service.addFormPhotos(obj).subscribe(res => {
          this.showNotification('top', 'center', 'Photo has been saved successfully!', '', 'success');
          this.photoFile = null;
          this.photoFileAttr = 'Choose Photo(Max Size:4MB)';
          //this.photoInput = null;
          this.refreshPhotoList();
          localStorage.setItem('fieldNameAttach', "");
          localStorage.setItem('fieldNamePhoto', "");
          this.getDesignPerPage(this.currentPage.pageGUID);
          //this.getDesignPerPageHistory(this.currentPage.pageGUID);
          this.spinner.hide();
        });
      }
      else {
        this.showNotification('top', 'center', 'Select a photo before uploading', '', 'danger');
      }
    }

  }

  viewPhoto(data: any) {

  }

  validateEmail(fieldName: any, email: any) {
    if (email !== "") {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(email) === false) {
        this.formDesign.forEach(element => {
          if (element.fieldName === fieldName) {
            element["data"] = "";
          }
        });
        this.showNotification('top', 'center', 'Email is invalid, please enter valid email address', '', 'danger');
      }
    }
  }

  addComment() {
    let commentName = "";
    if (localStorage.getItem('fieldNameComment') !== null || localStorage.getItem('fieldNameComment') !== undefined) {
      commentName = localStorage.getItem('fieldNameComment').toString();
    }
    if (commentName !== "") {
      if (this.addEditComment === 'Add') {
        this.spinner.show();
        let obj = {
          "commentID": 0,
          "userID": this.userDetail.formData.userID,
          "deviceFormGUID": "0FA12DB7-D725-48A9-BED2-A44C95E94F7D",
          "comment": this.formComment,
          "stepID": 0,
          "timeStamp": "2022-01-21T13:29:23.713Z",
          "formCaptureID": this.formData.formCaptureID,
          "fullName": "string",
          "LinkedTo": commentName
        }
        this.service.addFormComment(obj).subscribe(res => {
          this.showNotification('top', 'center', 'Form comment has been saved successfully!', '', 'success');
          this.formComment = '';
          this.refreshCommentList();
          localStorage.setItem('fieldNameComment', "");
          this.addEditComment = 'Add';
          this.getDesignPerPage(this.currentPage.pageGUID);
          //this.getDesignPerPageHistory(this.currentPage.pageGUID);
          this.spinner.hide();
        });
      }
      else {
        this.spinner.show();
        let obj = {
          "commentID": 0,
          "userID": this.userDetail.formData.userID,
          "deviceFormGUID": "0FA12DB7-D725-48A9-BED2-A44C95E94F7D",
          "comment": this.formComment,
          "stepID": 0,
          "timeStamp": "2022-01-21T13:29:23.713Z",
          "formCaptureID": this.formData.formCaptureID,
          "fullName": "string",
          "LinkedTo": commentName
        }
        this.service.updateFormComment(obj, this.commentID).subscribe(res => {
          this.showNotification('top', 'center', 'Form comment has been updated successfully!', '', 'success');
          this.formComment = '';
          this.refreshCommentList();
          localStorage.setItem('fieldNameComment', "");
          this.addEditComment = 'Add';
          this.HighlightRowComment = -1;
          this.getDesignPerPage(this.currentPage.pageGUID);
          //this.getDesignPerPageHistory(this.currentPage.pageGUID);
          this.spinner.hide();
        });
      }
    }
    else {
      if (this.addEditComment === 'Add') {
        this.spinner.show();
        let obj = {
          "commentID": 0,
          "userID": this.userDetail.formData.userID,
          "deviceFormGUID": "0FA12DB7-D725-48A9-BED2-A44C95E94F7D",
          "comment": this.formComment,
          "stepID": 0,
          "timeStamp": "2022-01-21T13:29:23.713Z",
          "formCaptureID": this.formData.formCaptureID,
          "fullName": "string",
          "LinkedTo": ""
        }
        this.service.addFormComment(obj).subscribe(res => {
          this.showNotification('top', 'center', 'Form comment has been saved successfully!', '', 'success');
          this.formComment = '';
          this.refreshCommentList();
          this.addEditComment = 'Add';
          localStorage.setItem('fieldNameComment', "");
          this.spinner.hide();
        });
      }
      else {
        this.spinner.show();
        let obj = {
          "commentID": 0,
          "userID": this.userDetail.formData.userID,
          "deviceFormGUID": "0FA12DB7-D725-48A9-BED2-A44C95E94F7D",
          "comment": this.formComment,
          "stepID": 0,
          "timeStamp": "2022-01-21T13:29:23.713Z",
          "formCaptureID": this.formData.formCaptureID,
          "fullName": "string",
          "LinkedTo": ""
        }
        this.service.updateFormComment(obj, this.commentID).subscribe(res => {
          this.showNotification('top', 'center', 'Form comment has been updated successfully!', '', 'success');
          this.formComment = '';
          this.refreshCommentList();
          this.addEditComment = 'Add';
          this.HighlightRowComment = -1;
          localStorage.setItem('fieldNameComment', "");
          this.spinner.hide();
        });
      }
    }

  }

  showComment(data: any) {
    this.addEditComment = 'Edit';
    this.formComment = data.comment;
    this.commentID = data.commentID;
    if (data.linkedTo !== '' || data.linkedTo !== null) {
      localStorage.setItem('fieldNameComment', data.linkedTo);
    }
    else {
      localStorage.setItem('fieldNameComment', "");
    }
  }

  deleteFile(item: any) {
    Swal.fire({
      title: "<h5 style='color:white;font-weight:400'> Are you sure want to remove this file? </h5>",
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
        this.service.DeleteFile(item.attachmentID).subscribe(data => {
          this.spinner.hide();
          this.refreshAttachmentList();
          this.showNotification('top', 'center', 'File deleted successfully!', '', 'success');
        });
      }
    })
  }

  deleteComment(item: any) {
    Swal.fire({
      title: "<h5 style='color:white;font-weight:400'> Are you sure want to remove this comment? </h5>",
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
        this.service.DeleteComment(item.commentID).subscribe(data => {
          this.spinner.hide();
          this.refreshCommentList();
          this.showNotification('top', 'center', 'Comment deleted successfully!', '', 'success');
        });
      }
    })
  }

  deletePhoto(item: any) {
    Swal.fire({
      title: "<h5 style='color:white;font-weight:400'> Are you sure want to remove this photo? </h5>",
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
        this.service.DeletePhoto(item.photoGUID).subscribe(data => {
          this.spinner.hide();
          this.refreshPhotoList();
          this.showNotification('top', 'center', 'Photo deleted successfully!', '', 'success');
        });
      }
    })
  }

  checkInfo() {
    this.formDesign.forEach(field => {
      if (field.fieldType.value === "information") {
        let info = field.calculation;
        if (info !== "") {
          var stringArray = info.split(/(\s+)/);
          stringArray.forEach(s => {
            this.formDesign.forEach(res => {
              if (res.fieldType.value === "section") {
                let sectionItems = res.groupGUID;
                sectionItems.forEach(sectionItem => {
                  if (('#' + sectionItem.fieldName) === s && (sectionItem.data !== undefined)) {
                    var re = new RegExp(s, "gi");
                    info = info.replace(re, sectionItem.data.toString());
                  }
                  if (sectionItem.fieldType.value === "group") {
                    let groupItems = sectionItem.groupGUID;
                    groupItems.forEach(groupItem => {
                      if (('#' + groupItem.fieldName.trim()) === s && (groupItem.data !== undefined)) {
                        var re = new RegExp(s, "gi");
                        info = info.replace(re, groupItem.data.toString());
                      }
                    })
                  }
                })
              }
              else {
                if (('#' + res.fieldName) === s && (res.data !== undefined)) {
                  var re = new RegExp(s, "gi");
                  info = info.replace(re, res.data.toString());
                }
              }
            });
          });
        }
        field.data = info;
      }
    });
  }

  checkForCalc() {
    this.formDesign.forEach(field => {
      if (field.fieldType.value === "calculation") {
        let calc = field.calculation;
        if (calc !== "") {
          var stringArray = calc.split(/(\s+)/);
          stringArray.forEach(num => {
            this.formDesign.forEach(res => {
              if (res.fieldType.value === "section") {
                let sectionItems = res.groupGUID;
                sectionItems.forEach(sectionItem => {
                  if ('#' + sectionItem.fieldName === num) {
                    var re = new RegExp(num, "gi");
                    if (sectionItem.data === "" || sectionItem.data === undefined) {
                      calc = calc.replace(re, "0");
                    }
                    else {
                      calc = calc.replace(re, sectionItem.data.toString());
                    }
                  }
                  if (sectionItem.fieldType.value === "group") {
                    let groupItems = sectionItem.groupGUID;
                    groupItems.forEach(groupItem => {
                      if ('#' + groupItem.fieldName === num) {
                        var re = new RegExp(num, "gi");
                        if (groupItem.data === "" || groupItem.data === undefined) {
                          calc = calc.replace(re, "0");
                        }
                        else {
                          calc = calc.replace(re, groupItem.data.toString());
                        }
                      }
                    })
                  }
                })
              }
              else {
                if ('#' + res.fieldName === num) {
                  var re = new RegExp(num, "gi");
                  if (res.data === "" || res.data === undefined) {
                    calc = calc.replace(re, "0");
                  }
                  else {
                    calc = calc.replace(re, res.data.toString());
                  }
                }
              }
            });
          });
        }
        field.data = eval(calc);
      }
    });
  }

  checkInfoInQuestionGroup(data: any) {
    data.forEach(field => {
      if (field.fieldType.value === "information") {
        let info = field.calculation;
        if (info !== "") {
          var stringArray = info.split(/(\s+)/);
          stringArray.forEach(s => {
            this.formDesign.forEach(res => {
              if (('#' + res.fieldName) === s && (res.data !== undefined)) {
                var re = new RegExp(s, "gi");
                info = info.replace(re, res.data.toString());
              }
            });
          });
        }
        field.data = info;
      }
    });
  }

  checkForCalcInQuestionGroup(data: any) {
    data.forEach(field => {
      if (field.fieldType.value === "calculation") {
        let calc = field.calculation;
        if (calc !== "") {
          var stringArray = calc.split(/(\s+)/);
          stringArray.forEach(num => {
            console.log(this.formDesign);
            data.forEach(res => {
              if ('#' + res.fieldName === num) {
                var re = new RegExp(num, "gi");
                if (res.data === "" || res.data === undefined) {
                  calc = calc.replace(re, "0");
                }
                else {
                  calc = calc.replace(re, res.data.toString());
                }
              }
            });
          });
        }
        field.data = eval(calc);
      }
    });
  }

  fieldPhoto(item: any) {
    this.tabIndex = 1;
    localStorage.setItem('fieldNamePhoto', item.questionName + '(' + item.fieldName + ')');
  }

  fieldAttachment(item: any) {
    this.tabIndex = 2;
    localStorage.setItem('fieldNameAttach', item.questionName + '(' + item.fieldName + ')');
  }

  fieldComment(item: any) {
    this.tabIndex = 3;
    localStorage.setItem('fieldNameComment', item.questionName + '(' + item.fieldName + ')');
  }
}

