import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';
import { NgxSpinnerService } from 'ngx-spinner';
import * as Chartist from 'chartist';
import { UserService } from '../shared/user.service';
import { DataBindingDirective, PageSizeItem } from '@progress/kendo-angular-grid';
import Swal from 'sweetalert2';
import { FormbuilderService } from '../shared/formbuilder.service';
import { AddBeneficiaryComponent } from '../form-capture/add-form/embedded-form/add-beneficiary.component';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public tableData: TableData;
  public data: [];
  public labeldata: string[] = [];
  public templabeldata: number[] = [];
  public data1: any = [];
  public gridView: any[];
  public DisplayOne: string = "Display 1";
  public DisplayTwo: string = "Display 2";
  public pageSize = 5;
  public formList: any = [];
  public pageSizes: Array<number | PageSizeItem> = [5, 10, 20, {
      text: 'All',
      value: 'all'
  }];
  userDetail: any;
  userData:any;
  nodeName:any;
  locationID: any;
  UserID: any;

  constructor(public dialog: MatDialog,private service: UserService, private Formservice: FormbuilderService,private spinner: NgxSpinnerService) {

  }

  public onPageChange(state: any): void {
    this.pageSize = state.take;
  }

   refreshFormsList() {
    //this.hideButton = false;
    this.spinner.show();
    //this.locationID = this.formData.provinceID;
    this.Formservice.getEmbeddedCapturedFormsDashboard(this.UserID,this.locationID).subscribe(data => {
      this.gridView = data;
       // Count the items in the grid
    const gridItemCount = this.gridView.length;
      this.spinner.hide();
      });
  }

   editForm(dataItem: any) {
      let formCaptureObj = {
        formID: 5152,
        formName: dataItem.formName,
        formCaptureID: dataItem.formCaptureID,
        state: 'edit',
        roleID: 0,
        view: 'readwrite'
      };
    
      // Open a dialog and pass the form data
      const dialogRef = this.dialog.open(AddBeneficiaryComponent, {
        width: '75%',
        height: '75%',
        disableClose: true,
        data: {
          formData: formCaptureObj // Pass the form data to the dialog
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Handle dialog close event if needed
        this.refreshFormsList();
        console.log('The dialog was closed');
      });
    
      // this.refreshPageList();
      // this.refreshFormsList();
      this.formList.filterPredicate = function (data, filter: string): boolean {
        return data.formName.toLowerCase().includes(filter);
      };
    }

  clickDelete(item: any) {
      Swal.fire({
        
        title: "<h5 style='color:white;font-weight:400'>Are you sure you want to delete this form ?</h5>",
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        toast: true,
        position: 'top',
        allowOutsideClick: false,
        confirmButtonColor: '#000000',
        cancelButtonColor: '#000000'
        , background: '#CA0B00'
      }).then((result) => {
        if (result.value) {
          this.spinner.show();
          this.Formservice.deleteCapturedForm(item.formCaptureID,item.formID).subscribe(data => {
            this.spinner.hide();
            this.refreshFormsList();
            this.showNotification('top', 'center', 'Form deleted successfully!', '', 'success');
          });
        }
      })
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
  startAnimationForLineChart(chart: any) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;
    chart.on('draw', function (data: any) {

      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart: any) {
    let seq2: any, delays2: any, durations2: any;
    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data: any) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }
  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {

    this.refreshFormsList();
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetail = res;
        this.userData = res['formData'];
        console.log('userdata: '+this.userData);
        this.locationID=this.userData['provinceID'];
        this.nodeName=this.userData['nodeName'];
        this.UserID = this.userData['userID'];
        this.refreshFormsList();
      },
      err => {
        console.log(err);
        this.refreshFormsList();
      },

    );
    
    this.service.getInbox().subscribe(
      res => {
        this.data1 = res;
      },
      err => {
        console.log(err);
      },
    );


    this.tableData = {
      headerRow: ['ID', 'Action Required', 'Process', 'PostedOn', 'User'],
      dataRows: [
        ['Id', 'Action Required', 'Process', 'PostedOn', 'User'],
        ['1', 'Review', 'Process 1', '10 Dec', 'Admin']
      ]
    };

    /* ----------==========     Daily Sales Chart initialization    ==========---------- */

    this.service.getCapturedForms().subscribe(res => {
      var keys = Object.keys(res[0]);
      res.forEach((x, i) => {
        let excelValues = Object.values(res[i]);
        const dataDailySalesChart = {
          labels: keys,
          series: [
            excelValues
          ]
        };
        const dailySalesChart = new Chartist.Bar('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        this.startAnimationForLineChart(dailySalesChart);
      })
    })
    const optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 4000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    this.service.getWFCompletedTasks().subscribe(res => {
      var keys = Object.keys(res[0]);
      res.forEach((x, i) => {
        let excelValues = Object.values(res[i]);
        const dataCompletedTasksChart = {
          labels: keys,
          series: [
            excelValues
          ]
        };
        const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart,
          optionsCompletedTasksChart);
        this.startAnimationForLineChart(completedTasksChart);
      })
    })
    const optionsCompletedTasksChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 90, // creative tim: we recommend you to set the high sa the biggest value + something for a better
      // look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
    this.service.getUserReportAccess().subscribe(res => {
      var keys = Object.keys(res[0]);
      res.forEach((x, i) => {
        let excelValues = Object.values(res[i]);
        const dataWebsiteViewsChart = {
          labels: keys,
          series: [
            excelValues
          ]
        };
        const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);
        this.startAnimationForBarChart(websiteViewsChart);
      })
    })
    const optionsWebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 3000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    const responsiveOptions: any = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];


    $('#worldMap').vectorMap({
      map: 'world_en',
      backgroundColor: 'transparent',
      borderColor: '#818181',
      borderOpacity: 0.25,
      borderWidth: 1,
      color: '#b3b3b3',
      enableZoom: true,
      hoverColor: '#eee',
      hoverOpacity: null,
      normalizeFunction: 'linear',
      scaleColors: ['#b6d6ff', '#005ace'],
      selectedColor: '#c9dfaf',
      selectedRegions: null,
      showTooltip: true,
      onRegionClick: function (element, code, region) {
        var message = 'You clicked "'
          + region
          + '" which has the code: '
          + code.toUpperCase();

        alert(message);
      }
    });
  }
  ngAfterViewInit() {
    const breakCards = true;
    if (breakCards === true) {
      // We break the cards headers if there is too much stress on them :-)
      $('[data-header-animation="true"]').each = () => {
        const $fix_button = $(this);
        const $card = $(this).parent('.card');
        $card.find('.fix-broken-card').click = () => {
          const $header = $(this).parent().parent().siblings('.card-header, .card-image');
          $header.removeClass('hinge').addClass('fadeInDown');

          $card.attr('data-count', 0);

          setTimeout(function () {
            $header.removeClass('fadeInDown animate');
          }, 480);
        };

        $card.mouseenter = () => {
          const $this = $(this);
          const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
          $this.attr('data-count', hover_count);
          if (hover_count >= 20) {
            $(this).children('.card-header, .card-image').addClass('hinge animated');
          }
        };
      };
    }
  }
}
