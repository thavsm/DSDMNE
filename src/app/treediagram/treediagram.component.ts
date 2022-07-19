import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LevelAddComponent } from '../hierarchy-management/level-add/level-add.component';
import { LevelNodeEditComponent } from '../hierarchy-management/level-node-edit/level-node-edit.component';
import { NodeAddComponent } from '../hierarchy-management/node-add/node-add.component';
import { TreeItemDropEvent, DropPosition, TreeItemLookup, DropAction } from '@progress/kendo-angular-treeview';
import { TreediagramService } from '../treediagram.service';
const isFile = (name: string) => name.split('.').length > 1;

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
  public allParentNodes = [];
  public expandedKeys: any[] = this.allParentNodes.slice();
  treeData: any;
  NodeAdd: any;
  levelAdd:  any;
  NodeData: any;
  NodeLevelName: any;
  ParentNode: any;
  divDsiplay: boolean = false;
  tdAddNode : boolean  = true;
  tdAddLevel : boolean  = true;
  treeViewEdit: any;

  constructor(public dialog: MatDialog,private treediagramService: TreediagramService) {
    this.treeData = JSON.parse(localStorage.getItem('treeData') || '{}');
  }

  public ngOnInit(): void {
    // this.treenodes = this.treediagramService.fetchNodes();
    this.treenodes = this.treediagramService.getNodes(this.treeData.treeID); 
    this.getAllParentTextProperties(this.treenodes);
    this.treediagramService.getNodes(this.treeData.treeID).subscribe(data => {
      this.NodeLevelName  = data;
   });

   this.hideEditButtons();
  }
 

  hideEditButtons(){

    if(this.treeData.ViewEdit == 1){

      this.tdAddNode = true;  
      this.tdAddLevel = true;  

    }else if(this.treeData.ViewEdit == 0){

      this.tdAddNode = false;  
      this.tdAddLevel = false
      ;  
    }

    if(this.treeData.TreeCategoryID == 2){

      this.tdAddLevel = false;  

    }
  }
  openDialogEdit(event){
  
    this.ParentNode = this.NodeLevelName.find(item => item.nodeID ===  event.dataItem.nodeParentD);

    if(this.ParentNode === undefined ){

      this.ParentNode = {
        nodeName: ""
      };

    }
    
    this.NodeData = {
      nodeID: event.dataItem.nodeID,
      levelID: event.dataItem.levelID, 
      ParentNodeName: this.ParentNode.nodeName,
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
      nodeParentD: event.dataItem.nodeParentD,
      nodeName: event.dataItem.nodeName,
      nodeDescription: event.dataItem.nodeDescription,
      ViewEdit:this.treeData.ViewEdit,
      IsIndicatorLevel:event.dataItem.isIndicatorLevel,
      indicatorID: event.dataItem.indicatorID,
      IsFacilityLevel: event.dataItem.isFacilityLevel,
      FaciltyID: 0
    }

    const dialogRef = this.dialog.open(LevelNodeEditComponent, { width: '70%', data: this.NodeData, disableClose: true }

    );

    dialogRef.afterClosed().subscribe(result => {
      this.treenodes = this.treediagramService.getNodes(this.treeData.treeID);
      console.log('The dialog was closed');
    });

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

    const dialogRef = this.dialog.open(NodeAddComponent, { width: '60%',  data: this.NodeAdd, disableClose: true }

    );

    dialogRef.afterClosed().subscribe(result => {
      this.treenodes = this.treediagramService.getNodes(this.treeData.treeID);
      console.log('The dialog was closed');
    });
  }

  public expandNodes() {
    this.expandedKeys = this.allParentNodes.slice();
  }

  public collapseNodes() {
    this.expandedKeys = [];
    // this.treenodes = this.treediagramService.getNodes(this.treeData.treeID);
  }


  public getAllParentTextProperties(items: Array<any>) {
    items.forEach((data) => {
      if (data) {
        data.forEach((i) => {
          this.allParentNodes.push(i.levelNameNodeName);
        });
        this.getAllParentTextProperties(data);
      }
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

    const dialogRef = this.dialog.open(LevelAddComponent, { width: '60%',  data: this.levelAdd, disableClose: true }

    );

    dialogRef.afterClosed().subscribe(result => {
      this.treenodes = this.treediagramService.getNodes(this.treeData.treeID);
      console.log('The dialog was closed');
    });
  }
}
