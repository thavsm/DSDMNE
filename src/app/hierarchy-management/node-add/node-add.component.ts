import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HierarchyManagementService } from 'src/app/hierarchy-management.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { TreediagramService } from 'src/app/treediagram.service';
import { Observable } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { merge } from 'jquery';
import { FormControl } from '@angular/forms';
import { DropDownListComponent } from "@progress/kendo-angular-dropdowns";
import { ReplaySubject, Subject } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';

declare var $: any;

@Component({
  selector: 'app-node-add',
  templateUrl: './node-add.component.html',
  styleUrls: ['./node-add.component.css']
})

// export interface Indicator {
//   indicatorID: number;
//   indicatorName: string;
// }

export class NodeAddComponent implements OnInit {

  Indicators: any = [];

  IndicatorControl = new FormControl();
  IndicatorFilterCtrl = new FormControl();
  IndicatorfilteredOptions: any = [];
  //protected indicator: Indicator[] = this.Indicators;
  submitted = false;
  NodeAdd: any;
  levels: any = [];
  AllLevels: any = [];
  nodes: any = [];
  FacilityTypes: any = [];
  FormFields: any[];
  treeData: any;
  index: any;
  level: any;
  Form: any = [];
  divForm: boolean = false;
  divFormField: boolean = false;
  divIsFacility: boolean = false;
  FormCategory: any = [];
  isIndicatorlevel: any;
  NodeRes:any=[];
  protected _onDestroy = new Subject<void>();
  /** list of banks filtered by search keyword */
  //public filteredBanks: ReplaySubject<Indicator[]> = new ReplaySubject<Indicator[]>(1);

  constructor(
    public dialogRef: MatDialogRef<NodeAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,

  private service: HierarchyManagementService, public userService: UserService, private Treeservice: TreediagramService, public formBuilder: FormBuilder, private spinner: NgxSpinnerService, private treediagramService: TreediagramService
  ) {
    this.NodeAdd = data;
    this.treeData = JSON.parse(localStorage.getItem('treeData') || '{}');
  }

  FormFieldsByFieldID: any;
  SelectedForm: any;
  nodeID: number = 0;
  nodeName: string = "";
  nodeParentD: number = null;
  levelID: number = 0;
  status: string = "";
  nodeDescription: string = "";
  SelectednodeParentD: number = null;
  divIsNotIndicator: boolean = true;
  divIsIndicator: boolean = false;
  IsFacility:  number = 0;
  userData: any;
  provID: any;

  ngOnInit(): void {

    this.nodeID = this.NodeAdd.nodeID;
    this.nodeName = this.NodeAdd.nodeName;
    this.nodeParentD = this.NodeAdd.nodeParentD;
    this.levelID = this.NodeAdd.levelID;
    this.nodeDescription = this.NodeAdd.nodeDescription;
    this.NodeAdd.indicatorID = 0;
    this.NodeAdd.fName = "";
    this.NodeAdd.FormName = "";

   
    this.getLevels();
    
    this.getFormCategory();

    this.service.getFacilityTypes().subscribe(data => {
      this.spinner.show();
      this.FacilityTypes = data;
      this.spinner.hide();
    });

    this.getIndicators();

  }


  public filteredIndicators;
  public filteredParents;
  public filteredFormFields;
  getFormCategory() {
    this.spinner.show();
    this.Treeservice.getformCategoryList().subscribe(data => {
      this.FormCategory = data;

      this.spinner.hide();
    });
  }

  onformCategoryChange(ob) {
    this.spinner.show();
    this.Treeservice.GetFormCategoryId(ob.value).subscribe(data => {
      this.Form = data;
      this.spinner.hide();
      this.divForm = true;
    });
  }

  onformChange(ob) {
    this.spinner.show();
    this.Treeservice.GetFormFieldsByFormId(ob.value).subscribe(data => {
      this.FormFields = data;
      this.filteredFormFields = this.FormFields.slice();
      this.spinner.hide();
      this.divFormField = true;
    });

    this.SelectedForm = this.Form.find(i => i.formID === ob.value);
  }



  onLevelChange(ob) {
    this.spinner.show();
    this.getNodes(ob.value, ob.index);

    this.service.getIsIndicatorLevelbyLevelID(ob.value).subscribe(data => {
      if (data[0].isIndicatorLevel == 1) {
        this.divIsNotIndicator = false;
        this.divIsIndicator = true;
      } else {
        this.divIsNotIndicator = true;
        this.divIsIndicator = false;
      }

      if (data[0].isFacilityLevel == 1) {
        this.divIsFacility = true;
        this.IsFacility = 1;
      } else {
        this.divIsFacility = false;
        this.IsFacility = 0;
      }

      this.spinner.hide();
    });
  }

  onformfieldChange(ob) {
    this.spinner.show();
    this.Treeservice.GetFormFieldsByFieldID(ob.value).subscribe(data => {
      this.FormFieldsByFieldID = data;
      this.spinner.hide();
    });
  }

