import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormAddComponent } from 'src/app/form-list/form-add/form-add.component';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import Swal from 'sweetalert2'
import { merge } from 'jquery';
import { SignaturePad } from 'angular2-signaturepad';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { ignoreElements } from 'rxjs/operators';
import { UserService } from 'src/app/shared/user.service';
import { AddSignatureComponent } from '../form-capture/add-form/add-signature.component';
import { lexdata } from '../form-capture/lexdata';

declare var $: any;

export interface DialogData {
  image: any;
}

interface Item {
  text: string;
  value: number;
}

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent implements OnInit {

  panelOpenState = false;

  formDesign: any = [];

  pages: any = [];

  currentPage: any = [];

  firstPage: any = [];

  lastPage: any = [];

  formData: any = [];

  selected = -1;

  dataToSave: any = [];

  tabIndex = 0;

  formComment:string='';

  addEditComment:string='Add';

  commentID:number=0;

  public selectedValues: string = "yes";


  public displayedColumns = ['createdTS', 'fileName', 'fileDesc', 'fileExtention', 'fileSize', 'Download','DeleteFile'];
  public attachmentList :any;
  @ViewChild('attachmentPaginator',) attachmentPaginator: MatPaginator;
  totalNumAttachments: number = 0;

  public PhotoColumns = ['photo', 'postedFileName', 'photoDesc', 'createDate', 'DownloadPhoto','DeletePhoto'];
  public photoList :any;
  @ViewChild('PhotoPaginator') PhotoPaginator: MatPaginator;
  totalNumPhotos: number = 0;

  public CommentColumns = ['timeStamp', 'comment', 'fullName', 'editComment','DeleteComment'];
  public commentList :any;
  @ViewChild('CommentPaginator') CommentPaginator: MatPaginator;
  totalNumComments:number=0;

  @ViewChild('fileInput') fileInput: ElementRef;
  file: File = null;
  fileAttr = 'Choose File(Max Size:4MB)';

  @ViewChild('photoInput') photoInput: ElementRef;
  photoFile: File = null;
  photoFileAttr = 'Choose Photo(Max Size:4MB)';

  ClickedRow: any;
  HighlightRow: Number;

  ClickedRowComment: any;
  HighlightRowComment: Number;

  userDetail:any;

  public size = "large";

  constructor(public dialog: MatDialog, private service: FormbuilderService, private spinner: NgxSpinnerService, public dialogRef: MatDialogRef<FormAddComponent>,private userService:UserService) {
    this.formData = JSON.parse(localStorage.getItem('formPreviewDetails') || '{}');
    this.tabIndex = 0;
    this.ClickedRow = function (index) {
      this.HighlightRow = index;
    }
    this.ClickedRowComment = function (i) {
      this.HighlightRowComment = i;
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    localStorage.setItem('cloneNumberForEdit', "0");
    this.refreshPageList();
    this.refreshAttachmentList();
    this.refreshPhotoList();
    this.refreshCommentList();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetail = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  //#region Page Methods
  prevPage() {
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
      this.getDesignPerPage(this.currentPage.pageGUID);
    }
    else {
      this.showNotification('top', 'center', 'There are no pages before this page for this form!', '', 'warning');
    };
  }

  savePage() {
  }

  closePopup() {
    this.dialogRef.close();
  }

  nextPage() {
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
      this.getDesignPerPage(this.currentPage.pageGUID);
    }
    else {
      this.showNotification('top', 'center', 'There are no more pages for this form!', 'Error', 'warning');
    }
  }

  refreshPageList() {
    this.service.getFormPages(this.formData.formID).subscribe(data => {
      this.pages = data;
      this.getDesignPerPage(this.pages[0].pageGUID);
      this.pages.forEach(page=>{
        page["color"]="red";
      });
      this.currentPage = this.pages[0];
      this.firstPage = this.pages[0];
      this.lastPage = Object.keys(this.pages).length;
    });
  }

  refreshAttachmentList() {
    this.spinner.show();
    this.service.getFormAttachments(this.formData.formCaptureID).subscribe(data => {
      this.attachmentList = data;
      this.totalNumAttachments = this.attachmentList.data.length;
      this.attachmentList.paginator = this.attachmentPaginator;
      this.spinner.hide();
    });
  }

  refreshPhotoList() {
    this.spinner.show();
    this.service.getFormPhotos(this.formData.formCaptureID).subscribe(data => {
      this.photoList = data;
      this.totalNumPhotos = this.photoList.data.length;
      this.photoList.paginator = this.PhotoPaginator;
      this.spinner.hide();
    });
  }

  refreshCommentList() {
    this.spinner.show();
    this.service.getFormComments(this.formData.formCaptureID).subscribe(data => {
      this.commentList = data;
      this.commentList.paginator=this.CommentPaginator;
      this.totalNumComments = this.commentList.data.length;
      this.spinner.hide();
    });
  }

  compareFn(option1: lexdata, option2: lexdata) {
    return option1 && option2 ? option1.value === option2.value : option1 === option2;
  }

  setSubSectionValue(fieldName: any, value: any) {
    // this.formDesign.forEach(element => {
    //   if (element.fieldName === fieldName) {
    //     element["data"] = value;
    //   }
    // });
  }

  getDesignPerPage(pageGUID: any) {
    this.spinner.show();
    localStorage.setItem('cloneNumberForEdit', "0");
    this.service.getFormFieldsPerPage(this.formData.formID, pageGUID).subscribe(formFields => {
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
                element["data"] = Boolean(JSON.parse(res));
              }
              else{
                element["data"] = res;
              }
            });
          }

          if (element.listValue !== "") {
              this.formDesign[index].listValue = this.splitString(element.listValue);
          }

          if (element.groupGUID !== "" && element.groupGUID !== "string" && element.parentFieldName === "") {
            let children: any[] = [];

            this.service.getFieldsInGroup(element.groupGUID).subscribe(kids => {
              children = kids;
              children.forEach((field, i) => {
                if (field.fieldType.value !== "subSection" && field.fieldType.value !== "section" && field.fieldType.value !== "group" && field.fieldType.value !== "repeatgroup" && field.fieldType.value !== "attachment" && field.fieldType.value !== "PageTitle") {
                  this.service.getMetadataValue(pageGUID, field.fieldName, this.formData.formCaptureID).subscribe(res => {
                    if (field.fieldType.value === "checkbox") {
                      field["data"] = Boolean(JSON.parse(res));
                    }
                    else{
                      field["data"] = res;
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
                          if (name === "group") {
                            this.service.getMetadataValue(pageGUID, subField.fieldName, this.formData.formCaptureID).subscribe(res => {
                              if (subField.fieldType.value === "checkbox") {
                                subField[j]["data"] = Boolean(JSON.parse(res));
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
      });
      this.spinner.hide();
    });
  }

  //#endregion

  //#region group methods
  addRepeat(data: any) {
    this.spinner.show();
    if (localStorage.getItem('cloneNumberForEdit') === "0") {
      data.forEach(field => {
        field.listValue = "";
      });
      this.service.saveGroupMetadata(this.formData.formCaptureID, data[0].parentFieldName, data).subscribe(res => {
        this.showNotification('top', 'center', 'Repeat data has been saved Successfully!', 'Success.', 'success');
        localStorage.setItem('cloneNumberForEdit', "0");
        this.spinner.hide();
        this.getDesignPerPage(this.currentPage.pageGUID);
      },
        error => {
          this.showNotification('top', 'center', 'Error saving repeat data, please try again', 'Error.', 'danger');
          this.spinner.hide();
        });
    }
    else {
      data.forEach(field => {
        field.listValue = "";
      });
      this.service.UpdateGroupMetadata(this.formData.formCaptureID, data[0].parentFieldName, localStorage.getItem('cloneNumberForEdit'), data).subscribe(res => {
        this.showNotification('top', 'center', 'Repeat data has been updated Successfully!', 'Success.', 'success');
        localStorage.setItem('cloneNumberForEdit', "0");
        this.HighlightRow = -1;
        this.spinner.hide();
        this.getDesignPerPage(this.currentPage.pageGUID);
      },
        error => {
          this.showNotification('top', 'center', 'Error updating repeat data, please try again', 'Error.', 'danger');
          this.spinner.hide();
        });
    }
  }

  editRepeat(data: any, cloneNum: any, groupGUID: any) {
    localStorage.setItem('cloneNumberForEdit', cloneNum);
    data.forEach(field => {
      if (field.fieldType.value !== "subSection") {
        this.service.getMetadataValuePerGroup(groupGUID, field.fieldName, this.formData.formCaptureID, cloneNum).subscribe(res => {
          field["data"] = res;
        });
      }
    });
  }

  deleteClone(cloneNum: any, groupGUID: any) {
    Swal.fire({
      title: 'Are you sure want to remove this repeat data?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      toast: true,
      position: 'top',
      allowOutsideClick: false,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#000000',
      background: '#ffcccb'
    }).then((result) => {
      if (result.value) {
        this.service.deleteClone(groupGUID, this.formData.formCaptureID, cloneNum).subscribe(res => {
          this.showNotification('top', 'center', 'Repeat data has been deleted successfully!', 'Success.', 'success');
          this.getDesignPerPage(this.currentPage.pageGUID);
        });
      }
    })
  }
  //#endregion

  splitString(val: string):  any {
    if(val!=="" && val!=="undefined" && val!==undefined){
      let values = val.split(",");
      let obj2: any = [];
      values.forEach((listV,index) => {
        let obj = {
          name: listV,
          value: listV
        }
        obj2.push(obj);
      });
      return obj2;
    }
    else{
      return [];
    }
  }

  savePad(item: any) {
    localStorage.setItem('imageData', item.data);
    const dialogRef = this.dialog.open(AddSignatureComponent, {
      width: '55%',
      height: '55%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      item["data"] = localStorage.getItem('imageData');
    });
  }

  showNotification(from: any, align: any, message: any, title: any, type: string) {
    $.notify({
      icon: 'notifications',
      title: title,
      message: message
    }, {
      type: type,
      timer: 3000,
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
    if (this.file.size < 4194304) {
      this.fileAttr = this.file.name;
      let reader = new FileReader();
      reader.onload = function (readerEvt: any) {
        var arrayBuffer = readerEvt.target.result.toString().split('base64,')[1];
        document.querySelector('#hidden_upload_item').innerHTML = arrayBuffer;
        this.Proceed();
      }.bind(this);
      reader.readAsDataURL(this.file);
    }
    else {
      this.showNotification('top', 'center', 'File exceeds maximum size of 4mb,Please upload a file of 4mb or less', 'Error.', 'danger');
      this.file = null;
    }
  }

  onUpload() {
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
        this.showNotification('top', 'center', 'Attachment has been saved Successfully!', 'Success.', 'success');
        this.file = null;
        this.fileAttr = 'Choose File(Max Size:4MB)';
        this.fileInput = null;
        this.refreshAttachmentList();
        this.spinner.hide();
      });
    }
    else {
      this.showNotification('top', 'center', 'Select a file before uploading!', 'Error.', 'danger');
    }
  }

  clickDownloadPhoto(data: any) {

    const file = new Blob([this.base64toBlob(data.photo, 'image/' + data.postedFileName.split('.').pop())], { type: 'image/' + data.postedFileName.split('.').pop() });
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
        this.Proceed();
      }.bind(this);
      reader.readAsDataURL(this.photoFile);
    }
    else {
      this.showNotification('top', 'center', 'Photo exceeds maximum size of 4mb,Please upload a photo of 4mb or less', 'Error.', 'danger');
      this.photoFile = null;
    }
  }

  onUploadPhoto() {
    if (this.photoFile !== null) {
      this.spinner.show();
      var item = document.querySelector('#hidden_upload_itemPhoto2').innerHTML;
      let obj = {
        "pgcFormGUID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "photoGUID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "formDetailID": "0",
        "timestamp": "2022-01-21T13:29:23.713Z",
        "photo": item,
        "fileName": "",
        "postedFileName": this.photoFile.name,
        "createDate": "string",
        "photoDesc": this.photoFile.name.substring(0, this.photoFile.name.indexOf('.')),
        "userID": this.userDetail.formData.userID,
        "formCaptureID": this.formData.formCaptureID
      }
      this.service.addFormPhotos(obj).subscribe(res => {
        this.showNotification('top', 'center', 'Photo has been saved Successfully!', 'Success.', 'success');
        this.photoFile = null;
        this.photoFileAttr = 'Choose Photo(Max Size:4MB)';
        this.photoInput = null;
        this.refreshPhotoList();
        this.spinner.hide();
      });
    }
    else {
      this.showNotification('top', 'center', 'Select a photo before uploading', 'Error.', 'danger');
    }
  }

  viewPhoto(data: any) {
    // const dialogRef = this.dialog.open(formPhotoPreview, {
    //   width: '70%',
    //   height: '70%',
    //   data: { image: data.photo },
    // });
    // dialogRef.afterClosed().subscribe(result => {

    // });
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
        this.showNotification('top', 'center', 'Email is invalid, please enter valid email address', 'Error.', 'danger');
      }
    }
  }

  addComment() {
    if(this.addEditComment==='Add'){
      this.spinner.show();
      let obj = {
        "commentID": 0,
        "userID": this.userDetail.formData.userID,
        "deviceFormGUID": "0FA12DB7-D725-48A9-BED2-A44C95E94F7D",
        "comment": this.formComment,
        "stepID": 0,
        "timeStamp": "2022-01-21T13:29:23.713Z",
        "formCaptureID": this.formData.formCaptureID,
        "fullName": "string"
      }
      this.service.addFormComment(obj).subscribe(res => {
        this.showNotification('top', 'center', 'Form comment has been saved Successfully!', 'Success.', 'success');
        this.formComment = '';
        this.refreshCommentList();
        this.addEditComment='Add';
        this.spinner.hide();
      });
    }
    else{
      this.spinner.show();
      let obj = {
        "commentID": 0,
        "userID": this.userDetail.formData.userID,
        "deviceFormGUID": "",
        "comment": this.formComment,
        "stepID": 0,
        "timeStamp": "2022-01-21T13:29:23.713Z",
        "formCaptureID": this.formData.formCaptureID,
        "fullName": "string"
      }
      this.service.updateFormComment(obj,this.commentID).subscribe(res => {
        this.showNotification('top', 'center', 'Form comment has been updated Successfully!', 'Success.', 'success');
        this.formComment = '';
        this.refreshCommentList();
        this.addEditComment='Add';
        this.HighlightRowComment = -1;
        this.spinner.hide();
      });
    }
  }

  showComment(data:any){
    this.addEditComment='Edit';
    this.formComment=data.comment;
    this.commentID=data.commentID;
  }

  deleteFile(item:any){
    Swal.fire({
      title: 'Are you sure you want to delete this file?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      toast: true,
      position: 'top',
      allowOutsideClick: false,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#000000',
      background:'#ffcccb'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.service.DeleteFile(item.attachmentID).subscribe(data => {
          this.spinner.hide();
          this.refreshAttachmentList();
          this.showNotification('top', 'center', 'File Deleted Successfully!', 'Success.', 'success');
        });
      }
    })
  }

  deleteComment(item:any){
    Swal.fire({
      title: 'Are you sure you want to delete this comment?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      toast: true,
      position: 'top',
      allowOutsideClick: false,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#000000',
      background:'#ffcccb'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.service.DeleteComment(item.commentID).subscribe(data => {
          this.spinner.hide();
          this.refreshCommentList();
          this.showNotification('top', 'center', 'Comment Deleted Successfully!', 'Success.', 'success');
        });
      }
    })
  }

  deletePhoto(item:any){
    Swal.fire({
      title: 'Are you sure you want to delete this photo?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      toast: true,
      position: 'top',
      allowOutsideClick: false,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#000000',
      background:'#ffcccb'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.service.DeletePhoto(item.photoGUID).subscribe(data => {
          this.spinner.hide();
          this.refreshPhotoList();
          this.showNotification('top', 'center', 'Photo Deleted Successfully!', 'Success.', 'success');
        });
      }
    })
  }

  checkInfo(){
    this.formDesign.forEach(field=>{
      if(field.fieldType.value==="information"){
        let info=field.calculation;
        if(info!==""){
          var stringArray = info.split(/(\s+)/);
          stringArray.forEach(s=>{
           this.formDesign.forEach(res=>{
             if(('#'+res.fieldName)===s){
                 var re = new RegExp(s, "gi");
                  info=info.replace(re, res.data.toString());
               }
           });
          });
        }
        field.data = info;
      }
    });
  }

  checkForCalc(){
    this.formDesign.forEach(field=>{
      if(field.fieldType.value==="calculation"){
        let calc=field.calculation;
        if(calc!==""){
          var stringArray = calc.split(/(\s+)/);
          stringArray.forEach(num=>{
           this.formDesign.forEach(res=>{
             if('#'+res.fieldName===num){
                 var re = new RegExp(num, "gi");
                 if(res.data===""){
                  calc=calc.replace(re, "0");
                 }
                 else{
                  calc=calc.replace(re, res.data.toString());
                 }
               }
           });
          });
        }
        field.data = eval(calc);
      }
    });
  }
}

// @Component({
//   selector: 'formPhotoPreview',
//   templateUrl: 'formPhotoPreview.html',
// })
// export class formPhotoPreview {
//   constructor(
//     public dialogRef: MatDialogRef<formPhotoPreview>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData,
//   ) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }



