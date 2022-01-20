import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormAddComponent } from 'src/app/form-list/form-add/form-add.component';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import Swal from 'sweetalert2'
import { merge } from 'jquery';
import { SignaturePad } from 'angular2-signaturepad';
import { AddSignatureComponent } from './add-signature.component';
declare var $: any;

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  panelOpenState = false;

  formDesign: any = [];

  pages: any = [];

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
    'canvasHeight': 150
  };

  constructor(public dialog: MatDialog, private service: FormbuilderService, private spinner: NgxSpinnerService, public dialogRef: MatDialogRef<FormAddComponent>) {
    this.formData = JSON.parse(localStorage.getItem('formCaptureDetails') || '{}');
  }

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';

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
    var errorMessage = "Please fill in ";

    if (this.formData.state === 'add') {

      let obj = this.formDesign;
      obj.forEach(field => {

        if (field.groupGUID != "" && field.groupGUID != "string") {
          let sectionValues = field.groupGUID;
          sectionValues.forEach(element => {
            element.listValue = "";
            element.groupGUID = "";
            if (element.fieldType.value === "lexicon data") {
              let val = element.data;
              let s = "";
              val.forEach(listValue => {
                s += s + listValue.name + ","
              });
              element.data = s;
            }
            if (element.fieldValidations[0].isRequired === true && element.data === "") {
              errorMessage = errorMessage + element.questionName + ",";
            }
          });
          if (errorMessage === "Please fill in ") {
            this.service.saveFormMetadata(this.formData.formCaptureID, sectionValues).subscribe(res => {
              this.showNotification('top', 'center', 'Page data has been saved Successfully!', 'Success.', 'success');
              errorMessage = "Please fill in ";
              this.getDesignPerPage(this.currentPage.pageGUID);
            });
          }
          else {
            this.showNotification('top', 'center', errorMessage, 'Error.', 'danger');
          }
        }
        else {
          field.listValue = "";
          field.groupGUID = "";
          if (field.fieldType.value === "lexicon data") {
            let val = field.data;
            let s = "";
            val.forEach(listValue => {
              s += s + listValue.name + ","
            });
            field.data = s;
          }
          if (field.fieldValidations[0].isRequired === true && field.data === "") {
            errorMessage = errorMessage + field.questionName + ",";
          }
        }
      });
      if (errorMessage === "Please fill in ") {
        this.service.saveFormMetadata(this.formData.formCaptureID, this.formDesign).subscribe(res => {
          this.showNotification('top', 'center', 'Page data has been saved Successfully!', 'Success.', 'success');
          this.getDesignPerPage(this.currentPage.pageGUID);
          errorMessage = "Please fill in ";
        });
      }
      else {
        this.showNotification('top', 'center', errorMessage, 'Error.', 'danger');
      }
    }
    else {
      let obj = this.formDesign;
      obj.forEach(field => {
        if (field.groupGUID != "" && field.groupGUID != "string") {
          let sectionValues = field.groupGUID;
          sectionValues.forEach(element => {
            element.listValue = "";
            element.groupGUID = "";
            if (element.fieldType.value === "lexicon data") {
              let val = element.data;
              let s = "";
              if(!this.isString(val)){
                val.forEach(listValue => {
                  s = s + listValue.name + ","
                });
                field.data = s;
              }
            }
            if (element.fieldValidations[0].isRequired === true && element.data === "") {
              errorMessage = errorMessage + element.questionName + ",";
            }
          });
          if (errorMessage === "Please fill in ") {
            this.service.UpdateFormMetadata(this.formData.formCaptureID, sectionValues).subscribe(res => {
              this.showNotification('top', 'center', 'Page data has been saved Successfully!', 'Success.', 'success');
              this.getDesignPerPage(this.currentPage.pageGUID);
              errorMessage = "Please fill in ";
            });
          }
          else {
            this.showNotification('top', 'center', errorMessage, 'Error.', 'danger');
          }

        }
        else {
          field.listValue = "";
          field.groupGUID = "";
          if (field.fieldType.value === "lexicon data") {
            let val = field.data;
            let s = "";
            if(!this.isString(val)){
              val.forEach(listValue => {
                s = s + listValue.name + ","
              });
              field.data = s;
            }
          }
          if (field.fieldValidations[0].isRequired === true && field.data === "") {
            errorMessage = errorMessage + field.questionName + ",";
          }
        }
      });
      if (errorMessage === "Please fill in ") {
        this.service.UpdateFormMetadata(this.formData.formCaptureID, this.formDesign).subscribe(res => {
          this.showNotification('top', 'center', 'Page data has been updated Successfully!', 'Success.', 'success');
          this.getDesignPerPage(this.currentPage.pageGUID);
          errorMessage = "Please fill in ";
        });
      }
      else {
        this.showNotification('top', 'center', errorMessage, 'Error.', 'danger');
      }
    }
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
            alert(this.formDesign[index].listValue);
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
                      if (subField.groupGUID !== "" && subField.groupGUID !== "string") {
                        let groupChildren: any[] = [];
                        this.service.getFieldsInGroup(subField.groupGUID).subscribe(res => {
                          groupChildren = res;

                          subField.fieldStyles[0].height = Math.ceil(parseInt(subField.fieldStyles[0].height) / 23.2);

                          groupChildren.forEach((groupField, k) => {
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
        }

        if (this.formData.state === 'edit') {
          if (element.fieldType.value !== "subSection" && element.fieldType.value !== "section" && element.fieldType.value !== "repeatgroup" && element.fieldType.value !== "attachment" && element.fieldType.value !== "PageTitle" && element.parentFieldName === "") {
            this.service.getMetadataValue(pageGUID, (element.questionName).split(/\s/).join(''), this.formData.formCaptureID).subscribe(res => {
              if (element.fieldType.value === "checkbox") {
                element["data"] = Boolean(JSON.parse(res));
              }
              else {
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

              if (element.fieldType.value !== "subSection" && element.fieldType.value !== "section" && element.fieldType.value !== "repeatgroup" && element.fieldType.value !== "attachment" && element.fieldType.value !== "PageTitle") {
                this.service.getMetadataValue(pageGUID, (element.questionName).split(/\s/).join(''), this.formData.formCaptureID).subscribe(res => {
                  if (element.fieldType.value === "checkbox") {
                    element["data"] = Boolean(JSON.parse(res));
                  }
                  else {
                    element["data"] = res;
                  }
                });
              }


              children.forEach((field, i) => {
                if (field.fieldType.value !== "subSection" && field.fieldType.value !== "section" && field.fieldType.value !== "repeatgroup" && field.fieldType.value !== "attachment" && field.fieldType.value !== "PageTitle") {
                  this.service.getMetadataValue(pageGUID, (field.questionName).split(/\s/).join(''), this.formData.formCaptureID).subscribe(res => {
                    if (field.fieldType.value === "checkbox") {
                      field["data"] = Boolean(JSON.parse(res));
                    }
                    else {
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
                      if (subField.fieldType.value !== "subSection" && subField.fieldType.value !== "section" && subField.fieldType.value !== "repeatgroup" && subField.fieldType.value !== "attachment" && subField.fieldType.value !== "PageTitle" && subField.parentFieldName === "") {
                        this.service.getMetadataValue(pageGUID, (subField.questionName).split(/\s/).join(''), this.formData.formCaptureID).subscribe(res => {
                          if (subField.fieldType.value === "checkbox") {
                            subField["data"] = Boolean(JSON.parse(res));
                          }
                          else {
                            subField["data"] = res;
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
                      if (subField.groupGUID !== "" && subField.groupGUID !== "string") {
                        let groupChildren: any[] = [];
                        this.service.getFieldsInGroup(subField.groupGUID).subscribe(res => {
                          groupChildren = res;

                          groupChildren.forEach((groupField, k) => {

                            if (groupField.fieldType.value !== "subSection" && groupField.fieldType.value !== "section" && groupField.fieldType.value !== "repeatgroup" && groupField.fieldType.value !== "attachment" && groupField.fieldType.value !== "PageTitle" && groupField.parentFieldName === "") {
                              this.service.getMetadataValue(pageGUID, (groupField.questionName).split(/\s/).join(''), this.formData.formCaptureID).subscribe(res => {
                                if (groupField.fieldType.value === "checkbox") {
                                  groupField["data"] = Boolean(JSON.parse(res));
                                }
                                else {
                                  groupField["data"] = res;
                                }
                              });
                            }

                            groupField.fieldStyles[0].height = Math.ceil(parseInt(groupField.fieldStyles[0].height) / 23.2);

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
        }


      });
      console.log(JSON.stringify(this.formDesign));
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
      });
    }
    else {
      data.forEach(field => {
        field.listValue = "";
      });
      this.service.UpdateGroupMetadata(this.formData.formCaptureID, data[0].parentFieldName, localStorage.getItem('cloneNumberForEdit'), data).subscribe(res => {
        this.showNotification('top', 'center', 'Repeat data has been updated Successfully!', 'Success.', 'success');
        localStorage.setItem('cloneNumberForEdit', "0");
        this.spinner.hide();
        this.getDesignPerPage(this.currentPage.pageGUID);
      });
    }
  }

  editRepeat(data: any, cloneNum: any, groupGUID: any) {
    localStorage.setItem('cloneNumberForEdit', cloneNum);
    data.forEach(field => {
      if (field.fieldType.value !== "subSection") {
        this.service.getMetadataValuePerGroup(groupGUID, (field.questionName).split(/\s/).join(''), this.formData.formCaptureID, cloneNum).subscribe(res => {
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

   isString(value:any) {
    return typeof value === 'string' || value instanceof String;
  }
}


