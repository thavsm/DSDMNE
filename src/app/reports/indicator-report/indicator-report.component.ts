import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { HierarchyManagementService } from 'src/app/hierarchy-management.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { FormControl } from '@angular/forms';
import { TreediagramService } from 'src/app/treediagram.service';
import { generateTable, generateHTMLTable, generateExcel, parseDataToSchema } from 'json5-to-table';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

export interface lexdata {
  name: string;
  value: string;
}

@Component({
  selector: 'app-indicator-report',
  templateUrl: './indicator-report.component.html',
  styleUrls: ['./indicator-report.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})

export class IndicatorReportComponent implements OnInit {

  //#region  Variables

  data = [
    {
      Program: 'Programme 4: Restorative Services',
      SubProgram: 18,
      Frequency: 'Monthly',
      TotalValue: '250',
      Disaggregation: [{
        District: "District 1",
        M: '150',
        F: '100',
        Age0to18: "60",
        Age19to35: "100",
        Age36to59: "50",
        Age60plus: "40",
        Disability: "34",
        SouthAfricanCitizens: "200",
        ForeignNationals: "50"
      }]
    },
  ]

  schema = [
    { title: 'Program', path: 'Program' },
    { title: 'Sub Program', path: 'SubProgram' },
    { title: 'Frequency', path: 'Frequency' },
    { title: 'Total Value', path: 'TotalValue' },
    {
      title: 'Frequency', path: 'Frequency', props: [
        { title: 'District', path: 'District' },
      ]
    },
  ]

  date = new FormControl(moment());
  indicatorList: any[];
  assignedIndicators: any[];
  assignedBranch: any[];
  assignedDirectorate: any[];
  assignedChiefDirectorate: any[];
  tree: any;
  treeList: any[];
  hideElementN: boolean = true;
  hideElementP: boolean = true;
  hideElementCD: boolean = false;
  hideElementD: boolean = false;
  branches: any[];
  chiefDirectorates: any[];
  Directorates: any[];
  hideElementSP: boolean = false;
  assignedSubProgram: any[];
  assignedProgram: any[];
  SubProgram: any[];
  Program: any[];
  assignedFacility: any[];
  assignedDistricts: any[];
  assignedProvinces: any[];
  assignedServicePoint: any[];
  facilities: any[];
  provinces: any[];
  districts: any[];
  servicePoint: any[];
  hideElementFacility: boolean = false;
  hideElementProv: boolean = false;
  hideElementDist: boolean = false;
  hideElementService: boolean = false;

  assignedMonth: any;
  months: lexdata[] = [{ name: "January", value: "1" },
  { name: "February", value: "2" },
  { name: "March", value: "3" },
  { name: "April", value: "4" },
  { name: "May", value: "5" },
  { name: "June", value: "6" },
  { name: "July", value: "7" },
  { name: "August", value: "8" },
  { name: "September", value: "9" },
  { name: "October", value: "10" },
  { name: "November", value: "11" },
  { name: "December", value: "12" }];

  assignedView: any;
  view: lexdata[] = [{ name: "Totals", value: "T" },
  { name: "Categories", value: "C" },
  { name: "Disaggregation", value: "D" }];

  minDate: Date = new Date(2022, 0, 1);

  assignedLocation: any;
  locations: lexdata[] = [
    { name: "National", value: "National" }, { name: "Province", value: "Province" }, { name: "District", value: "District" }, { name: "Service Point", value: "Service Point" }, { name: "Facility/NPO", value: "Facility/NPO" }
  ];

  obj = [
    {
      "Program": "Programme 2: Social Welfare Services",
      "Sub-Program": "Sub-Programme 2.3: Services to Persons with Disabilities",
      "Frequency": "Annual",
      "Indicator": "Number of Provincial NPOs delivering services to person with disabilities",
      "TotalValue": "500",
      "District_1": "100",
      "District_2": "95",
      "District_3": "80",
      "District_4": "130",
      "District_5": "40",
      "District_6": "55"
    }
  ];

  obj1 = [
    {
      Program: "Programme 2: Social Welfare Services",
      "Sub-Program": "Sub-Programme 2.2: Services to Older persons",
      Frequency: "Month",
      Indicator:
        "Rand value of funds disbursed to Provincial NPOs delivering services to older persons as per funding agreements with DSD",
      Rands: "R 800 000,00",
    },
  ];
  obj2 = [
    {
      Program: "Programme 1: Administration",
      "Sub-Program": "Sub-Programme 1.2: Corporate Management Services",
      Frequency: "Month",
      Indicator:
        "Number of people recruited to participate in the EPWP Programme",
      TotalValue: "320",
      Total0: "40",
      M0: "20",
      F0: "20",
      "Age019-35": "15",
      "Age036-59": "15",
      "Age0 60+": "10",
      Disability0: "8",
      Total1: "80",
      M1: "30",
      F1: "50",
      "Age119-35": "34",
      "Age136-59": "29",
      "Age1 60+": "17",
      Disability1: "15",
      Total2: "100",
      M2: "60",
      F2: "40",
      "Age219-35": "25",
      "Age236-59": "40",
      "Age2 60+": "35",
      Disability2: "19",
      Total3: "50",
      M3: "28",
      F3: "22",
      "Age319-35": "20",
      "Age336-59": "25",
      "Age3 60+": "5",
      Disability3: "12",
      Total4: "25",
      M4: "10",
      F4: "15",
      "Age419-35": "13",
      "Age436-59": "12",
      "Age4 60+": "0",
      Disability4: "3",
      Total5: "25",
      M5: "17",
      F5: "8",
      "Age519-35": "15",
      "Age536-59": "5",
      "Age5 60+": "5",
      Disability5: "6",
    },
  ];

  obj44 = [
    {

      Frequency: "Month",
      Indicator:
        "Number of beneficiaries reached through Social and Behaviour Change Programmes",
      TotalValue: "250",
      M: "150",
      F: "100",
      "Age 0-18": "60",
      "Age 19-35": "100",
      "Age 36-59": "50",
      "Age 60+": "40",
      Disability: "34",
    },
  ];

  obj4 = [
    {
      Program: "Programme 4: Restorative Services",
      "Sub-Program": "Sub Programme 4.2: Crime Prevention & Support",
      Frequency: "Month",
      Indicator:
        "Number of persons in conflict with the law who completed diversion programmes",
      TotalValue: "250",
      M: "150",
      F: "100",
      "Age 0-18": "60",
      "Age 19-35": "100",
      "Age 36-59": "50",
      "Age 60+": "40",
      "Disability": "34",
      "South African Citizens": "200",
      "Foreign Nationals": "50",
    },
  ];
  //#endregion 

  constructor(private treeService: HierarchyManagementService, public service: TreediagramService) {

  }

  @ViewChild('picker') datePickerElement = MatDatepicker;

  ngOnInit(): void {
    this.getTrees();
    this.getAllIndicators();
    this.getBranches();
    this.getProgram();
    this.getProvinces();
    this.assignedView = ["T"];
  }

  compareFn(option1: lexdata, option2: lexdata) {
    return option1 && option2 ? option1.name === option2.name : option1 === option2;
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  //#region Fetch Data
  getTrees() {
    this.treeService.getTreeByCatergory(1).subscribe(res => {
      this.treeList = res;
    });
  };

  getAllIndicators(): void {
    this.service.getNodesLevelID(4315).subscribe(data => {
      this.indicatorList = data;
    });
  }

  getBranches() {
    this.service.getNodesLevelID(4312).subscribe(data => {
      this.branches = data;
    });
  }

  getChiefDirectorate() {
    this.service.getNodesLevelID(4313).subscribe(data => {
      this.chiefDirectorates = data;
      //this.assignedChiefDirectorate=data;
      this.chiefDirectorates = this.chiefDirectorates.filter(cd => this.filterChiefDirectorate(cd.nodeParentD) == true);
    });
  }

  getDirectorate() {
    this.service.getNodesLevelID(4314).subscribe(data => {
      this.Directorates = data;
      //this.assignedDirectorate=data;
      this.Directorates = this.Directorates.filter(d => this.filterDirectorate(d.nodeParentD) == true);
    });
  }

  getProgram() {
    this.service.getNodesLevelID(5350).subscribe(data => {
      this.Program = data;
    });
  }

  getSubProgram() {
    this.service.getNodesLevelID(5351).subscribe(data => {
      this.SubProgram = data;
      this.SubProgram = this.SubProgram.filter(sp => this.filterSubProgram(sp.nodeParentD) == true);
    });
  }

  getProvinces() {
    this.service.getNodesLevelID(4261).subscribe(data => {
      this.provinces = data;
    });
  }

  getDistrict() {
    this.service.getNodesLevelID(4262).subscribe(data => {
      this.districts = data;
      this.districts = this.districts.filter(sp => this.filterProvince(sp.nodeParentD) == true);
    });
  }

  getServicePoint() {
    this.service.getNodesLevelID(4263).subscribe(data => {
      this.servicePoint = data;
      this.servicePoint = this.servicePoint.filter(sp => this.filterDistrict(sp.nodeParentD) == true);
    });
  }

  getNPO() {
    this.service.getNodesLevelID(4264).subscribe(data => {
      this.facilities = data;
      this.facilities = this.facilities.filter(sp => this.filterServicePoint(sp.nodeParentD) == true);
    });
  }
  //#endregion

  //#region Show/Hide Values
  getSelectedTree() {
    if (this.tree != null && this.tree != undefined) {
      if (this.tree.name.includes('National')) {
        this.hideElementN = false;
        this.hideElementP = true;
      }
      else {
        this.hideElementP = false;
        this.hideElementN = true;
      }
    }
  }

  getSelectedBranch() {
    if (this.assignedBranch.length > 0) {
      this.hideElementD = false;
      this.hideElementCD = true;
      this.treeService.getIndicatorNodesByLocation(this.assignedBranch[0].nodeID).subscribe(data => {
        this.indicatorList = data;
      });
    }
    else {
      this.hideElementD = false;
      this.hideElementCD = false;
      this.getAllIndicators();
    }
    this.getChiefDirectorate();
  }

  getSelectedChiefDirectorate() {
    if (this.assignedChiefDirectorate.length > 0) {
      this.hideElementD = true;
      this.hideElementCD = true;
      this.treeService.getIndicatorNodesByLocation(this.assignedChiefDirectorate[0].nodeID).subscribe(data => {
        this.indicatorList = data;
      });
    }
    else {
      this.hideElementD = false;
      this.hideElementCD = true;
      this.getAllIndicators();
    }
    this.getDirectorate();
  }

  getSelectedDirectorate() {
    if (this.assignedDirectorate.length > 0) {
      this.treeService.getIndicatorNodesByLocation(this.assignedDirectorate[0].nodeID).subscribe(data => {
        this.indicatorList = data;
      });
    }
    else {
      this.getAllIndicators();
    }
  }

  getSelectedProgram() {
    if (this.assignedProgram.length > 0) {
      this.hideElementSP = true;
      this.treeService.getIndicatorNodesByLocation(this.assignedProgram[0].nodeID).subscribe(data => {
        this.indicatorList = data;
      });
    }
    else {
      this.hideElementSP = false;
      this.getAllIndicators();
    }
    this.getSubProgram();
  }

  getSelectedProvince() {
    this.getDistrict();
  }

  getSelectedDistrict() {
    this.getServicePoint();
  }

  getSelectedServicePoint() {
    this.getNPO();
  }

  getSelectedLocation() {
    switch (this.assignedLocation) {
      case "National":
        this.hideElementFacility = false;
        this.hideElementProv = false;
        this.hideElementDist = false;
        this.hideElementService = false;
        break;
      case "Province":
        this.hideElementFacility = false;
        this.hideElementProv = true;
        this.hideElementDist = false;
        this.hideElementService = false;
        this.getProvinces();
        break;
      case "District":
        this.hideElementFacility = false;
        this.hideElementProv = true;
        this.hideElementDist = true;
        this.hideElementService = false;
        break;
      case "Service Point":
        this.hideElementFacility = false;
        this.hideElementProv = true;
        this.hideElementDist = true;
        this.hideElementService = true;
        break;
      case "Facility/NPO":
        this.hideElementFacility = true;
        this.hideElementProv = true;
        this.hideElementDist = true;
        this.hideElementService = true;
        break;
    }
  }

  getSelectedSubProgram() {
    if (this.assignedSubProgram.length > 0) {
      this.treeService.getIndicatorNodesByLocation(this.assignedSubProgram[0].nodeID).subscribe(data => {
        this.indicatorList = data;
      });
    }
    else {
      this.getAllIndicators();
    }
  }
  //#endregion

  //#region Filters
  filterChiefDirectorate(id: number): boolean {
    var returnVal = false;
    this.assignedBranch.forEach(element => {
      if (id == element.nodeID) {
        returnVal = true;
      }
    });
    return returnVal;
  }

  filterDirectorate(id: number): boolean {
    var returnVal = false;
    this.assignedChiefDirectorate.forEach(element => {
      if (id == element.nodeID) {
        returnVal = true;
      }
    });
    return returnVal;
  }

  filterSubProgram(id: number): boolean {
    var returnVal = false;
    this.assignedProgram.forEach(element => {
      if (id == element.nodeID) {
        returnVal = true;
      }
    });
    return returnVal;
  }

  filterProvince(id: number): boolean {
    var returnVal = false;
    this.assignedProvinces.forEach(element => {
      if (id == element.nodeID) {
        returnVal = true;
      }
    });
    return returnVal;
  }

  filterDistrict(id: number): boolean {
    var returnVal = false;
    this.assignedDistricts.forEach(element => {
      if (id == element.nodeID) {
        returnVal = true;
      }
    });
    return returnVal;
  }

  filterServicePoint(id: number): boolean {
    var returnVal = false;
    this.assignedServicePoint.forEach(element => {
      if (id == element.nodeID) {
        returnVal = true;
      }
    });
    return returnVal;
  }

  filterIndicatorsBySubProgramme(id: number): boolean {
    var returnVal = false;
    this.assignedSubProgram.forEach(element => {
      if (id == element.nodeID) {
        returnVal = true;
      }
    });
    return returnVal;
  }
  //#endregion

  //#region Generate Report
  viewReport() {
    var table = document.getElementById("table");
    table.innerHTML = generateHTMLTable(this.data, this.schema);
    // table.innerHTML = table.innerHTML + this.generateLocationTable(this.obj);
    // table.innerHTML = table.innerHTML + this.generateLocationTable1(this.obj1);
    // table.innerHTML = table.innerHTML + this.generateLocationTable2(this.obj2);
    // table.innerHTML = table.innerHTML + this.generateLocationTable3(this.obj44);
    // table.innerHTML = table.innerHTML + this.generateLocationTable4(this.obj4);
  }

  generateLocationTable(t1: any): any {
    return `${t1.map(function (data) {
      return `<table style="border: 1px solid black;
        border-collapse: collapse;width:600px">
        <tr class="indicator-border">
        <td class="indicator-border-headers">Program: </td>
        <td class="indicator-border">${data.Program}</td>
        </tr>
        <tr class="indicator-border">
        <td class="indicator-border-headers">Sub-Program:</td>
        <td class="indicator-border">${data["Sub-Program"]}</td>
        </tr>
        <tr class="indicator-border">
        <td class="indicator-border-headers">Frequency: </td>
        <td class="indicator-border">${data["Frequency"]}</td>
        </tr>
        <tr class="indicator-border">
        <td class="indicator-border-headers">Indicator: </td>
        <td class="indicator-border">${data["Indicator"]}</td>
        </tr>
        <tr class="indicator-border">
        <td class="indicator-border"></td>
        <td style="color:white; visibility: hidden">test</td>
        </tr>
        <tr class="indicator-border">
        <td class="indicator-border-headers">Total Value </td>
        <td style="text-align:left">${data["TotalValue"]}</td>
        </tr>
        <tr class="indicator-border">
        <td class="indicator-border-headers">Regions/Districts </td>
        <td class="indicator-border"></td>
        </tr>
        <tr class="indicator-border">
        <td class="indicator-border-headers">District 1: </td>
        <td style="text-align:left;border: 1px solid black;border-collapse: collapse;"">${data["District_1"]}</td>
        </tr>
        <tr class="indicator-border">
        <td class="indicator-border-headers">District 2: </td>
        <td style="text-align:left">${data["District_2"]}</td>
        </tr>
        <tr class="indicator-border">
        <td class="indicator-border-headers">District 3: </td>
        <td style="text-align:left">${data["District_3"]}</td>
        </tr>
        <tr class="indicator-border">
        <td class="indicator-border-headers">District 4: </td>
        <td style="text-align:left">${data["District_4"]}</td>
        </tr>
        <tr class="indicator-border">
        <td class="indicator-border-headers">District 5: </td>
        <td style="text-align:left">${data["District_5"]}</td>
        </tr>
        <tr class="indicator-border">
        <td class="indicator-border-headers">District 6: </td>
        <td style="text-align:left">${data["District_6"]}</td>
        </tr>
        <br/>
        </table>`
    }).join('')}`;
  }

  generateLocationTable1(t2: any): any {
    return `${t2.map(function (data) {
      return `<table style="width:600px;"border: 1px solid black;">
      <tr class="indicator-border">
      <td class="indicator-border-headers"><b>Program: </b></td>
      <td class="indicator-border">${data.Program}</td>
      </tr>
      <tr class="indicator-border">
      <td class="indicator-border-headers"><b>Sub-Program: <b/></td>
      <td class="indicator-border">${data["Sub-Program"]}</td>
      </tr>
      <tr class="indicator-border">
      <td class="indicator-border-headers"><b>Frequency: </b></td>
      <td class="indicator-border">${data["Frequency"]}</td>
      </tr>
      <tr class="indicator-border">
      <td class="indicator-border-headers"><b>Indicator: </b></td>
      <td class="indicator-border">${data["Indicator"]}</td>
      </tr>
      <tr class="indicator-border">
      <td class="indicator-border"></td>
      <td style="color:white; visibility: hidden">test</td>
      </tr>
      <tr class="indicator-border">
      <td style="color:white; visibility: hidden">test</td>
      <td class="indicator-border-headers"><b>Rands </b></td>
      </tr>
      <tr class="indicator-border">
      <td style="color:white; visibility: hidden">test</td>
      <td class="indicator-border">${data["Rands"]}</td>
      </tr>
      <br/>
      </table>`;
    }).join("")}`;
  }

  generateLocationTable2(t3: any): any {
    return `${t3.map(function (data) {
      return `<table style="width:600px;">
    <tr class="indicator-border">
    <th class="indicator-border"> <span style="color:black;font-weight:bold;">Program:</span>&nbsp;&nbsp;&nbsp;</th>
    <th class="indicator-border" colspan="7"> <span style="color:black">${data.Program}</th>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">Sub-Program:</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border" colspan="7"> <span style="color:black">${data["Sub-Program"]}</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">Frequency:</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border" colspan="7"> <span style="color:black">${data["Frequency"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">Indicator:</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border" colspan="7"> <span style="color:black">${data["Indicator"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">Total&nbsp;&nbsp;&nbsp;Value</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["TotalValue"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border" colspan="6"> <span style="color:black"> </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border" colspan="2"> <span style="color:black;font-weight:bold;">Regions&nbsp;&nbsp;&nbsp;/ Districts</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border" colspan="6"> <span style="color:black"> </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"> <span style="color:black"> </span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">Total</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">M</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">F</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">Age 19 - 35</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">Age 36 - 59</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">Age 60+</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">Disability</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">District&nbsp;&nbsp;&nbsp;1</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Total0"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["M0"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["F0"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age019-35"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age036-59"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age0 60+"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Disability0"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">District&nbsp;&nbsp;&nbsp;2</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Total1"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["M1"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["F1"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age119-35"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age136-59"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age1 60+"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Disability1"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">District&nbsp;&nbsp;&nbsp;3</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Total2"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["M2"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["F2"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age219-35"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age236-59"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age2 60+"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Disability2"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">District&nbsp;&nbsp;&nbsp;4</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Total3"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["M3"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["F3"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age319-35"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age336-59"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age3 60+"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Disability3"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">District&nbsp;&nbsp;&nbsp;5</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Total4"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["M4"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["F4"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age419-35"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age436-59"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age4 60+"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Disability4"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">District&nbsp;&nbsp;&nbsp;6</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Total5"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["M5"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["F5"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age519-35"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age536-59"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age5 60+"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Disability5"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <br/>
    </table>`;
    }).join("")}`;
  }

  generateLocationTable3(t4: any): any {
    return `${t4.map(function (data) {
      return `<table style=width:1000px;">
    <tbody>
    <tr class="indicator-border">
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Frequency:</span></td>
    <td class="indicator-border" colspan="8"><span style="color:black">${data["Frequency"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Indicator:</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border" colspan="8"><span style="color:black">${data["Indicator"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border" colspan="2"><span style="color:black"> </span>&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">M</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">F</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Age 0 - 18</span>&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Age 19 - 35</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Age 36 - 59</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Age 60+</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Disability</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Total Value:</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black">${data["TotalValue"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black">${data["M"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black">${data["F"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black">${data["Age 0-18"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black">${data["Age 19-35"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black">${data["Age 36-59"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black">${data["Age 60+"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black">${data["Disability"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <br/>
    <td class="indicator-border" bgcolor="#394161" colspan="9" border: 1px solid rgb(37, 150, 190);>&nbsp;&nbsp;&nbsp;<br> <span style="color:black"></td>
    </table>`;
    }).join("")}`;
  }

  generateLocationTable4(t5: any): any {
    return `${t5.map(function (data) {
      return `<table style="width:1000px;">
    <thead>
    <tr class="indicator-border">
    <th class="indicator-border"><span style="color:black;font-weight:bold;">Program:</span>&nbsp;&nbsp;&nbsp;</th>
    <th class="indicator-border" colspan="10"><span style="color:black">${data.Program}</span>&nbsp;&nbsp;&nbsp;</th>
    </tr>
    </thead>
    <tbody>
    <tr class="indicator-border">
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Sub-Program:</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border" colspan="10"><span style="color:black">${data["Sub-Program"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Frequency:</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border" colspan="10"><span style="color:black">${data["Frequency"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr class="indicator-border">
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Indicator:</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border" colspan="10"><span style="color:black">${data["Indicator"]}</span>&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr style ="font-size: 14.5px;">
    <td class="indicator-border" colspan="2"><span style="color:black;font-weight:bold;"> </span>&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">M</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">F</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Age 0 - 18</span>&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Age 19 - 35</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Age 36 - 59</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Age 60+</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">Disability</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"><span style="color:black;font-weight:bold;">South African Citizens </span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">Foreign Nationals</span>&nbsp;&nbsp;&nbsp;</td>
  </tr>
  <tr class="indicator-border">
    <td class="indicator-border"> <span style="color:black;font-weight:bold;">Total Value</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["TotalValue"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["M"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["F"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age 0-18"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age 19-35"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age 36-59"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Age 60+"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Disability"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["South African Citizens"]}</span>&nbsp;&nbsp;&nbsp;</td>
    <td class="indicator-border"> <span style="color:black">${data["Foreign Nationals"]}</span>&nbsp;&nbsp;&nbsp;</td>
  </tr>
    
    </table>`;
    }).join("")}`;
  }
  //#endregion
}
