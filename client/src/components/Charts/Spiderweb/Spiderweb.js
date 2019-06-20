import React, { Component } from 'react';
import Highcharts from 'highcharts';

class Spiderweb extends Component {
  componentDidMount() {
    Highcharts.chart('spiderweb-chart-container', {
      chart: {
        polar: true,
        type: 'line'
      },
      title: {
        text: 'Technical Skills',
        x: -80
      },
      pane: {
        size: '80%'
      },
      xAxis: {
        categories: [
          'Team Building',
          'Marketing',
          'Development',
          'Listening',
          'Information Technology',
          'Administration'
        ],
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
      },
      tooltip: {
        shared: true,
        pointFormat:
          '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
      },
      series: [
        {
          name: 'Actual Skills',
          data: [43000, 19000, 60000, 35000, 17000, 10000],
          pointPlacement: 'on'
        },
        {
          name: 'In Progress Skills',
          data: [50000, 39000, 42000, 31000, 26000, 14000],
          pointPlacement: 'on'
        }
      ]
    });
  }

  render() {
    return <div id={'spiderweb-chart-container'} />;
  }
}

export default Spiderweb;
