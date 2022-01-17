import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LevelAddComponent } from '../hierarchy-management/level-add/level-add.component';
import { LevelNodeEditComponent } from '../hierarchy-management/level-node-edit/level-node-edit.component';
import { NodeAddComponent } from '../hierarchy-management/node-add/node-add.component';

import { TreediagramService } from '../treediagram.service';


export interface FormDataLevel {
  levelName: string;
  description: string;
}
export interface FormDataNode {
  nodeName: string;
  description: string;
}
@Component({
  selector: 'app-treediagram',
  templateUrl: './treediagram.component.html',
  styleUrls: ['./treediagram.component.css']
})

export class TreediagramComponent implements OnInit {


  public treenodes: Observable<any[]> | any;
  treeData: any;
  NodeAdd: any;
  levelAdd:  any;
  NodeData: any;
  NodeLevelName: any;

  constructor(public dialog: MatDialog,private treediagramService: TreediagramService) {
    this.treeData = JSON.parse(localStorage.getItem('treeData') || '{}');
  }

  public ngOnInit(): void {
    // this.treenodes = this.treediagramService.fetchNodes();
    this.treenodes = this.treediagramService.getNodes(this.treeData.treeID);

    this.treediagramService.getNodes(this.treeData.treeID).subscribe(data => {
      this.NodeLevelName  = data;
   });
  }
 
  openDialogEdit(event){
    
    this.NodeData = {
      nodeID: event.dataItem.nodeID,
      levelID: event.dataItem.levelID, 
      role:  "",
      levelName: event.dataItem.levelName,
      levelDescription: event.dataItem.levelDescription,
      fieldName: "",
      fieldQuestion: "",
      fieldDescription: "",
      fieldXML: "",
      fieldTypeID: 0,
      Tooltip: "",
      fieldCompulsory: "",
      levelfieldName : "",
      listValue: "",
      ReportUrl: "",
    }

    const dialogRef = this.dialog.open(LevelNodeEditComponent, { width: '60%', height: '70%', data: this.NodeData, disableClose: true }

    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    //console.log(event.dataItem.nodeID);
  }

  openDialogAdd(): void {

    this.NodeAdd = {
      nodeID: 0,
      nodeName: "",
      nodeParentD: 0,
      levelID: 0,
      status: "",
      nodeDescription: ""    
    }

    const dialogRef = this.dialog.open(NodeAddComponent, { width: '60%', height: '70%', data: this.NodeAdd, disableClose: true }

    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogAddLevel(): void {

    this.levelAdd = {

      levelID: 0,
      role:  "",
      levelName: "",
      levelDescription: "",
      fieldName: "",
      fieldQuestion: "",
      fieldDescription: "",
      fieldXML: "",
      fieldTypeID: 0,
      Tooltip: "",
      fieldCompulsory: "",
      levelfieldName : "",
      listValue: "",
      ReportUrl: "",
    }

    const dialogRef = this.dialog.open(LevelAddComponent, { width: '60%', height: '90%', data: this.levelAdd, disableClose: true }

    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
