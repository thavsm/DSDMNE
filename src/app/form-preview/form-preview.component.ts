import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import Swal from 'sweetalert2'
import { merge } from 'jquery';
import { FormDesignerComponent } from '../form-design/form-designer.component';
import { SignaturePad } from 'angular2-signaturepad';
declare var $: any;

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent implements OnInit {

  panelOpenState = false;

  formDesign: any = [];

  pages: any = [];

  tabIndex = 0;

  currentPage: any = [];

  firstPage: any = [];

  lastPage: any = [];

  formData: any = [];

  selected = -1;

  dataToSave: any = [];

  signatureImg: string;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 760,
    'canvasHeight': 70
  };

  constructor(private service: FormbuilderService, private spinner: NgxSpinnerService, public dialogRef: MatDialogRef<FormDesignerComponent>) {
    this.formData = JSON.parse(localStorage.getItem('formPreviewDetails') || '{}');
    this.tabIndex = 0;
  }

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';

  ngAfterViewInit() {
    // this.signaturePad.clear(); 
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    //this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    localStorage.setItem('cloneNumberForEdit', "0");
    this.refreshPageList();
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
    }
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
      this.showNotification('top', 'center', 'There are no more pages for this form!', '', 'warning');
    }
  }

  refreshPageList() {
    this.service.getFormPages(this.formData.formID).subscribe(data => {
      this.pages = data;
      this.getDesignPerPage(this.pages[0].pageGUID);
      this.currentPage = this.pages[0];
      this.firstPage = this.pages[0];
      this.lastPage = Object.keys(this.pages).length;
    });
  }

  getDesignPerPage(pageGUID: any) {
    this.spinner.show();
    this.service.getFormFieldsPerPage(this.formData.formID, pageGUID).subscribe(formFields => {
      this.formDesign = formFields;

      this.formDesign.forEach((element, index) => {
        element.fieldStyles[0].height = Math.ceil(parseInt(element.fieldStyles[0].height) / 23.2);
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

          this.service.getFieldsInGroup(element.groupGUID).subscribe(groupFields => {
            children = groupFields;

            children.forEach((field, i) => {
              field.fieldStyles[0].height = Math.ceil(parseInt(element.fieldStyles[0].height) / 23.2);
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
                    subField.fieldStyles[0].height = Math.ceil(parseInt(element.fieldStyles[0].height) / 23.2);
                    if (subField.fieldType.value === "repeatgroup") {
                      this.service.getGroupTableData(subField.groupGUID, this.formData.formCaptureID).subscribe(resultant => {

                        subField["groupTableList"] = resultant;
                      });
                    }

                    if (subField.listValue !== "") {
                      subChildren[j].listValue = this.splitString(subField.listValue);
                    }
                    if (subField.groupGUID !== "" && subField.groupGUID !== "string") {
                      let groupChildren: any[] = [];
                      this.service.getFieldsInGroup(subField.groupGUID).subscribe(res => {
                        groupChildren = res;

                        groupChildren.forEach((groupField, k) => {
                          groupField.fieldStyles[0].height = Math.ceil(parseInt(element.fieldStyles[0].height) / 23.2);
                          if (groupField.fieldType.value === "repeatgroup") {
                            this.service.getGroupTableData(groupField.groupGUID, this.formData.formCaptureID).subscribe(resultant => {

                              groupField["groupTableList"] = resultant;
                            });
                          }
                          if (subField.listValue !== "") {
                            subChildren[k].listValue = this.splitString(groupField.listValue);
                          }
                          if (groupField.groupGUID !== "" && groupField.groupGUID !== "string") {
                            this.service.getFieldsInGroup(groupField.groupGUID).subscribe(groupdata => {
                              groupChildren[k].groupGUID = groupdata;
                            });
                          }
                        });
                        subChildren[j].groupGUID = groupChildren;
                      });
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
      console.log(JSON.stringify(this.formDesign));
      this.spinner.hide();
    });
  }
  //#endregion

  //#region group methods
  addRepeat(data: any) {

  }

  editRepeat(data: any, cloneNum: any, groupGUID: any) {

  }

  deleteClone(cloneNum: any, groupGUID: any) {

  }
  //#endregion

  splitString(text: string): any[] {
    let values = text.split(",");
    let obj2: any = [];
    values.forEach(listV => {
      let obj = {
        name: listV,
        value: listV
      }
      obj2.push(obj);
    });
    return obj2;
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


