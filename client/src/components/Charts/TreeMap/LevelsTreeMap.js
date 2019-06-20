import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Treemap from 'highcharts/modules/treemap';

export default class LevelsTreeMap extends Component {
  componentDidMount() {
    Treemap(Highcharts);
    Highcharts.chart('tree-container', {
      series: [
        {
          type: 'treemap',
          layoutAlgorithm: 'stripes',
          alternateStartingDirection: true,
          levels: [
            {
              level: 1,
              layoutAlgorithm: 'sliceAndDice',
              dataLabels: {
                enabled: true,
                align: 'left',
                verticalAlign: 'top',
                style: {
                  fontSize: '15px',
                  fontWeight: 'bold'
                }
              }
            }
          ],
          data: [
            {
              id: 'A',
              name: 'C#',
              color: '#EC2500'
            },
            {
              id: 'B',
              name: 'Python',
              color: '#ECE100'
            },
            {
              id: 'O',
              name: 'Go',
              color: '#EC9800'
            },
            {
              name: 'JS',
              parent: 'A',
              value: 5
            },
            {
              name: 'Android',
              parent: 'A',
              value: 3
            },
            {
              name: 'IOS',
              parent: 'A',
              value: 4
            },
            {
              name: 'PHP',
              parent: 'B',
              value: 4
            },
            {
              name: 'DevOps',
              parent: 'B',
              value: 10
            },
            {
              name: 'Tests',
              parent: 'B',
              value: 1
            },
            {
              name: 'React',
              parent: 'O',
              value: 1
            },
            {
              name: 'Angular',
              parent: 'O',
              value: 3
            },
            {
              name: 'Linux',
              parent: 'O',
              value: 3
            },
            {
              name: 'web Dev',
              parent: 'Kiwi',
              value: 2,
              color: '#9EDE00'
            }
          ]
        }
      ],
      title: {
        text: 'technologies consumption'
      }
    });
  }

  render() {
    return <div id="tree-container" />;
  }
}
