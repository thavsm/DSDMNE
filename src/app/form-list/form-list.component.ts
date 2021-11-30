import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router'; 

export interface FormData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  constructor(public dialog: MatDialog,private route:Router) { }

  form:any;
  formList=[{Name:"Test Form 1",Description:"Test form one"},{Name:"Test Form 2",Description:"Test form two"}];

  ngOnInit(): void {
  }
  
  clickDelete(item:any) {
    if (confirm('Are you sure you want to delete '+item.Name+' ?')) { 
      
    }
  }

  openFormDesign(item:any):void {
    this.route.navigate(['formDesign']);
  }

  clickEdit(item:any) {
    this.form=item;
    const dialogRef = this.dialog.open(formEdit, {
      width: '500px',
      height:'400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(formAdd, {
      width: '500px',
      height:'400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

//#region Form Add

@Component({
  selector: 'formAdd',
  templateUrl: './formAdd.html',
})
export class formAdd implements OnInit
{

  constructor(
    public dialogRef: MatDialogRef<formAdd>,
    @Inject(MAT_DIALOG_DATA) public data: FormData,
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

//#endregion

//#region Form Edit

@Component({
  selector: 'formEdit',
  templateUrl: './formEdit.html',
})
export class formEdit implements OnInit
{

  @Input() form: any;
  Name:string="";
  Description:string="";
  constructor(
    public dialogRef: MatDialogRef<formEdit>,
    @Inject(MAT_DIALOG_DATA) public data: FormData,
  ) {}

  ngOnInit(): void {
    console.log(this.form);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

//#endregion