import React, { Component } from 'react';
import InputRange from 'react-input-range';
import PropTypes from 'prop-types';

import 'react-input-range/lib/css/index.css';
import './css/index.css';

class RangeSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: props.min,
      max: props.max,
      value: props.value,
      label: ''
    };
    this.onRangeChange = this.onRangeChange.bind(this);
  }

  onRangeChange(value) {
    this.setState({ value });
    this.setState({ label: value });
    console.log(value);
  }

  render() {
    return (
      <div className={'row range-slider-container'}>
        <div
          className={'col-md-2'}
          style={{
            padding: 0,
            fontSize: '8pt',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Label
        </div>
        <div className={'col-md-8'} style={{ padding: 0 }}>
          <InputRange
            allowSameValues={true}
            maxValue={this.state.max}
            minValue={this.state.min}
            value={this.state.value}
            onChange={this.onRangeChange}
          />
        </div>
        <div
          className={'col-md-2'}
          style={{
            padding: 0,
            fontSize: '8pt',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Label
        </div>
      </div>
    );
  }
}

RangeSlide.defaultProps = {
  min: 1,
  max: 10,
  value: {
    min: 3,
    max: 7
  },
  step: 1
};

RangeSlide.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.object,
  step: PropTypes.number
};

export default RangeSlide;
