import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  SimpleChanges,
  EventEmitter
} from '@angular/core';

import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';



/**
 * You may include a different variant of BpmnJS:
 *
 * bpmn-viewer  - displays BPMN diagrams without the ability
 *                to navigate them
 * bpmn-modeler - bootstraps a full-fledged BPMN editor
 */
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

import { from, Observable, Subscription } from 'rxjs';

/*import * as $ from 'jquery/dist/jquery.js';
import { async } from 'rxjs';*/

declare const $: any;

@Component({
  selector: 'app-diagram',
  template: `
    <div #ref class="diagram-container"></div>
  `,
  styles: [
    `
      .diagram-container {
        height: 100%;
        width: 100%;
      }
    `
  ]
})
export class DiagramComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {
  private bpmnModeler: BpmnJS;

  @ViewChild('ref', { static: true }) private el: ElementRef;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();

  @Input() public url: string;

  private maxNodeID = 0;

  private pID = 0;

  private lookup = { MODULE: [], XREF: [], ROLE: [], LOCATION: [], GROUP: [], LEVEL: [], FORMID: [], ALLOCATIONTYPE: [], NOTICATIONTEM: [], MASTERRECORDSTATUS: [], ACTIONTAKEN: [], ACTIONREQUIRED: [], STATUSEXTERNAL: [] };

  constructor(private http: HttpClient) {

    
    this.bpmnModeler = new BpmnJS();

    //const searchParams = new URL(window.location.href).searchParams;
    //const pid = searchParams.get('PID');

    //let searchParams =window.location.href;
    //const pid = searchParams.substring(searchParams.indexOf("=")+1,searchParams.length);
    const pid =new URLSearchParams(window.location.search).get('PID');
    if (pid !== null && pid != '') {
      this.pID=parseInt(pid);
      this.getLookup(this.pID);
    }

    //console.log(pid);

  }

  ngOnInit(): void {

    let btn = document.getElementById("btnfinalSave");
    btn.addEventListener("click", (e: Event) => this.finalButtonClick());

    let btnIcon = document.getElementById("myModalBtnIcon");
    btnIcon.addEventListener("click", (e: Event) => this.closeModal());

    let btnClose = document.getElementById("myModalBtnClose");
    btnClose.addEventListener("click", (e: Event) => this.closeModal());

    document.addEventListener('input', (e: Event) => this.SetSampleVal(e));

    document.addEventListener('onchange', (e: Event) => this.SetSampleVal(e));
    
    
  }


