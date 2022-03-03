import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HierarchyManagementService } from 'src/app/hierarchy-management.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import { TreediagramService } from 'src/app/treediagram.service';
import Swal from 'sweetalert2';
import { merge } from 'jquery';
declare var $: any;

@Component({
  selector: 'app-node-add',
  templateUrl: './node-add.component.html',
  styleUrls: ['./node-add.component.css']
})
export class NodeAddComponent implements OnInit {

  submitted = false;
  NodeAdd: any;
  levels:any=[];
  nodes:any=[];
  treeData: any;
  index: any;
  level: any;

  constructor(
    public dialogRef: MatDialogRef<NodeAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    
    private service: HierarchyManagementService, public formBuilder: FormBuilder,private spinner: NgxSpinnerService, private treediagramService: TreediagramService
  ) {
    this.NodeAdd = data;
    this.treeData = JSON.parse(localStorage.getItem('treeData') || '{}');
  }


  nodeID: number = 0;
  nodeName: string = "";
  nodeParentD: number = null;
  levelID: number = 0;
  status: string = "";
  nodeDescription: string = "";
  SelectednodeParentD: number = null;
 

  ngOnInit(): void {
    

    this.nodeID = this.NodeAdd.nodeID;
    this.nodeName = this.NodeAdd.nodeName;
    this.nodeParentD = this.NodeAdd.nodeParentD;
    this.levelID = this.NodeAdd.levelID;
    this.nodeDescription = this.NodeAdd.nodeDescription;
    this.getLevels();
    //this.treediagramService.getNodes(this.treeData.treeID);
    //this.getNodes(this.NodeAdd.levelID);

  }

  onLevelChange(ob) {    
    this.getNodes(ob.value, ob.index);
  }

  addNode() {
    if (this.NodeAdd.nodeName != "") {
      //adding form
      this.submitted = true;   

      if(this.NodeAdd.nodeID == 0){
        this.SelectednodeParentD = null;
      }else{
        this.SelectednodeParentD = this.NodeAdd.nodeID;
      }

      
      var val = {
        "nodeID": 0,
        "nodeName": this.NodeAdd.nodeName,
        "nodeParentD": this.SelectednodeParentD,
        "levelID": this.NodeAdd.levelID,
        "nodeDescription": this.NodeAdd.nodeDescription,
        "status": "1"
      };
      this.spinner.show();
      this.service.addNode(val).subscribe(res => {
        this.dialogRef.close();
        this.spinner.hide();
        this.showNotification('top', 'center', 'Node Added Successfully!', 'Success', 'success');          
        this.treediagramService.getNodes(this.treeData.treeID);
      });

      this.NodeAdd.nodeID = 0;
      this.NodeAdd.nodeName = " ";
      this.NodeAdd.nodeParentD = null;
      this.NodeAdd.levelID = " ";
      this.NodeAdd.nodeDescription = " ";
      this.status = "1";
    }
    else {
      this.showNotification('top', 'center', 'Please add a Node name before saving!', '', 'danger');
    }
  }


  getLevels(){
    this.spinner.show();   
    this.service.getLevelsList(this.treeData.treeID).subscribe(data => {
         this.levels = data;
         this.spinner.hide();
    });
  }

  getNodes(levelID, index){
    this.spinner.show();
    this.index = this.levels.findIndex(x => x.levelID === levelID); 
    this.level = this.levels.filter(item => item)[this.index - 1];
    if (this.index > 0) {
      this.service.getNodes(this.level.levelID).subscribe(data => {
        this.nodes = data;       
    });   
  }
     this.spinner.hide();
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

}