  addNode() {

    if (this.NodeAdd.nodeID == 0) {
      this.SelectednodeParentD = null;
    } else {
      this.SelectednodeParentD = this.NodeAdd.nodeID;
    }


    if (this.NodeAdd.indicatorID != 0) {

      var values = {
        "treeID": this.treeData.treeID,
        "nodeParentD": this.SelectednodeParentD,
        "levelID": this.NodeAdd.levelID,
        "indicatorID": this.NodeAdd.indicatorID,
        "fieldID": 0,
        "formID": 0,
        "tableName": ""
      };

      this.spinner.show();
      this.treediagramService.addIndicatorNode(values).subscribe(data => {
        // this.dialogRef.close();
        this.spinner.hide();
        this.showNotification('top', 'center', 'Node added successfully!', '', 'success');
        this.NodeAdd.levelID = "";
        this.NodeAdd.nodeID = "";
        this.NodeAdd.indicatorID = "";
        this.NodeAdd.FormCategory = "";
        this.NodeAdd.FormName = "";
        this.NodeAdd.fName = "";
        this.NodeAdd.nodeName = "";
        this.NodeAdd.nodeDescription = "";
        this.divIsNotIndicator = true;
        this.divIsIndicator = false;
        this.treediagramService.getNodes(this.treeData.treeID, this.provID);
      });

    } else {
      if (this.NodeAdd.nodeName != "") {
        //adding form
        this.submitted = true;

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
          this.NodeRes = res;

          if(this.IsFacility == 1){
            var values = {
              "nodeID": this.NodeRes.nodeID,
              "facilityTypeID": this.NodeAdd.FaciltyID
            }
  
            this.spinner.show();
            this.service.InsertUpdateNodeRoleFacilityType(values).subscribe(res => {
            });
  
          }

          //this.dialogRef.close();
          this.spinner.hide();
          this.showNotification('top', 'center', 'Node added successfully!', '', 'success');
          this.NodeAdd.levelID = "";
          this.NodeAdd.nodeID = "";
          this.NodeAdd.indicatorID = "";
          this.NodeAdd.FormCategory = "";
          this.NodeAdd.FormName = "";
          this.NodeAdd.fName = "";
          this.NodeAdd.nodeName = "";
          this.NodeAdd.nodeDescription = "";
          this.NodeAdd.FaciltyID = "";
          this.divIsFacility = false;
          this.divIsNotIndicator = true;
          this.divIsIndicator = false;
          this.treediagramService.getNodes(this.treeData.treeID, this.provID);
        });
        // this.NodeAdd.nodeID = 0;
        // this.NodeAdd.nodeName = " ";
        // this.NodeAdd.nodeParentD = null;
        // this.NodeAdd.levelID = " ";
        // this.NodeAdd.nodeDescription = " ";
        // this.status = "1";
      }
      else {
        this.showNotification('top', 'center', 'Please add a node name before saving!', '', 'danger');
      }
    }
  }

  closePopup() {
    this.dialogRef.close();
  }
  getLevels() {
    this.spinner.show();
    this.service.getLevelsList(this.treeData.treeID).subscribe(data => {
      this.levels = data;
      this.spinner.hide();

      
      this.userService.getUserProfile().subscribe(udata => {
      
        this.userData = udata['formData'];
        this.provID = this.userData["provinceID"]; 
  
        // if(this.provID != 0 && this.treeData.treeID == 4093)
         //National Tree
        if(this.provID != 0 && this.treeData.treeID == 4093)
        {

          let indexNationalNode = this.levels.findIndex(d => d.levelID === 4311); //find index in your array
          this.levels.splice(indexNationalNode, 1);//remove element from array

          let indexBranchNode = this.levels.findIndex(d => d.levelID === 4312); //find index in your array
          this.levels.splice(indexBranchNode, 1);//remove element from array

          let indexChiefDirectorateNode = this.levels.findIndex(d => d.levelID === 4313); //find index in your array
          this.levels.splice(indexChiefDirectorateNode, 1);//remove element from array

          let indexDirectorateNode = this.levels.findIndex(d => d.levelID === 4314); //find index in your array
          this.levels.splice(indexDirectorateNode, 1);//remove element from array

        
        }
        //Provincial Tree
        if(this.provID != 0 && this.treeData.treeID == 5099)
        {
          let indexProgramNode = this.levels.findIndex(d => d.levelID === 5350); //find index in your array
          this.levels.splice(indexProgramNode, 1);//remove element from array

          let indexSubProgramNode = this.levels.findIndex(d => d.levelID === 5351); //find index in your array
          this.levels.splice(indexSubProgramNode, 1);//remove element from array

          let indexSubIndicatorNode = this.levels.findIndex(d => d.levelID === 5376); //find index in your array
          this.levels.splice(indexSubIndicatorNode, 1);//remove element from array
     
     
        }

      });

      if(this.treeData.treeID == 4082){
        let indexNational = this.levels.findIndex(d => d.levelID === 4260); //find index in your array
        this.levels.splice(indexNational, 1);//remove element from array
  
        let indexProvincial = this.levels.findIndex(d => d.levelID === 4261); //find index in your array
        this.levels.splice(indexProvincial, 1);//remove element from array
      }
    });
  }

  getIndicators() {
    this.userService.getUserProfile().subscribe(data => {
      
      this.userData = data['formData'];
      this.provID = this.userData["provinceID"]; 

      this.spinner.show();
      this.service.getIndicatorNodesByUserProvinceID(this.provID).subscribe(data => {
        this.Indicators = data;
        this.filteredIndicators = this.Indicators.slice();
        this.spinner.hide();
      });
    });
  }

  getNodes(levelID, index) {
    this.spinner.show();
    this.service.getLevelsList(this.treeData.treeID).subscribe(data => {
      this.AllLevels = data;
      this.index = this.AllLevels.findIndex(x => x.levelID === levelID);
      this.level = this.AllLevels.filter(item => item)[this.index - 1];
  
      this.service.getNodes(this.level.levelID).subscribe(data => {
        this.nodes = data;
        this.filteredParents = this.nodes.slice();
        this.spinner.hide();
      });
      this.spinner.hide();
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

}
