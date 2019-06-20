import React, { Component } from 'react';
import Highcharts from 'highcharts';

export default class Pie extends Component {
  componentDidMount() {
    Highcharts.chart('pie-chart-container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Technologies Pie'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color:
                (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                'black'
            }
          }
        }
      },
      series: [
        {
          name: 'Brands',
          colorByPoint: true,
          data: [`${this.props.data}`]
        }
      ]
    });
  }

  render() {
    return <div id={'pie-chart-container'} />;
  }
}
