import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { UserService } from '../shared/user.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';

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

  constructor(private service: UserService) {

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
      high: 250, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
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
      high: 300,
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