  ngAfterContentInit(): void {
    this.bpmnModeler.attachTo(this.el.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    // re-import whenever the url changes
    //if (changes.url) {
    //this.loadUrl(changes.url.currentValue);
    //}
  }

  ngOnDestroy(): void {
    this.bpmnModeler.destroy();
  }

  /**
   * Load diagram from URL and emit completion event
   */
  loadUrl(url: string): Subscription {


    return (
      this.http.get(url, { responseType: 'text' }).pipe(
        switchMap((xml: string) => this.importDiagram(xml)),
        map(result => result.warnings),
      ).subscribe(
        (warnings) => {
          this.importDone.emit({
            type: 'success',
            warnings
          });
        },
        (err) => {
          this.importDone.emit({
            type: 'error',
            error: err
          });
        }
      )
    );

  }

  /**
   * Creates a Promise to import the given XML into the current
   * BpmnJS instance, then returns it as an Observable.
   *
   * @see https://github.com/bpmn-io/bpmn-js-callbacks-to-promises#importxml
   */
  private importDiagram(xml: string): Observable<{ warnings: Array<any> }> {

    return from(this.bpmnModeler.importXML(xml) as Promise<{ warnings: Array<any> }>);
  }

  getLookup(processID: number) {

    let url = "https://localhost:44305/api/lookup";

    this.http.get<{}>(url).subscribe(result => {

      this.setLookup(result);
      this.getProcess(processID);

    }, error => console.error(error));

  }

  setLookup(data) {

    this.lookup = data;

  }


  getProcess(processID: number) {

    const url = "https://localhost:44305/api/process/" + processID;

    this.http.get<[]>(url).subscribe(result => {

      this.successHandler(result);


    }, error => console.error(error));

  }

  successHandler(data) {

    try {
      this.openDiagram(data[0], JSON.parse(data[1]));
    }
    catch (err) {
      console.log(err);
    }
  }

  async fetchData(bpmnXML, myprocess) {

    try {
      const result = await this.bpmnModeler.importXML(bpmnXML);
      //const { warnings } = result;
      
      this.openProcess(myprocess);

      $('.bjs-powered-by').hide();
      $('.bpmn-icon-intermediate-event-none').hide();
      $('.bpmn-icon-gateway-none').hide();
      $('.bpmn-icon-subprocess-expanded').hide();
      $('.bpmn-icon-data-object').hide();
      $('.bpmn-icon-data-store').hide();
      $('.bpmn-icon-participant').hide();
      $('.bpmn-icon-gateway-none').hide();
      $('.bpmn-icon-intermediate-event-none').hide();
      $('.bpmn-icon-text-annotation').hide();
      $('.bpmn-icon-group').hide();
      $('.separator').css('width','auto');
      //$('.has-float-label label').css('left','0px');
      //$('.has-float-label>span').css('left','0px');
      //$('.form-control').css('background-image','url()');
      
      const eventBus = this.bpmnModeler.get('eventBus');
      //var events = [
      //  //'element.hover',
      //  //'element.out',
      //  'element.click',
      //  //'element.dblclick',
      //  //'element.mousedown',
      //  //'element.mouseup'
      //];
      
      eventBus.on('element.click', (event) => this.setSelectedElementInfo(event, myprocess));


    } catch (err) {
      console.log(err.message, err.warnings);
    }
  }

  setSelectedElementInfo(event, myprocess) {

    this.setSelectedElement(event.element, myprocess);

  }


  openDiagram(bpmnXML, myprocess) {

    if (!bpmnXML)
      bpmnXML = '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" targetNamespace="" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd"><process id="Process_0y7o3vn"><startEvent id="StartEvent_0ijluaz" name="Start" /></process><bpmndi:BPMNDiagram id="sid-74620812-92c4-44e5-949c-aa47393d3830"><bpmndi:BPMNPlane id="sid-cdcae759-2af7-4a6d-bd02-53f3352a731d" bpmnElement="Process_0y7o3vn"><bpmndi:BPMNShape id="StartEvent_0ijluaz_di" bpmnElement="StartEvent_0ijluaz"><omgdc:Bounds x="144" y="66" width="36" height="36" /><bpmndi:BPMNLabel><omgdc:Bounds x="150" y="109" width="25" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNShape></bpmndi:BPMNPlane><bpmndi:BPMNLabelStyle id="sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581"><omgdc:Font name="Arial" size="11" isBold="false" isItalic="false" isUnderline="false" isStrikeThrough="false" /></bpmndi:BPMNLabelStyle><bpmndi:BPMNLabelStyle id="sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b"><omgdc:Font name="Arial" size="12" isBold="false" isItalic="false" isUnderline="false" isStrikeThrough="false" /></bpmndi:BPMNLabelStyle></bpmndi:BPMNDiagram></definitions>';


    this.fetchData(bpmnXML, myprocess);

  }

  openProcess(myprocess) {

    this.XREFArraySet();
    this.appendProcessControls(this.bpmnModeler._definitions.rootElements[0].id);
    
    this.setProcessControls(myprocess);
    //let counter = 0;
    if (myprocess.Node !== null) {
      this.maxNodeID = Math.max.apply(Math, myprocess.Node.map(function (o) { return o.NodeID; }));
     
    }
    else {
      this.maxNodeID = 0;
    }

    const flowlength = this.bpmnModeler._definitions.rootElements[0].flowElements.length;
    for (let i = 0; i < flowlength; i += 1) {
      var element = this.bpmnModeler._definitions.rootElements[0].flowElements[i];
      if (element.$type == "bpmn:StartEvent" || element.$type == "bpmn:EndEvent" || element.$type == "bpmn:Task") {
        //counter += 1;

        if (myprocess.Node !== null) {
          var processNode = this.getByValue(myprocess.Node, "DiagramID", element.id);

          this.appendNodeControls(element);
          this.appendNodeLocation(element.id, processNode);
          this.setNode(processNode, element);
          $('#mainPanel >' + '#div' + element.id).hide();
          $('#modalLocationTable' + element.id).hide();
          var res = null;
          if (processNode["ActionBits"] !== null) {
            res = processNode["ActionBits"].split(":");
          }
          if (typeof element.outgoing !== "undefined") {
            for (var j = 0; j < element.outgoing.length; j += 1) {
              var outLink = element.outgoing[j];
              this.appendLinkControls(outLink.id);
              if (res !== null) {
                var xrefNode = this.getByValue(myprocess.Node, "NodeID", res[j].split(".")[2]);
                var xrefNodeValue = '';
                if (typeof xrefNode !== 'undefined')
                  xrefNodeValue = xrefNode.DiagramID;
                this.setLink(outLink, res[j], xrefNodeValue);
              }
              $('#mainPanel >' + '#div' + outLink.id).hide();
            }
          }
        }
      }
    }
  }

  setProcessControls(myprocess) {

    $("#txtProcessName").val(myprocess.Name);
    $("#txtProcessDescription").val(myprocess.Description);

    $("#ddlModule").val(myprocess.Module);
    $("#txtTurnaroundTime").val(myprocess.TurnAroundTime);
    $("#txtNotificationTime").val(myprocess.NotificationTime);

    $("#txtPrefix").val(myprocess.Prefix);
    $("#ddlResetNumberEY").val(myprocess.ResetNumberEY);
    $("#txtSeparator").val(myprocess.Separator);
    $("#ddlPostfixType").val(myprocess.PostfixType);
    $("#txtPostfix").val(myprocess.Postfix);

    this.SetSampleValue();
  }

  appendProcessControls(elementId) {

    
    $("#nodeattName").html('Process');

    var $elem = $('<div/>', { 'id': 'div' + elementId, 'class': 'card-body shadow-lg bg-light p-2' });


    $elem.append('<div class="form-group mb-2 has-float-label"><label for="txtProcessName">Process Name</label><input id="txtProcessName" type="text" class="form-control" placeholder="Name Required"></div>');
    
    var module = $('<select>').attr({ id: 'ddlModule', class: 'form-control' });

    $(this.lookup.MODULE).each(function () {
      $(module).append($("<option>").attr('value', this.key).text(this.value));
    });

    $elem.append($('<div class="form-group mb-2 has-float-label"><span>Module</span></div>').append(module));

    $elem.append('<div class="form-group mb-2 has-float-label"><label for="txtProcessDescription">Description</label><textarea type="text" placeholder="Description" id="txtProcessDescription" class="form-control" rows="2"></textarea></div>');
    $elem.append('<div class="form-group mb-2 has-float-label"><label for="txtTurnaroundTime">Turnaround Time(days)</label><input type="text" placeholder="Turnaround Time(days)" id="txtTurnaroundTime" class="form-control"></div>');
    $elem.append('<div class="form-group mb-2 has-float-label"><label for="txtNotificationTime">Notification Time(days)</label><input type="text" placeholder="Notification Time(days)" id="txtNotificationTime" class="form-control"></div>');
    $elem.append('<div class="form-group mb-2 has-float-label"><label for="txtPrefix">Prefix</label><input type="text" placeholder="Prefix" id="txtPrefix" class="form-control" oninput="SetSampleValue()"></div>');
    $elem.append('<div class="form-group mb-2 has-float-label"><label for="ddlResetNumberEY">Reset Number Every Year</label><select name="ddlResetNumberEY" id="ddlResetNumberEY" class="form-control"><option value="Yes">Yes</option><option value="No">No</option></select></div>');
    $elem.append('<div class="form-group mb-2 has-float-label"><label for="txtSeparator">Separator</label><input type="text" placeholder="Separator" id="txtSeparator" class="form-control" oninput="SetSampleValue()"></div>');
    $elem.append('<div class="form-group mb-2 has-float-label"><label for="ddlPostfixType">Postfix Type</label><select name="ddlPostfixType" id="ddlPostfixType" class="form-control" onchange="SetSampleValue()"><option value="None">None</option><option value="OfficeCode">OfficeCode</option><option value="Other">Other</option><option value="Year">Year</option></select></div>');
    $elem.append('<div class="form-group mb-2 has-float-label"><label for="txtPostfix">Post Fix</label><input type="text" placeholder="Post Fix" id="txtPostfix" class="form-control" oninput="SetSampleValue()"></div>');

    $elem.append('<div class="form-group ml-1 mb-2">Sample: <span id="spnSample" class="badge badge-secondary badge-pill">001</span></div>');

    $('#mainPanel').append($elem);


  }

  SetSampleVal(evnt) {

    if (evnt.target && (evnt.target.id === 'txtPrefix' || evnt.target.id === 'txtSeparator' || evnt.target.id === 'txtPostfix' || evnt.target.id === 'ddlPostfixType')) {
      this.SetSampleValue();
    }

    //if (evnt.target && evnt.target.id) {
    //  $('#' + evnt.target.id).removeClass('is-invalid');
    //}
  }

  SetSampleValue() {
    var Sample = $('#txtPrefix').val();
    var Separator = $('#txtSeparator').val();
    var postFixtype = $('#ddlPostfixType').val();
    var postFix = $('#txtPostfix').val();
    if (postFixtype === 'None')
      postFix = '';
    if (postFixtype === 'Year')
      postFix = new Date().getFullYear();//'2020';
    Sample = Sample + $.trim(Separator) + '001' + $.trim(postFix);
    $('#spnSample').text(Sample);


  }

  appendLinkControls(elementId) {

    //debugger;
    var $elem = $('<div/>', { 'id': 'div' + elementId, 'class': 'card-body shadow-lg bg-light p-2' });

    var actTaken = $('<select>').attr({ id: 'div' + elementId + 'ddlActionTaken', class: 'form-control' });
    $(actTaken).append($("<option>").attr('value', '').text(''));

    $(this.lookup.ACTIONTAKEN).each(function () {
      $(actTaken).append($("<option>").attr('value', this.key).text(this.value));
    });



    $elem.append($('<div class="form-group mb-2 has-float-label"><span>Action Taken</span></div>').append(actTaken));

    var ddlXREFNode = $('<select>').attr({ id: 'ddlXREFNode', class: 'form-control XREF' });

    $(this.lookup.XREF).each(function () {
      $(ddlXREFNode).append($("<option>").attr('value', this.key).text(this.value));
    });


    $elem.append($('<div class="form-group mb-2 has-float-label"><span>XREF Node</span></div>').append(ddlXREFNode));


    var ddlStatusInternal = $('<select>').attr({ id: 'ddlRecordStatus', class: 'form-control StatusInternal' });

    $(this.lookup.MASTERRECORDSTATUS).each(function () {
      $(ddlStatusInternal).append($("<option>").attr('value', this.key).text(this.value));
    });


    $elem.append($('<div class="form-group mb-2 has-float-label"><span>Request Status(Internal)</span></div>').append(ddlStatusInternal));

    var ddlStatusExternal = $('<select>').attr({ id: 'ddlStatusExternal', class: 'form-control StatusExternal' });

    $(this.lookup.STATUSEXTERNAL).each(function () {
      $(ddlStatusExternal).append($("<option>").attr('value', this.key).text(this.value));
    });


    $elem.append($('<div class="form-group mb-2 has-float-label"><span>Request Status(External)</span></div>').append(ddlStatusExternal));


    var ddlNoticationTem = $('<select>').attr({ id: 'ddlNoticationTem', class: 'form-control NoticationTem' });

    $(this.lookup.NOTICATIONTEM).each(function () {
      $(ddlNoticationTem).append($("<option>").attr('value', this.key).text(this.value));
    });


    $elem.append($('<div class="form-group mb-2 has-float-label"><span>Notification Template</span></div>').append(ddlNoticationTem));

    $('#mainPanel').append($elem);

  }

  appendNodeControls(element) {

    var elementId = element.id;

    var $elem = $('<div/>', { 'id': 'div' + elementId, 'class': 'card-body shadow-lg bg-light p-2' });

    $elem.append($('<input>').attr({ type: 'hidden', id: 'NodeID' }));

    $elem.append('<div class="form-group mb-2 has-float-label"><span>Name</span><input class="form-control" id="Name" type="text" placeholder="Name" disabled></div>');

    $elem.append('<div class="form-group mb-2 has-float-label"><span>Form Heading</span><input class="form-control" id="Heading" type="text" placeholder="Form Heading Required"></div>');

    $elem.append('<div class="form-group mb-2 has-float-label"><span>Description</span><input class="form-control" id="Description" type="text" placeholder="Description Required"></div>');


    var role = $('<select>').attr({ id: 'Role', class: 'form-control' });

    $(this.lookup.ROLE).each(function () {
      $(role).append($("<option>").attr('value', this.key).text(this.value));
    });


    $elem.append($('<div class="form-group mb-2 has-float-label"><span>Access To Role</span></div>').append(role));

    var allocType = $('<select>').attr({ id: 'RoundRobinType', class: 'form-control' });

    $(this.lookup.ALLOCATIONTYPE).each(function () {
      $(allocType).append($("<option>").attr('value', this.key).text(this.value));
    });


    $elem.append($('<div class="form-group mb-2 has-float-label"><span>Task Allocation Preference</span></div>').append(allocType));


    var actReq = $('<select>').attr({ id: 'ActionRequired', class: 'form-control' });

    $(this.lookup.ACTIONREQUIRED).each(function () {
      $(actReq).append($("<option>").attr('value', this.key).text(this.value));
    });


    $elem.append($('<div class="form-group mb-2 has-float-label"><span>Action Required</span></div>').append(actReq));

    //Use below condition to hide some controls for start and end node
    //if (element.$type == "bpmn:Task") {
    //}

    $elem.append('<div class="form-group mb-2 has-float-label"><span>Question to Ask</span><input class="form-control" id="Question" type="text" placeholder="Question to Ask"></div>');


    $elem.append('<div class="form-group mb-2 has-float-label"><span>Reminder Period(Days)</span><input class="form-control" id="FlagReminder" type="text" value="0" placeholder="Reminder Period(Days)"></div>');

    $elem.append('<div class="form-group mb-2 has-float-label"><span>Escalation Period (Days)</span><input class="form-control" id="Escalation" type="text" value="0" placeholder="Escalation Period (Days)"></div>');

    //Uncomment for Multiple Location, Group, Level
    //$elem.append('<div class="input-group mb-1 input-group-sm"><button id="btnMultipleLoction" type="button" class="btn btn-light btn-sm btn-block" onclick="$(\'#modalLocation\').modal(\'show\');">Multiple Location</button></div>');

    //var rrGroup = $('<select>').attr({ id: 'RoundRobinID', class: 'form-control' });
    //if (processModule.lookup.RRGROUP !== 'undefined') {
    //    $(processModule.lookup.RRGROUP).each(function () {
    //        $(rrGroup).append($("<option>").attr('value', this.Key).text(this.Value));
    //    });
    //}

    //$elem.append($('<div class="input-group mb-1 input-group-sm"></div').append('<div class="input-group-prepend"><span class="input-group-text">Round Robin Group</span></div>', rrGroup));


    var escalationTo = $('<select>').attr({ id: 'EscalationTo', class: 'form-control' });

    $(this.lookup.ROLE).each(function () {
      $(escalationTo).append($("<option>").attr('value', this.key).text(this.value));
    });


    $elem.append($('<div class="form-group mb-2 has-float-label"><span>Escalation To</span></div>').append(escalationTo));

    var formId = $('<select>').attr({ id: 'FormID', class: 'form-control' });

    $(this.lookup.FORMID).each(function () {
      $(formId).append($("<option>").attr('value', this.key).text(this.value));
    });


    $elem.append($('<div class="form-group mb-2 has-float-label"><span>Screen</span></div>').append(formId));


    $('#mainPanel').append($elem);
  }

  appendNodeLocation(elementId, node) {
    var mTable = $("<table></tble>").addClass("table table-bordered table-sm").attr("id", 'modalLocationTable' + elementId);
    mTable.append('<thead><tr><th>Location</th><th>Group</th><th>Level</th><th>Action</th></tr></thead>');

    var mtbody = $("<tbody></tbody>");

    if (node !== undefined) {
      if (node['Locations'] !== 'undefined' && node['Locations'] !== null) {
        //alert(node['Locations'].length);
        for (let i = 0; i < node['Locations'].length; i++) {

          this.addGroupLocation(mtbody, 1, node['Locations'][i]);
          //$("div.id_100 select").val("val2");
        }
      }
    }

    mTable.append(mtbody);


    mTable.append('<tfoot><tr><td colspan="4"><button type="button" class="btn btn-primary btn-sm float-right" title="Add" onclick="addGroupLocation(this,2);"><i class="fa fa-plus fa-lg" aria-hidden="true"></i></button></td></tr></tfoot>');

    $('#modalLocationbody').append(mTable);
  }

  addGroupLocation(mtbody, btype, objLocation) {

    //alert("#" + mtbody + "  > tbody");
    //var a = $('<select class="form-control form-control-sm" id="LocationID"><option value="436">Location1</option><option value="304">All</option></select>');
    var a = $('<select>').attr({ id: 'LocationID', class: 'form-control form-control-sm' });

    $(this.lookup.LOCATION).each(function () {
      $(a).append($("<option>").attr('value', this.key).text(this.value));
    });

    var b = $('<select>').attr({ id: 'GroupID', class: 'form-control form-control-sm' });

    $(this.lookup.GROUP).each(function () {
      $(b).append($("<option>").attr('value', this.key).text(this.value));
    });

    var c = $('<select>').attr({ id: 'LevelID', class: 'form-control form-control-sm' });

    $(this.lookup.LEVEL).each(function () {
      $(c).append($("<option>").attr('value', this.key).text(this.value));
    });


    if (typeof objLocation !== 'undefined') {
      $(a).val(objLocation['LocationID']);
      $(b).val(objLocation['GroupID']);
      $(c).val(objLocation['LevelID']);
    }

    var d = $('<td></td>').append('<button type="button" class="btn btn-primary btn-sm float-right" title="Delete" onclick="$(this).closest(\'tr\').remove();"><i class="fa fa-times fa-lg" aria-hidden="true"></i></button>');

    var trtr = $('<tr></tr>').append($('<td></td>').append(a), $('<td></td>').append(b), $('<td></td>').append(c), d);

    if (btype === 1)
      $(mtbody).append(trtr);
    else
      $(mtbody).closest('table').find(' tbody').append(trtr);

  }

  getByValue(arr, propertyName, value) {

    for (let i = 0; i < arr.length; i += 1) {

      if (arr[i][propertyName] == value) return arr[i];
    }
  }

  setSelectedElement(SelectedElement, process) {

    var nodefound = false;
    var processNode;
    //debugger;

    if (process.Node != null) {
      if (SelectedElement.type == "bpmn:StartEvent" || SelectedElement.type == "bpmn:EndEvent" || SelectedElement.type == "bpmn:Task") {
        var processNode = this.getByValue(process.Node, "DiagramID", SelectedElement.id);
        if (typeof processNode !== 'undefined') {
          //setNodeData(processNode);
          nodefound = true;
        }
      }
      else if (SelectedElement.type == "bpmn:SequenceFlow") {
        processNode = this.getByValue(process.Node, "DiagramID", SelectedElement.source.id);
        if (typeof processNode !== 'undefined') {
          //setLinkData(processNode, process, SelectedElement);
          nodefound = true;
        }
      }
    }

    if (!nodefound) {
      $("#ContentPlaceHolder1_pnlAttribute :input").each(function () {
        $(this).val('');
      });
    }
    if (SelectedElement.type == "bpmn:SequenceFlow") {
      $("#nodeattName").html('Node Flow');
    }
    else if (SelectedElement.type == "bpmn:StartEvent" || SelectedElement.type == "bpmn:EndEvent" || SelectedElement.type == "bpmn:Task") {
      $("#nodeattName").html('Node');
    }
    else {
      $("#nodeattName").html('Process');
    }

    this.appendControls(SelectedElement);

  }

  setNode(node, element) {

    $('#div' + element.id + " :input").each(function () {
      //$(this).prop('disabled', false);
      var eleid = $(this).attr("id");
      //eleid = eleid.substring(23, eleid.length);
      if (typeof node[eleid] !== 'undefined') {
        if (eleid == 'TaskAllocation' || eleid == 'RoundRobinPreferUser') {
          $(this).prop('checked', node[eleid]);

        }
        else {
          $(this).val(node[eleid]);
          //alert(process.Node[i][eleid]);
        }
      }
      //else if (typeof node['Location'][eleid] !== 'undefined') {
      //    $(this).val(node['Location'][eleid]);
      //}
    });

  }

  setLinkData(node, process, currentSelectedElement) {

    //debugger;
    var targetNode = this.getByValue(process.Node, "DiagramID", currentSelectedElement.target.id);
    //debugger;
    if (typeof targetNode !== 'undefined') {
      //var actionBits = "";
      if (node["ActionBits"]) {
        var res = node["ActionBits"].split(":");
        for (var i = 0; i < res.length; i += 1) {

          if (targetNode.NodeID == res[i].split(".")[1]) {
            $('#ddlActionTaken').val(res[i].split(".")[0]);
            $('#ddlXREFNode').val(res[i].split(".")[2]);

            if (res[i].split(".")[3] !== 'undefined')
              $('#ddlRecordStatus').val(res[i].split(".")[3]);

            if (res[i].split(".")[4] !== 'undefined')
              $('#ddlStatusExternal').val(res[i].split(".")[4]);

            if (res[i].split(".")[5] !== 'undefined')
              $('#ddlNoticationTem').val(res[i].split(".")[5]);

            break;
          }
        }
      }
    }
  }

  setLink(outLink, actionbit, xrefValue) {

    $('#div' + outLink.id + " :input").each(function () {
      var eleid = $(this).attr("id");
      if (eleid === "div" + outLink.id + "ddlActionTaken") {
        $(this).val(actionbit.split(".")[0]);
      }
      else if (eleid === "ddlXREFNode") {
        $(this).val(xrefValue);
      }
      else if (eleid === "ddlRecordStatus") {
        $(this).val(actionbit.split(".")[3]);
      }
      else if (eleid === "ddlStatusExternal") {
        $(this).val(actionbit.split(".")[4]);
      }
      else if (eleid === "ddlNoticationTem") {
        $(this).val(actionbit.split(".")[5]);
      }

    });

  }

  appendControls(SelectedElement) {

    $("#mainPanel > div:not(#mainPanelHeader)").each(function (index) {
      if ($(this).attr("id") === 'div' + SelectedElement.id) {
        $(this).show();
        $('#modalLocationTable' + $(this).attr("id").substring(3)).show();
      }
      else {
        $(this).hide();
        $('#modalLocationTable' + $(this).attr("id").substring(3)).hide();
      }
    });

    if ($('#mainPanel >' + '#div' + SelectedElement.id).length === 0) {
      if (SelectedElement.type == "bpmn:SequenceFlow") {

        this.appendLinkControls(SelectedElement.id);
      }
      else if (SelectedElement.type == "bpmn:StartEvent" || SelectedElement.type == "bpmn:EndEvent" || SelectedElement.type == "bpmn:Task") {
        this.appendNodeControls(SelectedElement);
        this.appendNodeLocation(SelectedElement.id, null);
      }
      else {
        this.appendProcessControls(SelectedElement.id);
      }
    }
    this.XREFSelectReset();

  }

  XREFArraySet() {
    this.lookup.XREF = [];
    var flowlength = this.bpmnModeler._definitions.rootElements[0].flowElements.length;
    for (var i = 0; i < flowlength; i += 1) {
      var element = this.bpmnModeler._definitions.rootElements[0].flowElements[i];
      if (element.$type == "bpmn:StartEvent" || element.$type == "bpmn:EndEvent" || element.$type == "bpmn:Task") {
        this.lookup.XREF.push({ key: element.id, value: element.name });
        $('#div' + element.id + " :input#Name").each(function () {
          $(this).val(element.name);
        });
      }
    }
  }

  XREFSelectReset() {
    this.XREFArraySet();
    var lXREF = this.lookup.XREF;
    $("select.XREF").each(function (index, drpEle) {
      var selectvalue = $(drpEle).val();
      $(drpEle).empty();
      $(lXREF).each(function () {
        $(drpEle).append($("<option>").attr('value', this.key).text(this.value));
      });
      $(drpEle).val(selectvalue);
    });
  }

  async exportData(isfinal) {

    try {
      const result = await this.bpmnModeler.saveXML({ format: true });
      const { xml } = result;
      $("#btnfinalParSave").hide();
      $("#btnfinalSave").hide();
      $("#btnfinalSpinner").show();
      var errorMessage = this.validationDiagram();
      var myProcessDesc = this.createProcess();

      if (errorMessage != "") {
        errorMessage = errorMessage + myProcessDesc.ErrorMessage;
      }
      else {
        errorMessage = myProcessDesc.ErrorMessage;
      }

      if (isfinal && errorMessage != "") {
        //$('#btnfinalSave').html('Save');
        //$('#btnfinalParSave').html('Partial Save');
        $("#btnfinalParSave").show();
        $("#btnfinalSave").show();
        $("#btnfinalSpinner").hide();
        //jQuery.noConflict();
        //$('#myModal').modal('show');
        $('#myModal').addClass("show");
        $("#myModal").css("display", "block");
        $("#myModalbody").html(errorMessage);
      }
      else {
        this.saveDesigneInDB(xml, myProcessDesc.Process);
      }

    } catch (err) {
      console.log(err);
    }
  }

  exportDiagram(isfinal) {

    this.exportData(isfinal);

  }

  saveDesigneInDB(diagram, attributexml) {

    //let searchParams = new URLSearchParams(window.location.search);
    //var processID = searchParams.get('PID');
    
    var t ="";

    let outDataVal = {
      "Diagram": diagram,
      "Procs": attributexml,
      "ProcessID": this.pID
    };

    const headers = {
      'content-type': 'application/json' 
    };

    const body = JSON.stringify(outDataVal);

    const url = 'https://localhost:44305/api/process';

    this.http.post(url, body, { 'headers': headers, observe: 'response' }).subscribe(response => {

      location.reload();
      //console.log(response);

    }, error => {

      $("#btnfinalParSave").show();
      $("#btnfinalSave").show();
      $("#btnfinalSpinner").hide();
      console.log(error);
    });


  }

  validationDiagram() {

    var errorMessage = "";
    var startCount = 0;
    var endCount = 0;
    var canvas = this.bpmnModeler.get('canvas');
    var flowlength = this.bpmnModeler._definitions.rootElements[0].flowElements.length;
    for (var i = 0; i < flowlength; i += 1) {
      //debugger;
      var element = this.bpmnModeler._definitions.rootElements[0].flowElements[i];
      canvas.removeMarker(element.id, 'highlight');
      canvas.removeMarker(element.id, 'highlight-connection');
      if (element.$type == "bpmn:StartEvent") {
        startCount += 1;
        if (typeof element.outgoing === "undefined" || element.outgoing.length != 1) {
          //errorMessage = "Start must have only one outcomming." + "<br>" + errorMessage;
          errorMessage = element.name + " (" + element.id + ") must have only one outcomming." + "<br>" + errorMessage;
          canvas.addMarker(element.id, 'highlight');
        }
      }
      else if (element.$type == "bpmn:EndEvent") {
        endCount += 1;
        if (typeof element.incoming === "undefined" || element.incoming.length < 1) {//|| element.incoming.length != 1
          //errorMessage = "End must have at least one incomming." + "<br>" + errorMessage;
          errorMessage = element.name + " (" + element.id + ") must have at least one incomming." + "<br>" + errorMessage;
          canvas.addMarker(element.id, 'highlight');
        }

      }
      else if (element.$type == "bpmn:Task") {
        //debugger;
        if (typeof element.incoming === "undefined" || typeof element.outgoing === "undefined" || element.incoming.length < 1 || element.outgoing.length < 1) {
          //errorMessage = "Task must have min one income and one outcome." + "<br>" + errorMessage;
          errorMessage = element.name + " (" + element.id + ") must have min one income and one outcome." + "<br>" + errorMessage;
          canvas.addMarker(element.id, 'highlight');
        }
      }
    }
    if (startCount != 1) {
      errorMessage = "Diagram must have only one Start." + "<br>" + errorMessage;
    }
    else if (endCount != 1) {

      errorMessage = "Diagram must have only one End." + "<br>" + errorMessage;
    }

    return errorMessage;

  }

  createProcess() {

    var canvas = this.bpmnModeler.get('canvas');
    var myprocess = this.setProcessAttributes(); //{ Name: $("#txtProcessName").val(), Description: $("#txtProcessDescription").val(), Node: [] };
    var errorMessage = "";
    //debugger;
    var counter = 0;
    //var counter = processModule.maxNodeID;
    var maxndIDCount = this.maxNodeID + 1;
    var flowlength = this.bpmnModeler._definitions.rootElements[0].flowElements.length;
    for (var i = 0; i < flowlength; i += 1) {
      var element = this.bpmnModeler._definitions.rootElements[0].flowElements[i];
      if (element.$type == "bpmn:StartEvent" || element.$type == "bpmn:EndEvent" || element.$type == "bpmn:Task") {
        counter += 1;

        var processNode = { NodeID: counter, Description: "", Category: 0, RoundRobinID: 0, FormID: 0, Question: "", Heading: "", ActionRequired: 0, RoundRobinType: 0, RoundRobinPreferUser: false, FlagReminder: 0, Escalation: 0, Name: "", DiagramID: "", ActionBits: "", Tag: "", MailBits: "", NotificationBits: "", XREFBits: "", LetterBits: "", FormIDSpecified: true, EscalationTo: 0, Role: 0 };

        if (element.$type == "bpmn:StartEvent") {
          processNode.Category = 0;
        }
        else if (element.$type == "bpmn:EndEvent") {
          processNode.Category = 4;
        }
        else if (element.$type == "bpmn:Task") {
          processNode.Category = 1;
        }

        processNode.DiagramID = element.id;

        var objNode = this.getNode(processNode, element, maxndIDCount);
        if (objNode.MaxNodeVal)
          maxndIDCount += 1;

        if (!objNode.Isvalid) {
          errorMessage = objNode.ErrorMessage + "<br>" + errorMessage;
          canvas.addMarker(element.id, 'highlight');
        }
        myprocess.Node.push(processNode);
      }
    }
    counter = 0;
    for (var i = 0; i < flowlength; i += 1) {

      var element = this.bpmnModeler._definitions.rootElements[0].flowElements[i];
      if (element.$type == "bpmn:StartEvent" || element.$type == "bpmn:EndEvent" || element.$type == "bpmn:Task") {
        var actionDuplicate = this.getLink(element, myprocess);
        myprocess.Node[counter].ActionBits = actionDuplicate.ActionBits;
        counter += 1;

        if (actionDuplicate.ErrorMessage != '') {
          //errorMessage = "Duplicate Action Taken Found." + "<br>" + errorMessage;
          errorMessage = actionDuplicate.ErrorMessage + errorMessage;
        }
      }
    }

    if ($.trim($("#txtProcessDescription").val()) == '') {
      $("#txtProcessDescription").addClass("is-invalid");
      errorMessage = "Process description is required." + "<br>" + errorMessage;
    }
    else {
      $("#txtProcessDescription").removeClass("is-invalid");
    }
    if ($.trim($("#txtProcessName").val()) == '') {
      $("#txtProcessName").addClass("is-invalid");
      errorMessage = "Process name is required." + "<br>" + errorMessage;
    }
    else {
      $("#txtProcessName").removeClass("is-invalid");
    }

    var myProcessDesc = { Process: myprocess, ErrorMessage: errorMessage };

    return myProcessDesc;
  }

  setProcessAttributes() {
    var myprocess = {
      Name: $("#txtProcessName").val(),
      Description: $("#txtProcessDescription").val(),
      Module: $("#ddlModule").val(),
      TurnAroundTime: $("#txtTurnaroundTime").val(),
      NotificationTime: $("#txtNotificationTime").val(),
      Prefix: $("#txtPrefix").val(),
      ResetNumberEY: $("#ddlResetNumberEY").val(),
      Separator: $("#txtSeparator").val(),
      PostfixType: $("#ddlPostfixType").val(),
      Postfix: $("#txtPostfix").val(),
      Node: []
    };
    return myprocess;
  }

  getNode(node, element, maxndIDCount) {

    var isvalid = true;
    var errorMessage = '';
    var maxNodeVal = false;
    //debugger;
    if ($('#div' + element.id + " :input").length == 0) {
      isvalid = false;
    }
    var isparse = true;
    $('#div' + element.id + " :input").each(function () {
      var eleid = $(this).attr("id");
      //eleid = eleid.substring(23, eleid.length);
      if (typeof node[eleid] !== 'undefined') {

        if (eleid == 'TaskAllocation' || eleid == 'RoundRobinPreferUser') {
          node[eleid] = $(this).prop('checked');
        }
        else if (eleid == 'NodeID') {
          if ($(this).val() == '') {
            node[eleid] = maxndIDCount;// processModule.maxNodeID;
            maxNodeVal = true;

          }
          else {
            node[eleid] = $(this).val();
          }
        }
        else {

          isparse = true;
          if (eleid == 'FlagReminder' || eleid == 'Escalation') {
            if ($.trim($(this).val()) != '0' && !parseInt($(this).val())) {
              isparse = false;
            }
          }

          node[eleid] = $(this).val();
          if ($.trim($(this).val()) == '' || !isparse) {
            //$(this).css({ "border": "1px solid red", "background": "#FFCECE" });
            $(this).addClass("is-invalid");
            isvalid = false;
          }
          else {
            //$(this).css({ "border": "", "background": "" });
            $(this).removeClass("is-invalid");
          }

        }
      }
    });
    if (!isvalid) {
      //errorMessage = "Node has some invalid values.";
      errorMessage = element.name + " (" + element.id + ") has some invalid values.";
    }

    if ($('#modalLocationTable' + element.id + " > tbody  > tr").length == 0) {
      //Uncomment for Multiple Location, Group, Level validation 
      //isvalid = false;
      //if (errorMessage === '') {
      //    errorMessage = element.name + " (" + element.id + ") must have at least one Location.";
      //}
      //else {
      //    errorMessage = element.name + " (" + element.id + ") must have at least one Location." + "<br>" + errorMessage;
      //}
    }
    else {
      node['Locations'] = [];
      var locArray = [];
      $('#modalLocationTable' + element.id + " > tbody  > tr").each(function () {
        var a = $("select:eq(0)", this).val();
        var b = $("select:eq(1)", this).val();
        var c = $("select:eq(2)", this).val();
        var objlocation = { LocationID: a, GroupID: b, LevelID: c };
        locArray.push(a + b + c);
        node['Locations'].push(objlocation);

      });

      if (locArray.length > 1) {
        var duplicates = this.getDuplicates1(locArray);
        //debugger;

        for (var key in duplicates) {
          //errorMessage = "Duplicate Location Found." + "<br>" + errorMessage;
          errorMessage = element.name + " (" + element.id + ") has duplicate location." + "<br>" + errorMessage;
          isvalid = false;
          //var duplicatesIndexes = duplicates[key];
          //for (var i = 0; i < duplicatesIndexes.length; i += 1) {
          //    var indd = duplicatesIndexes[i];
          //    isvalid = false;

          //}
        }
      }
    }

    var objInfo = { Isvalid: isvalid, ErrorMessage: errorMessage, MaxNodeVal: maxNodeVal };

    return objInfo;
  }

  getLink(element, myprocess) {

    //debugger;
    var actionBits = "";
    var canvas = this.bpmnModeler.get('canvas');
    var errorMessage = "";
    var actions = [];
    var outLinkActions = [];
    if (typeof element.outgoing !== "undefined") {
      for (var i = 0; i < element.outgoing.length; i += 1) {
        var outLink = element.outgoing[i];

        var targetNode = this.getByValue(myprocess.Node, "DiagramID", element.outgoing[i].targetRef.id);
        var action = "";
        var xref = "";
        var xrefval = "";
        var sInternal = "";
        var sExternal = "";
        var notiTem = "";

        $('#div' + outLink.id + " :input").each(function () {
          var eleid = $(this).attr("id");
          if (eleid === "div" + outLink.id + "ddlActionTaken") {
            action = $(this).val();
          }
          else if (eleid === "ddlXREFNode") {
            
            xrefval = $(this).val();
            //var xrefNode = this.getByValue(myprocess.Node, "DiagramID", $(this).val());
            //if (typeof xrefNode !== 'undefined')
            //  xref = "1";// xrefNode.NodeID;
          }
          else if (eleid === "ddlRecordStatus") {
            sInternal = $(this).val();
          }
          else if (eleid === "ddlStatusExternal") {
            sExternal = $(this).val();
          }
          else if (eleid === "ddlNoticationTem") {
            notiTem = $(this).val();
          }

        });

        var xrefNode = this.getByValue(myprocess.Node, "DiagramID", xrefval);
        if (typeof xrefNode !== 'undefined')
          xref = xrefNode.NodeID;
        

        if (action === '') {
          canvas.addMarker(outLink.id, 'highlight-connection');
          errorMessage = element.name + " (" + outLink.id + ") has invalid Action Taken." + "<br>" + errorMessage;
        }
        else {
          actions.push(action);
          outLinkActions.push(outLink.id);
        }
        //actionBits = actionBits + ":" + action + "." + targetNode.NodeID + "." + xref + ".." + recordS;
        actionBits = actionBits + ":" + action + "." + targetNode.NodeID + "." + xref + "." + sInternal + "." + sExternal + "." + notiTem;
      }
    }
    while (actionBits.charAt(0) === ':') {
      actionBits = actionBits.substr(1);
    }
    var duplicateFound = false;
    //var canvas = bpmnModeler.get('canvas');
    if (actions.length > 1) {
      var duplicates = this.getDuplicates1(actions);
      //debugger;
      for (var key in duplicates) {
        var duplicatesIndexes = duplicates[key];
        for (var i = 0; i < duplicatesIndexes.length; i += 1) {
          var indd = duplicatesIndexes[i];
          canvas.addMarker(outLinkActions[indd], 'highlight-connection');
          //canvas.addMarker(outLinkActions[indd], 'highlight');
          duplicateFound = true;
        }
      }
    }
    if (duplicateFound) {
      //errorMessage = "Duplicate Action Taken Found." + "<br>" + errorMessage;
      errorMessage = element.name + " (" + element.id + ") has duplicate Action Taken." + "<br>" + errorMessage;
    }
    //var actionDuplicate = { ActionBits: actionBits, DuplicateFound: duplicateFound };
    var actionDuplicate = { ActionBits: actionBits, ErrorMessage: errorMessage };
    return actionDuplicate;
  }

  getDuplicates1(ary) {
    var duplicates = {};
    for (var i = 0; i < ary.length; i++) {
      if (duplicates.hasOwnProperty(ary[i])) {
        duplicates[ary[i]].push(i);
      } else if (ary.lastIndexOf(ary[i]) !== i) {
        duplicates[ary[i]] = [i];
      }
    }

    return duplicates;
  }

  finalButtonClick() {

    /*$("#btnfinalSave").click(function () {*/
    this.exportDiagram(true);
    //});
    
  }

  closeModal() {

    $('#myModal').removeClass("show");
    $("#myModal").css("display", "none");
  }
}






