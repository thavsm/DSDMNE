import { Component, ElementRef, Inject, OnInit, ViewChild,NgModule } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormAddComponent } from 'src/app/form-list/form-add/form-add.component';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import Swal from 'sweetalert2'
import { AddSignatureComponent } from 'src/app/form-capture/add-form/add-signature.component';
import * as FileSaver from 'file-saver';
import { lexdata } from 'src/app/form-capture/lexdata'
import { UserService } from 'src/app/shared/user.service';
import { DataBindingDirective, PageSizeItem } from '@progress/kendo-angular-grid';
import { MatPaginator } from '@angular/material/paginator';
import { merge } from 'rxjs';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
declare var $: any;

export interface DialogData {
  image: any;
}

@Component({
  selector: 'app-embedded-form',
  templateUrl: './embedded-form.component.html',
  styleUrls: ['./embedded-form.component.css']
})

export class EmbeddedFormComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  @ViewChild('inputField') inputField!: ElementRef;

  public pageSize = 10;
  public pageSizes: Array<number | PageSizeItem> = [5, 10, 20, {
    text: 'All',
    value: 'all'
  }];

  public formList: any = [];

  public gridView: any[];
  public FormIDTest: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('panel') panel: MatExpansionPanel;

  ngAfterViewInit() {
  }

  public onPageChange(state: any): void {
    this.pageSize = state.take;
  }

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
  formCapIDLoc:any;
  formComment: string = '';

  addEditComment: string = 'Add';

  commentID: number = 0;

  isPanelExpanded = true; 
  thisMonth:any;
  result:any;
  public selectedValues: string = "yes";

  public attachmentList: any;
  totalNumAttachments: number = 0;
  attachmentID:any;
  public photoList: any;
  totalNumPhotos: number = 0;

  public commentList: any;
  totalNumComments: number = 0;

  disableButton:boolean;

  @ViewChild('fileInput') fileInput: ElementRef;
  file: File = null;
  fileAttr = 'Choose File(Max Size:20MB)';

  @ViewChild('photoInput') photoInput: ElementRef;
  photoFile: File = null;
  photoFileAttr = 'Choose Photo(Max Size:20MB)';

  ClickedRow: any;
  HighlightRow: Number;

  ClickedRowComment: any;
  HighlightRowComment: Number;

  userDetail: any;

  pageStatus: any;

  IndicatorData: any;
 locationID: any;
 userData:any;
 nodeName:any;
  isViewOnly: any;
  EmbeddedFormNo:any;
  EmbeddedFieldID:any;
  EmbeddedParentID:any;
  IndicatorIDNo:any;

  isCaptureOrEdit:string="No";

  DisplayOne: string = "Display One";
  DisplayTwo: string = "Display Two";

  constructor(public dialog: MatDialog, private service: FormbuilderService, private spinner: NgxSpinnerService, public dialogRef: MatDialogRef<FormAddComponent>, private userService: UserService) {
    this.IndicatorData = localStorage.getItem('IndicatorData') || '';
    //this.IndicatorData='80';
    this.tabIndex = parseInt(localStorage.getItem('tabIndex'));
    this.EmbeddedFormNo = parseInt(localStorage.getItem('fieldEmbeddedFormID'));
    this.EmbeddedParentID=parseInt(localStorage.getItem('EmbeddedParentID'));
    this.EmbeddedFieldID=parseInt(localStorage.getItem('EmbeddedFieldID'));
    this.ClickedRow = function (index) {
      this.HighlightRow = index;
    }
    this.ClickedRowComment = function (i) {
      this.HighlightRowComment = i;
    }
    localStorage.setItem('fieldNameAttach', "");
    localStorage.setItem('fieldNamePhoto', "");
    localStorage.setItem('fieldNameComment', "");
  }

  ngOnInit(): void {
    this.isViewOnly = this.formData.view;
    localStorage.setItem('cloneNumberForEdit', "0");
   
  
    
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetail = res;
        this.userData = res['formData'];
        console.log('userdata: '+this.userData);
        this.locationID=this.userData['provinceID'];
        this.nodeName=this.userData['nodeName'];
        this.getFormID();
        this.refreshFormsList();
      },
      err => {
        console.log(err);
        this.getFormID();
        this.refreshFormsList();
      },

    );
    
  }

  createForm(){
      this.spinner.show();
      let formCaptureData = {
        formCaptureID: 0,
        formName: '',
        formID: 5152,//this.FormIDTest,  
        step: "string",
        sentBy: this.userDetail.formData.userID,
        dateSent: "string",
        timeSent: "string",
        displayableOne: "",
        displayableTwo: "",
        geography: 0,
        stage: "string",
        formTemplateName: "string"
      }
      this.service.addCapturedForms(formCaptureData).subscribe(res => {
        let myObj = {
          formID: this.EmbeddedFormNo, // 5152,
          formName: JSON.parse(res).formName,
          formCaptureID: JSON.parse(res).formCaptureID,
          state: 'add',
          roleID:0,
          view:'readwrite'
        };
        this.spinner.hide();
        this.formData =  myObj;
       localStorage.setItem('FormcaptID',JSON.parse(res).formCaptureID );
        
        this.refreshPageList();
        //this.refreshFormsList();
        this.formList.filterPredicate = function (data, filter: string): boolean {
          return data.formName.toLowerCase().includes(filter);
        };
        this.DisplayOne = "Display One";
        this.DisplayTwo = "Display Two";
      });
    
  }

  editForm(dataItem: any){
    let formCaptureObj = {
      formID: 5152,  //dataItem.formID, 
      formName: dataItem.formName,
      formCaptureID: dataItem.formCaptureID, //this.formData.formCaptureID,
      state: 'edit',
      roleID:0,
      view:'readwrite'
    };
    //this.formData =  JSON.stringify(formCaptureObj);
    this.formData =  formCaptureObj;
  this.refreshPageList();
  this.formList.filterPredicate = function (data, filter: string): boolean {
    return data.formName.toLowerCase().includes(filter);
  };
  }

  refreshFormsList() {
    this.spinner.show();
    //this.locationID = this.formData.provinceID;
    this.service.getEmbeddedCapturedForms(this.EmbeddedFieldID, this.EmbeddedParentID,this.locationID).subscribe(data => {
      this.gridView = data;
      this.spinner.hide();
      });
      this.isPanelExpanded = true;
  }

  getFormID(){
    this.service.getFormIDProvince(this.userDetail.formData.provinceID).subscribe(forms => {
      this.FormIDTest = forms;
      });
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
          if(element.fieldType.value === "lexicon list"){
            let val = element.data;
            element.data = val.name;
          }
          if (element.groupGUID !== "" && element.groupGUID !== "string" && element.fieldType.value !== "repeatgroup" && element.fieldType.value === "group" && element.fieldType.value !== "subSection" && element.fieldType.value !== "PageTitle") {
            let groupValues = element.groupGUID;
            groupValues.forEach(e => {
              if (e.fieldValidations[0].isRequired === true && element.isAssigned === 1 && e.data === " ") {
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
              if(e.fieldType.value === "lexicon list"){
                let val = e.data;
                e.data = val.name;
              }
              obj.push(e);
              element.groupGUID = "";
              element.listValue = "";
            });
          }
          else {
            element.groupGUID = "";
            if (element.fieldValidations[0].isRequired === true && element.isAssigned === 1 && element.data === " ") {
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
          if(e.fieldType.value === "lexicon list"){
            let val = e.data;
            e.data = val.name;
          }
          e.groupGUID = "";
          if (e.fieldValidations[0].isRequired === true && e.isAssigned === 1 && e.data === " ") {
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
          if(field.fieldType.value === "lexicon list"){
            let val = field.data;
            field.data = val.name;
          }
          obj.push(field);
        }
        if (field.fieldValidations[0].isRequired === true && field.isAssigned === 1 && field.data === " ") {
          errorMessage = errorMessage + field.questionName + ","
        }
      }

    });
    if (errorMessage === "Please fill in ") {
      if (this.formData.state === 'add') {
        this.service.saveFormMetadata(this.formData.formCaptureID, obj, this.userDetail.formData.userID).subscribe(res => {
          this.isCaptureOrEdit='No';
          let pg = this.currentPage.pageNumber;
          let pageStatus = {
            "userID": this.userDetail.formData.userID,
            "pageNumber": (parseInt(this.currentPage.pageNumber) + 1).toString(),
            "formCaptureID": this.formData.formCaptureID,
            "pageGUID": this.currentPage.pageGUID
          }
          this.service.UpdateEmbeddedIndicator(this.EmbeddedFieldID,this.formData.formCaptureID,this.EmbeddedParentID).subscribe(
            res=>{
              console.log("id updated");
            }
          )
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
            if ((index !== -1) && ((index - 1) !== -1)) {
              this.showNotification('top', 'center', 'Page data has been saved successfully!', '', 'success');
              this.currentPage = this.pages[index - 1];
              this.pageStatus = this.currentPage.name;
              this.getDesignPerPage(this.currentPage.pageGUID);
            }
            else {
              this.showNotification('top', 'center', 'There are no pages before this page for this form!', '', 'warning');
              this.pageStatus = this.currentPage.name;
              this.getDesignPerPage(this.currentPage.pageGUID);
            };
          });
        });
      }
      else {
        this.service.UpdateFormMetadata(this.formData.formCaptureID, obj, this.userDetail.formData.userID).subscribe(res => {
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
            if ((index !== -1) && ((index - 1) !== -1)) {
              this.showNotification('top', 'center', 'Page data has been saved successfully!', '', 'success');
              this.currentPage = this.pages[index - 1];
              this.pageStatus = this.currentPage.name;
              this.getDesignPerPage(this.currentPage.pageGUID);
            }
            else {
              this.showNotification('top', 'center', 'There are no pages before this page for this form!', '', 'warning');
            }
          });
        });
      }
    }
    else {
      this.showNotification('top', 'center', errorMessage, '', 'danger');
      errorMessage = "Please fill in ";
    }
  }

  savePage() {
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
                  if (e.fieldValidations[0].isRequired === true && element.isAssigned === 1 && e.data === " ") {
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
                if (element.fieldValidations[0].isRequired === true && element.isAssigned === 1 && element.data === " ") {
                  errorMessage = errorMessage + element.questionName + ",";
                }
              }
              obj.push(element);
            });
            this.refreshFormsList();
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
              if (e.fieldValidations[0].isRequired === true && e.isAssigned === 1 && e.data === " ") {
                errorMessage = errorMessage + e.questionName + ",";
              }
              obj.push(e);
            });
            this.refreshFormsList();
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
            if (field.fieldValidations[0].isRequired === true && field.isAssigned === 1 && field.data === " ") {
              errorMessage = errorMessage + field.questionName + ","
            }
            this.refreshFormsList();
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
              this.service.UpdateEmbeddedIndicator(this.EmbeddedFieldID,this.formData.formCaptureID,this.EmbeddedParentID).subscribe(
                res=>{
                  console.log("id updated");
                }
              )
              this.service.modifyPageStatus(this.formData.formCaptureID, this.currentPage.pageGUID, pageStatus).subscribe(result => {
                this.showNotification('top', 'center', 'Data has been submitted successfully!', '', 'success');
                this.getDesignPerPage(this.currentPage.pageGUID);
                this.currentPage.color = "green";
                this.formData.state = 'edit';
              this.refreshFormsList();
              this.clearDesignPerPage(this.currentPage.pageGUID);
              });
            });
           
          }
          else {
            this.service.UpdateFormMetadata(this.formData.formCaptureID, obj, this.userDetail.formData.userID).subscribe(res => {
              let pg = this.currentPage.pageNumber;
              let pageStatus = {
                "userID": this.userDetail.formData.userID,
                "pageNumber": (parseInt(this.currentPage.pageNumber) + 1).toString(),
                "formCaptureID": this.formData.formCaptureID,
                "pageGUID": this.currentPage.pageGUID
              }
              this.service.modifyPageStatus(this.formData.formCaptureID, this.currentPage.pageGUID, pageStatus).subscribe(result => {
                this.showNotification('top', 'center', 'Data has been updated successfully!', '', 'success');
                this.getDesignPerPage(this.currentPage.pageGUID);
                this.currentPage.color = "green";
                this.formData.state = 'edit';
                this.refreshFormsList();
                this.clearDesignPerPage(this.currentPage.pageGUID);
              });
            });
            this.isPanelExpanded = false;
          }
        }
        else {
          this.showNotification('top', 'center', errorMessage, '', 'danger');
          errorMessage = "Please fill in ";
        }
  }

  DisableButton(attachmentID:any):boolean{
    if(this.userDetail.formData.userID===attachmentID.userID){
     return true;
    }
    else{
      return false;
    }
   }

  goToPage(page: any) {
    this.currentPage = page;
    this.pageStatus = this.currentPage.name;
    this.getDesignPerPage(page.pageGUID);
  }

  closePopup() {
    Swal.fire({
      title: "<h5 style='color:white;font-weight:400'> Are you sure you want to close this form?</h5>",
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
        this.dialogRef.close();
      }
    })
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
          if(element.fieldType.value === "lexicon list"){
            let val = element.data;
            element.data = val.name;
          }
          if (element.groupGUID !== "" && element.groupGUID !== "string" && element.fieldType.value !== "repeatgroup" && element.fieldType.value === "group" && element.fieldType.value !== "subSection" && element.fieldType.value !== "PageTitle") {
            let groupValues = element.groupGUID;
            groupValues.forEach(e => {
              if (e.fieldValidations[0].isRequired === true && element.isAssigned === 1 && e.data === " ") {
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
              if(e.fieldType.value === "lexicon list"){
                let val = e.data;
                e.data = val.name;
              }
              obj.push(e);
              element.groupGUID = "";
              element.listValue = "";
            });
          }
          else {
            element.groupGUID = "";
            if (element.fieldValidations[0].isRequired === true && element.isAssigned === 1 && element.data === " ") {
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
          if(e.fieldType.value === "lexicon list"){
            let val = e.data;
            e.data = val.name;
          }
          e.groupGUID = "";
          if (e.fieldValidations[0].isRequired === true && e.isAssigned === 1 && e.data === " ") {
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
          if(field.fieldType.value === "lexicon list"){
            let val = field.data;
            field.data = val.name;
          }
          obj.push(field);
        }
        if (field.fieldValidations[0].isRequired === true && field.isAssigned === 1 && field.data === " ") {
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
              this.showNotification('top', 'center', 'Page data has been saved successfully!', '', 'success');
              this.currentPage = this.pages[index + 1];
              this.pageStatus = this.currentPage.name;
              this.getDesignPerPage(this.currentPage.pageGUID);
            }
            else {
              this.showNotification('top', 'center', 'There are no more pages for this form!', '', 'warning');
              this.currentPage = this.pages[index];
              this.pageStatus = this.currentPage.name;
              this.getDesignPerPage(this.currentPage.pageGUID);
            };
          });
        });
      }
      else {
        this.service.UpdateFormMetadata(this.formData.formCaptureID, obj, this.userDetail.formData.userID).subscribe(res => {
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
              this.showNotification('top', 'center', 'Page data has been saved successfully!', '', 'success');
              this.currentPage = this.pages[index + 1];
              this.pageStatus = this.currentPage.name;
              this.getDesignPerPage(this.currentPage.pageGUID);
            }
            else {
              this.showNotification('top', 'center', 'There are no more pages for this form!', '', 'warning');
            }
          });
        });
      }
    }
    else {
      this.showNotification('top', 'center', errorMessage, '', 'danger');
      errorMessage = "Please fill in ";
    }
  }

  refreshPageList() {
    this.service.getFormPages(parseInt(localStorage.getItem('fieldEmbeddedFormID'))).subscribe(data => {
      this.pages = data;
      this.getDesignPerPage(this.pages[0].pageGUID);
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
    this.isPanelExpanded = true;
  }

  refreshAttachmentList() {
    // this.service.getFormAttachments(this.formData.formCaptureID).subscribe(data => {
    //   data.forEach(field=>{
    //     var new_date_time = new Date( field.createdTS);
    //     var s = new_date_time.toLocaleDateString(('en-ZA')).replace(/\//g, '-')
    //     //new_date_time.toISOString().replace(/T.*/,'').split('-').join('-');
    //     field.createdTS = s;
    //     console.log(s);
       
    //   });
    //   this.attachmentList = data;
    //   this.totalNumAttachments = Object.keys(this.attachmentList).length;
    // });
  }

  refreshPhotoList() {
    // this.service.getFormPhotos(this.formData.formCaptureID).subscribe(data => {
    //   this.photoList = data;
    //   this.totalNumPhotos = Object.keys(this.photoList).length
    // });
  }

  refreshCommentList() {
    // this.service.getFormComments(this.formData.formCaptureID).subscribe(data => {
    // data.forEach(field=>{
    // var new_date_time = new Date( field.timeStamp );
    // var s = new_date_time.toLocaleDateString(('en-ZA')).replace(/\//g, '-');
    // console.log(s);
    
    //   field.timeStamp = s;
   
    // });

    //   this.commentList = data;
    //   this.totalNumComments = Object.keys(this.commentList).length
    // });
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

  refreshEditPageList()
{
  this.service.getFormPages(parseInt(localStorage.getItem('fieldEmbeddedFormID'))).subscribe(data => {
    this.pages = data;
    this.getDesignPerPage(this.pages[0].pageGUID);
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
  getDesignPerPage(pageGUID: any) {
    this.spinner.show();
    localStorage.setItem('cloneNumberForEdit', "0");
    var locationRole = this.formData.roleID;
    if (locationRole == 0) {
      locationRole = this.userDetail.formData.role;
    }
    this.service.GetFieldsForEmbeddedCapturePerPage(pageGUID).subscribe(formFields => {
      console.log(formFields);
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

            this.service.getFieldsInGroup(element.groupGUID).subscribe(kids => {
              children = kids.filter(item1 => this.formDesign.some(item2 => item1.fieldID === item2.fieldID));
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
//console.log('state: '+this.formData.state);
//console.log('formcaptureID: ' +this.formData.formcapturedID);
        if (this.formData.state === 'edit') {
          if (element.fieldType.value !== "subSection" && element.fieldType.value !== "section" && element.fieldType.value !== "group" && element.fieldType.value !== "repeatgroup" && element.fieldType.value !== "attachment" && element.fieldType.value !== "PageTitle" && element.parentFieldName === "") {
            this.service.getMetadataValue(pageGUID, element.fieldName, this.formData.formCaptureID).subscribe(res => {
              if (element.fieldType.value === "checkbox") {
                element["data"] = Boolean(res);
              }
               //else if (element.fieldType.value === "link multi select" || element.fieldType.value === "lexicon list")
              else if (element.fieldType.value === "link multi select") {
               element["data"] = this.splitString(res) as Array<string>;

               
              }
              else {
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
                        else if (field.fieldType.value === "link multi select") {
                          field["data"] = this.splitString(res) as Array<string>;
                        }
                        else {
                          field["data"] = res;
                        }
                      });
                    }
                  });
                }
console.log('Fields: '+field["data"]);
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
                              else if (subField.fieldType.value === "link multi select" ){
                                subField["data"] = this.splitString(res) as Array<string>;
                              }
                              else {
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

  clearDesignPerPage(pageGUID: any) {
    this.spinner.show();
    localStorage.setItem('cloneNumberForEdit', "0");
    var locationRole = this.formData.roleID;
    if (locationRole == 0) {
      locationRole = this.userDetail.formData.role;
    }
    this.service.GetFieldsForEmbeddedCapturePerPage(pageGUID).subscribe(formFields => {
      console.log(formFields);
      this.formDesign = formFields;
      this.formDesign.forEach((element, index) => {
        element.fieldStyles[0].height = Math.ceil(parseInt(element.fieldStyles[0].height) / 23.2); //23.2 is the size of one row in textarea
        if (element.fieldType.value === "repeatgroup") {
          this.service.getGroupTableData(element.groupGUID, this.formData.formCaptureID).subscribe(resultant => {
            element["groupTableList"] = resultant;
          });
        }
          element["data"] = "";
  
          if (element.listValue !== "") {
            this.formDesign[index].listValue = this.splitString(element.listValue);
          }
  
          if (element.groupGUID !== "" && element.groupGUID !== "string" && element.parentFieldName === "") {
            let children: any[] = [];
  
            this.service.getFieldsInGroup(element.groupGUID).subscribe(kids => {
              children = kids.filter(item1 => this.formDesign.some(item2 => item1.fieldID === item2.fieldID));
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
      });
      this.spinner.hide();
    });
    this.isPanelExpanded = false;
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
      this.service.saveGroupMetadata(this.formData.formCaptureID, data[0].parentFieldName, data, this.userDetail.formData.userID).subscribe(res => {
        this.showNotification('top', 'center', 'Repeat data has been saved successfully!', '', 'success');
        localStorage.setItem('cloneNumberForEdit', "0");
        this.spinner.hide();
        this.getDesignPerPage(this.currentPage.pageGUID);
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
      this.service.UpdateGroupMetadata(this.formData.formCaptureID, data[0].parentFieldName, localStorage.getItem('cloneNumberForEdit'), data, this.userDetail.formData.userID).subscribe(res => {
        this.showNotification('top', 'center', 'Repeat data has been updated successfully!', '', 'success');
        localStorage.setItem('cloneNumberForEdit', "0");
        this.HighlightRow = -1;
        this.spinner.hide();
        this.getDesignPerPage(this.currentPage.pageGUID);
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
      title: "<h5 style='color:white;font-weight:400'> Are you sure you want to remove this repeat data? </h5>",
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
            "createdTS": "2022-01-21",
            "fileName": this.file.name.substring(0, this.file.name.indexOf('.')),//fileName + '_' + res,
            "fileDesc": this.file.name.substring(0, this.file.name.indexOf('.')),
            "fileExtention": "." + this.file.name.split('.').pop(),
            "fileSize": this.file.size,
            "contentType": this.file.type,
            "attachmentData": item,
            "userID": this.userDetail.formData.userID,
            "formCaptureID": this.formData.formCaptureID,
            "fullName": "string",
            "linkedTo":   fileName
          }
          this.service.addFormAttachments(obj).subscribe(res => {
            this.showNotification('top', 'center', 'Attachment has been saved successfully!', '', 'success');
            this.file = null;
            this.fileAttr = 'Choose File(Max Size:20MB)';
            //this.fileInput = ElementRef;
            this.refreshAttachmentList();
            localStorage.setItem('fieldNameAttach', "");
            localStorage.setItem('fieldNamePhoto', "");
            //this.getDesignPerPage(this.currentPage.pageGUID);
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
          "createdTS": "2022-01-21",
          "fileName": this.file.name.substring(0, this.file.name.indexOf('.')),
          "fileDesc": this.file.name.substring(0, this.file.name.indexOf('.')),
          "fileExtention": "." + this.file.name.split('.').pop(),
          "fileSize": this.file.size,
          "contentType": this.file.type,
          "attachmentData": item,
          "userID": this.userDetail.formData.userID,
          "formCaptureID": this.formData.formCaptureID,
          "fullName": "string",
          "linkedTo": "General "
        }
        this.service.addFormAttachments(obj).subscribe(res => {
          this.showNotification('top', 'center', 'Attachment has been saved successfully!', '', 'success');
          this.file = null;
          this.fileAttr = 'Choose File(Max Size:20MB)';
          // this.fileInput = null;
          this.refreshAttachmentList();
          localStorage.setItem('fieldNameAttach', "");
          localStorage.setItem('fieldNamePhoto', "");
          //this.getDesignPerPage(this.currentPage.pageGUID);
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
    const file = new Blob([this.base64toBlob(data.photo, 'image/' + data.photoDesc.split('.').pop())], { type: 'image/' + data.photoDesc.split('.').pop() });
    FileSaver.saveAs(file, data.postedFileName);
  }

  onChangePhoto(event) {
    this.photoFile = <File>event.target.files[0];
    if (this.photoFile.size <  20971520) {
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
      this.showNotification('top', 'center', 'Photo exceeds maximum size of 20mb, Please upload a photo of 20mb or less', '', 'danger');
      this.photoFile = null;
    }
  }

  onUploadPhoto() {
    let photoName = "";
    if (localStorage.getItem('fieldNamePhoto') !== null || localStorage.getItem('fieldNamePhoto') !== undefined) {
      photoName = localStorage.getItem('fieldNamePhoto').toString();
    }
    if (photoName !== "") {
      var fileType = this.photoFile.name.split('.').pop();
      if (fileType == 'jpg') {
        fileType = 'jpeg';
      }
      if (this.photoFile !== null) {
        this.spinner.show();
        var item = document.querySelector('#hidden_upload_itemPhoto2').innerHTML;
        this.service.getFormPhotoCount(photoName, this.formData.formCaptureID).subscribe(res => {
          let obj = {
            "pgcFormGUID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "photoGUID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "formDetailID": "0",
            "timestamp": "2022-01-21",
            "photo": item,
            "fileName": "",
            "postedFileName": this.photoFile.name.substring(0, this.photoFile.name.indexOf('.')), //photoName + '_' + res,
            "createDate": "string",
            "photoDesc": "." + fileType,
            "userID": this.userDetail.formData.userID,
            "formCaptureID": this.formData.formCaptureID,
            "fullName": "string",
            "LinkedTo":   photoName
          }
          this.service.addFormPhotos(obj).subscribe(res => {
            this.showNotification('top', 'center', 'Photo has been saved successfully!', '', 'success');
            this.photoFile = null;
            this.photoFileAttr = 'Choose Photo(Max Size:20MB)';
            //this.photoInput = null;
            this.refreshPhotoList();
            localStorage.setItem('fieldNameAttach', "");
            localStorage.setItem('fieldNamePhoto', "");
            //this.getDesignPerPage(this.currentPage.pageGUID);
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
        var fileType = this.photoFile.name.split('.').pop();
        if (fileType == 'jpg') {
          fileType = 'jpeg';
        }
        this.spinner.show();
        var item = document.querySelector('#hidden_upload_itemPhoto2').innerHTML;
        let obj = {
          "pgcFormGUID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "photoGUID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "formDetailID": "0",
          "timestamp": "2022-01-21",
          "photo": item,
          "fileName": "",
          "postedFileName": this.photoFile.name.substring(0, this.photoFile.name.indexOf('.')),
          "createDate": "string",
          "photoDesc": "." + fileType,
          "userID": this.userDetail.formData.userID,
          "formCaptureID": this.formData.formCaptureID,
          "fullName": "string",
          "LinkedTo": "General"
        }
        this.service.addFormPhotos(obj).subscribe(res => {
          this.showNotification('top', 'center', 'Photo has been saved successfully!', '', 'success');
          this.photoFile = null;
          this.photoFileAttr = 'Choose Photo(Max Size:20MB)';
          //this.photoInput = null;
          this.refreshPhotoList();
          localStorage.setItem('fieldNameAttach', "");
          localStorage.setItem('fieldNamePhoto', "");
          //this.getDesignPerPage(this.currentPage.pageGUID);
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
    if (this.formComment !== "" && this.formComment !== null) {
      if (commentName !== "") {
        if (this.addEditComment === 'Add') {
          this.spinner.show();
          let obj = {
            "commentID": 0,
            "userID": this.userDetail.formData.userID,
            "deviceFormGUID": "0FA12DB7-D725-48A9-BED2-A44C95E94F7D",
            "comment": this.formComment,
            "stepID": 0,
            "timeStamp": "2022-01-21",
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
            //this.getDesignPerPage(this.currentPage.pageGUID);
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
            "timeStamp": "2022-01-21",
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
            //this.getDesignPerPage(this.currentPage.pageGUID);
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
            "timeStamp": "2022-01-21",
            "formCaptureID": this.formData.formCaptureID,
            "fullName": "string",
            "LinkedTo": "General"
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
            "timeStamp": "2022-01-21",
            "formCaptureID": this.formData.formCaptureID,
            "fullName": "string",
            "LinkedTo": "General"
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
    else {
      this.showNotification('top', 'center', 'Please enter a comment before saving!', '', 'danger');
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
      title: "<h5 style='color:white;font-weight:400'> Are you sure you want to remove this file? </h5>",
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
      title: "<h5 style='color:white;font-weight:400'> Are you sure you want to remove this comment? </h5>",
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
      title: "<h5 style='color:white;font-weight:400'> Are you sure you want to remove this photo? </h5>",
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
//   //new changes
// checkAge(){
//   this.formDesign.forEach(field=>{
//     if(field.fieldName === "DateofBirth"){
//       let Dob = field.data;
//       localStorage.setItem('Dob',field.data);
//       console.log('Dob: '+Dob);
//       this.formDesign.forEach(id=>{
//       if(id.fieldName ==="IdentiType")
//       {
//         let fieldDob = id.data;
//         if(fieldDob === 'D.O.B')
//         {
//           let currentDate = new Date();
          
 
//           console.log('currentDate: '+currentDate); 
//           console.log('getdob: '+localStorage.getItem('Dob'));
//           let storedDob = localStorage.getItem('Dob');
//           let DobDate = new Date(storedDob);
//           console.log('getdob: '+DobDate);
//           let Age = currentDate.getFullYear() - DobDate.getFullYear();
//                    // Check if the birthday hasn't occurred yet this year
//       if (
//        currentDate.getMonth() < DobDate.getMonth() ||
//         (currentDate.getMonth() === DobDate.getMonth() &&
//         currentDate.getDate() < DobDate.getDate())
//         ) {
//         Age--;
//         }

//           console.log('age: '+Age);
//           this.formDesign.forEach(res=>{
//             if(res.fieldName ==="Age"){
//               if(res.data ==="" || res.data ===undefined){
//                 res.data = Age;
//               }
//               else{
//                 res.data=Age;
//               }
//             }

//           });

//         }
//       }
//     });
//     }
//   });
// }
//   checkUnique(){
//     this.formDesign.forEach(field => {
//       if(field.fieldName ==="IdentiType"){
//          let IdentType = field.data;
//          if(IdentType === 'Unknown'){
//           this.formDesign.forEach(res => {
//           if(res.fieldName ==="IDNumber"){
//             if(res.data === "" || res.data === undefined){
//             res.data=localStorage.getItem('FormcaptID');
//            console.log('formcapture: ' +res.data);
//             }
//             else{
//               res.data=localStorage.getItem('FormcaptID');
//            console.log('formcapture: ' +res.data);
//             }
//          }
       
//         });
 
//          }
//       }
//     });
//   }
  checkID(inputField: any) {
    this.formDesign.forEach(field => {
      if (field.fieldType.value === "calculation") {
        let idnumber = inputField.value.toString();
        //let idnumber;
  
        // if (origIdNum.length === 10) {
        //   idnumber = '000' + origIdNum;
        // } else if (origIdNum.length === 11) {
        //   idnumber = '00' + origIdNum;
        // } else if (origIdNum.length === 12) {
        //   idnumber = '0' + origIdNum;
        // } else {
        //   idnumber = origIdNum;
        // }

        console.log('idnom: '+idnumber);
        if(idnumber===""){
          this.showNotification('top', 'center', 'Please enter a ID number', '', 'danger');
        }
        else{
        var todaysDate = new Date();
        this.thisMonth = todaysDate.getMonth()+1;

        this.service.getIndicatorID(this.EmbeddedFieldID).subscribe(emb =>{
        this.IndicatorIDNo = emb;
        console.log('IndicatorID: '+this.IndicatorIDNo);
        });
        // this.service.checkIDinMonth(idnumber, this.thisMonth,this.IndicatorIDNo).subscribe(res => {
          this.service.checkIDinMonth(idnumber, this.thisMonth).subscribe(res => {
          this.result=res;

          if(this.result==1)
          {
            this.showNotification('top', 'center', 'This ID number has already been used, please try another ID number', '', 'danger');
          }
          else{
            console.log('IDNO: ' + idnumber);
  
        if (idnumber !== "") {
          // 1. Validate numeric and 13 digits
          if (idnumber.length !== 13) {
            this.showNotification('top', 'center', 'Please enter a 13-digit ID!', '', 'danger');
            this.setPlaintextFieldToInvalid();
          } else {
          var currentYear = new Date().getFullYear() % 100;
          var yy = parseInt(idnumber.toString().substring(0, 2));
          yy += (yy > currentYear ? 1900 : 2000);
            console.log('yy: '+yy);

            // 2. Check the first 6 numbers for a valid date
            var tempDate = new Date(
              yy,
              idnumber.toString().substring(2, 4) - 1,
              idnumber.toString().substring(4, 6)
            );
console.log('firstTEMP: ' +tempDate);

             

            var newDate = tempDate.toLocaleDateString('en-ZA').replace(/\//g, '-');
            var todayDate = new Date();
            //var thisMonth= todayDate.getMonth();
console.log('NEWDAT: '+newDate);
            var age = todayDate.getFullYear() - tempDate.getFullYear();

            
// Check if the birthday hasn't occurred yet this year
if (
  todayDate.getMonth() < tempDate.getMonth() ||
  (todayDate.getMonth() === tempDate.getMonth() &&
    todayDate.getDate() < tempDate.getDate())
) {
  age--;
}

console.log('Age:', age);
if (tempDate.getFullYear() !== yy || tempDate.getMonth() !== parseInt(idnumber.toString().substring(2, 4)) - 1 || tempDate.getDate() !== parseInt(idnumber.toString().substring(4, 6))) {
  console.log('expected yy', yy);
  console.log('tempDate ', tempDate.getFullYear());
  console.log('mmonth yy', tempDate.getMonth());
  console.log('date yy', tempDate.getDate());
  this.showNotification('top', 'center', 'Please enter a valid 13-digit ID!', '', 'danger');
              this.setPlaintextFieldToInvalid();
            } else {
              // 3. Validate using Luhn formula
              var checkSum = 0;
              var multiplier = 1;
  
              for (var i = 0; i < 13; ++i) {
                var tempTotal = parseInt(idnumber.toString().charAt(i)) * multiplier;
                if (tempTotal > 9) {
                  tempTotal = parseInt(tempTotal.toString().charAt(0)) + parseInt(tempTotal.toString().charAt(1));
                }
                checkSum = checkSum + tempTotal;
                multiplier = (multiplier % 2 === 0) ? 1 : 2;
              }
  
              if (checkSum % 10 !== 0) {
                this.showNotification('top', 'center', 'Please enter a valid 13-digit ID!', '', 'danger');
                this.setPlaintextFieldToInvalid();
                
              } else {
                var genderPick = idnumber.toString().substring(6, 10);
                var gender = (genderPick >= "0000" && genderPick <= "4999") ? 'Female' : 'Male';
                console.log("gender: " + gender);
  
                let calc = field.calculation;
                if (calc !== "") {
                  var stringArray = calc.split(/(\s+)/);
                  stringArray.forEach(num => {
                    this.formDesign.forEach(res => {
                      if (res.fieldType.value === "section") {
                      } else {
                        if ('#' + res.fieldName === num) {
                          if (res.fieldType.value === "date") {
                            if(res.fieldName === "DateofBirth"){
                            if (res.data === "" || res.data === undefined) {
                              res.data = newDate;
                            }
                            else{
                              res.data = newDate;
                            }
                          }
                          }
                          if (res.fieldType.value === "plaintext") {
                            if(res.fieldName === "ValidID"){
                            if (res.data === "" || res.data === undefined) {
                              res.data = 'Valid';
                            }
                            else{
                              res.data = 'Valid'; 
                            }
                          }
                          }
                   
                          if (res.fieldType.value === "lexicon list") {
                            if (res.data === "" || res.data === undefined) {
                              if(res.fieldName === "Gender"){
                              res.data = gender.toString();
                            }
                            else{
                              res.data = gender.toString();
                            }
                          }
                          }
                         if(res.fieldType.value==='number')
                        {
                          if(res.fieldName === "Age"){
                          if (res.data === "" || res.data === undefined) {
                            res.data = age;
                          }
                          else{
                            res.data = age; 
                          }
                        }
                        }

                        }
                      }
                    });
                  });
                }
              }
            }
          }
        }
           }
        });
      }
      }
    });
  }
  
  setPlaintextFieldToInvalid() {
    this.formDesign.forEach(field => {
    let calc = field.calculation;
    if (calc !== "") {
      var stringArray = calc.split(/(\s+)/);
      stringArray.forEach(num => {
        this.formDesign.forEach(res => {
          if (res.fieldType.value === "section") {
          } else {
            if ('#' + res.fieldName === num) {
          
              if (res.fieldType.value === "plaintext") {
                if (res.data === "" || res.data === undefined) {
                  res.data = 'Invalid';
                }
                else{
                  res.data = 'Invalid'; 
                }
              }

              else if(res.fieldName === "DateofBirth"){
                //res.data = 'mm/dd/yyyy';
                res.data = '';
              }

              else if(res.fieldName === 'Age'){
                res.data='';
              }
              else if(res.fieldName ==='Gender'){
                res.data = '';
              }
            }
          }
        });
      });
    }
  });
  }
  
  
  //check id number is valid
// checkID(){
//   this.formDesign.forEach(field => {
//     if (field.fieldType.value === "calculation") {
//       let origIdNum=field.data.toString();
//       let idnumber;        
//       var valid;
//       if(origIdNum.length===11)
//       {
//         idnumber='00'+origIdNum;

//       }
//       else if(origIdNum.length===12)
//       {
//         idnumber='0'+origIdNum;
//       }
//       else{
//      idnumber=origIdNum;
//      }

//       if (typeof idnumber === 'number') {
//         console.log('variable is a number');
//       }
//       console.log('IDNO: ' + idnumber);

//       if (idnumber !== "") {
//         // 1. Validate numeric and 13 digits
//         if (isNaN(idnumber) || idnumber.toString().length !== 13) {
//           this.showNotification('top', 'center', 'Please enter a 13 digit ID!', '', 'danger');
          
//           valid='Invalid';
//         }
//         else{valid='Valid'}


//         // 2. Check the first 6 numbers for a valid date
//         var tempDate = new Date(
//           idnumber.toString().substring(0, 2),
//           idnumber.toString().substring(2, 4) - 1,
//           idnumber.toString().substring(4, 6)
//         );
//         var newDate = tempDate.toLocaleDateString('en-ZA').replace(/\//g, '-');
//         //var newDate = tempDate.toLocaleDateString();
//         console.log('s: ' + newDate);
//         console.log('newDate: ' + newDate);
//         var fullyear = tempDate.getFullYear();
//           var year= parseInt(fullyear.toString().substring(2,4)) === parseInt(idnumber.toString().substring(0, 2));
//           var month = tempDate.getMonth() === parseInt(idnumber.toString().substring(2, 4)) - 1 ;
//           var date = tempDate.getDate() === parseInt(idnumber.toString().substring(4, 6));
//           console.log("Year from tempDate:", parseInt(fullyear.toString().substring(2,4)));
//           console.log("Year from idnumber:", parseInt(idnumber.toString().substring(0, 2)));
//           console.log('"'+year+'"'+month+'"'+date);
//         if (
//           !(
//             parseInt(fullyear.toString().substring(2,4)) === parseInt(idnumber.toString().substring(0, 2)) &&
//             tempDate.getMonth() === parseInt(idnumber.toString().substring(2, 4)) - 1 &&
//             tempDate.getDate() === parseInt(idnumber.toString().substring(4, 6))
//           )
//         ) {
//           this.showNotification('top', 'center', 'Please enter a valid 13 digit ID!', '', 'danger');
//         }

//         // 3. Validate using Luhn formula
//         var tempTotal = 0;
//         var checkSum = 0;
//         var multiplier = 1;
       
//         for (var i = 0; i < 13; ++i) {
//           tempTotal = parseInt(idnumber.toString().charAt(i)) * multiplier;
//           if (tempTotal > 9) {
//             tempTotal = parseInt(tempTotal.toString().charAt(0)) + parseInt(tempTotal.toString().charAt(1));
//           }
//           checkSum = checkSum + tempTotal;
//           multiplier = (multiplier % 2 === 0) ? 1 : 2;
//         }

//         if (checkSum % 10 === 0) {

//         }
//         var datePick = newDate.toString();
//         var genderPick = idnumber.toString().substring(6, 10);

//         var gender = '';
//         if (genderPick >= "0000" && genderPick <= "4999") {
//           gender = 'Female';
//         } else if (genderPick >= "5000" && genderPick <= "9999") {
//           gender = 'Male';
//         }
    

//         console.log("gender: " + gender);
//         //console.log("date: " + newDate);
//         console.log("tempdate: " + tempDate);
//         let calc = field.calculation;
//         if (calc !== "") {
//           var stringArray = calc.split(/(\s+)/);
//           stringArray.forEach(num => {
//             this.formDesign.forEach(res => {
//               if (res.fieldType.value === "section") {
//                 let sectionItems = res.groupGUID;
                
//                 sectionItems.forEach(sectionItem => {
//                   console.log('secItems: ' +sectionItems);
//                   if ('#' + sectionItem.fieldName === num) {
//                     var re = new RegExp(num, "gi");
//                     if (sectionItem.data === "" || sectionItem.data === undefined) {
//                       field.data =   console.log("gender: " + gender);
//     //console.log("date: " + newDate);
//     console.log("tempdate: " + tempDate);
//     let calc = field.calculation;
//     if (calc !== "") {
//       var stringArray = calc.split(/(\s+)/);
//       stringArray.forEach(num => {
//         this.formDesign.forEach(res => {
//           if (res.fieldType.value === "section") {
//             let sectionItems = res.groupGUID;
            
//             sectionItems.forEach(sectionItem => {
//               console.log('secItems: ' +sectionItems);
//               if ('#' + sectionItem.fieldName === num) {
//                 var re = new RegExp(num, "gi");
//                 if (sectionItem.data === "" || sectionItem.data === undefined) {
//                   field.data = newDate;
//                 } else {
//                   field.data = newDate;
//                 }
//               }
//               if (sectionItem.fieldType.value === "lexicon list") {
//                 let listItems = sectionItem.groupGUID;
//                 listItems.forEach(listItem => {
//                   if ('#' + listItem.fieldName === num) {
//                     var re = new RegExp(num, "gi");
//                     if (listItem.data === "" || listItem.data === undefined) {
//                       field.data = gender.toString();
//                     } else {
//                       field.data = gender.toString();
//                     }
//                   }
//                 })
//               }
//             })
//           } else {

//             if ('#' + res.fieldName === num) {
//               if(res.fieldType.value === "date"){
//               var re = new RegExp(num, "gi");
//               if (res.data === "" || res.data === undefined) {
//                 res.data = newDate;
//               } else {
//                 res.data =newDate;
//               }
//             }
          
//               if(res.fieldType.value === "lexicon list"){
//               var re = new RegExp(num, "gi");
//               if (res.data === "" || res.data === undefined) {
//                 res.data = gender.toString();
//               } else {
//                 res.data = gender.toString();
//               }
           
//             }
           
//               if(res.fieldType.value === "plaintext"){
//               var re = new RegExp(num, "gi");
//               if ((res.data === "" || res.data === undefined)&&(checkSum % 10 !== 0)) {
//                 res.data = valid;
//               } else {
//                 res.data = valid;
//               }
            
//             }
//           }
//           }
//         });
//       });
//     };
//                     } else {
//                       field.data = newDate;
//                     }
//                   }
//                   if (sectionItem.fieldType.value === "lexicon list") {
//                     let listItems = sectionItem.groupGUID;
//                     listItems.forEach(listItem => {
//                       if ('#' + listItem.fieldName === num) {
//                         var re = new RegExp(num, "gi");
//                         if (listItem.data === "" || listItem.data === undefined) {
//                           field.data = gender.toString();
//                         } else {
//                           field.data = "";
//                         }
//                       }
//                     })
//                   }
//                 })
//               } else {
  
//                 if ('#' + res.fieldName === num) {
//                   if (res.fieldType.value === "date") {
//                     var re = new RegExp(num, "gi");
//                     if (res.data === "" || res.data === undefined) {
//                       res.data = newDate;
//                     } else {
//                       res.data = newDate;
//                     }
//                   } else if (res.fieldType.value === "lexicon list") {
//                     var re = new RegExp(num, "gi");
//                     if (res.data === "" || res.data === undefined) {
//                       res.data = gender.toString();
//                     } else {
//                       res.data = gender.toString();
//                     }
//                   } else if(res.fieldType.value === "plaintext"){
//                     var re = new RegExp(num, "gi");
//                     if ((res.data === "" || res.data === undefined)) {
//                       res.data = 'Invalid';
//                     } else {
//                       res.data = 'Valid';
//                     }
//                   }
                  
//                 }
//               }
//             });
//           });
//         }
//       }
    
//     }
//   });
// }

//check id number is valid
//   checkID() {
//     this.formDesign.forEach(field => {
//       if (field.fieldType.value === "calculation") {
//         let idnumber = field.data;
//         if (typeof idnumber === 'number') {
//           console.log('variable is a number');
//         }
//         console.log('IDNO: '+ idnumber);
//          if(idnumber != ""){
//          //1. numeric and 13 digits
//          if (isNaN(idnumber) || (idnumber.length != 13)) 
//          {
//            this.showNotification('top', 'center', 'Please enter a 13 digit ID!', '', 'danger');
          
//          }
//        //2. first 6 numbers is a valid date
//      var tempDate = new Date(idnumber.toString().substring(0, 2), idnumber.toString().substring(2, 4) - 1, idnumber.toString().substring(4, 6));
//      var s = tempDate.toLocaleDateString(('en-ZA')).replace(/\//g, '-');
//      var newDate=tempDate.toLocaleDateString();
//      console.log('s: '+ s);
//      console.log('newDate: '+ newDate);
//     if (!((tempDate.getFullYear() == idnumber.toString().substring(0, 2)) && (tempDate.getMonth() == idnumber.toString().substring(2, 4) - 1) && (tempDate.getDate() == idnumber.toString().substring(4, 6))))
//      { 
//        this.showNotification('top', 'center', 'Please enter a valid 13 digit ID!', '', 'danger');
//     }
    
//        //3. luhn formula
//        var tempTotal = 0; var checkSum = 0; var multiplier = 1;
//        for (var i = 0; i < 13; ++i) {
//            tempTotal = parseInt(idnumber.toString().charAt(i)) * multiplier;
//            if (tempTotal > 9) { tempTotal = parseInt(tempTotal.toString().charAt(0)) + parseInt(tempTotal.toString().charAt(1)); }
//           checkSum = checkSum + tempTotal;
//            multiplier = (multiplier % 2 == 0) ? 1 : 2;
//       }  
//        if ((checkSum % 10) == 0) 
//        { 
//          //console.log('idnotest: '+checkSum);
//          var datePick = newDate;
//          var genderPick = idnumber.toString().substring(6, 10);
         
//          var gender ='';
//          if(genderPick >= "0000" && genderPick <= "4999" )
//          {
//            gender = 'Female';
//          }
//          else if(genderPick >= "5000" && genderPick <= "9999" )
//          {
//            gender='Male';
//          }
//        }
     
//      }
//      if (typeof gender === 'number') {
//       console.log('gender is a number');
//     }
//     if (typeof newDate === 'number') {
//       console.log('newDate is a number');
//     }
//      console.log("gender: "+gender);
//      console.log("date: "+newDate);
//       let calc = field.calculation;
//       if (calc !== "") {
//         var stringArray = calc.split(/(\s+)/);
//         stringArray.forEach(num => {
//           this.formDesign.forEach(res => {
//             if (res.fieldType.value === "date") {
//               let sectionItems = res.groupGUID;
//               sectionItems.forEach(sectionItem => {
//                 if ('#' + sectionItem.fieldName === num) {
//                   var re = new RegExp(num, "gi");
//                   if (sectionItem.data === "" || sectionItem.data === undefined) {
//                     field.data = "mm/dd/yyyy";
//                   }
//                   else {
//                     field.data = s;
//                   }
//                 }
//                 if (sectionItem.fieldType.value === "lexicon list") {
//                   let listItems= sectionItem.groupGUID;
//                   listItems.forEach(listItem => {
//                     if ('#' + listItem.fieldName === num) {
//                       var re = new RegExp(num, "gi");
//                       if (listItem.data === "" || listItem.data === undefined) {
//                         field.data = "";
//                       }
//                       else {
//                         field.data = gender.toString();
//                       }
//                     }
//                   })
//                 }
//               })
//             }
//             else {
//               if ('#' + res.fieldName === num) {
//                 var re = new RegExp(num, "gi");
//                 if (res.data === "" || res.data === undefined) {
//                   res.data = calc.replace(re, "0");
//                 }
//                 else {
//                   res.data = calc.replace(re, res.data.toString());
//                 }
//               }
//             }
//           });
//         });
//       }
//       //field.data = eval(calc).toFixed(2);
//           //field.data = idnumber;
//       }
//     });
// }


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
        field.data = eval(calc).toFixed(2);
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
            data.forEach(res => {
              if ('#' + res.fieldName === num) {
                var re = new RegExp(num, "gi");
                if (res.data === "" || res.data === undefined || res.data == null) {
                  calc = calc.replace(re, "0");
                }
                else {
                  calc = calc.replace(re, res.data.toString());
                }
              }
            });
          });
        }
        field.data = eval(calc).toFixed(2);
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

  fieldEmbeddedForm(item: any) {
    this.tabIndex = 1;
    localStorage.setItem('fieldEmbeddedForm', item.questionName + '(' + item.fieldName + ')');
  }



}
