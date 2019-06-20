import React, {Component} from 'react';
import {TagCloud} from "react-tagcloud";
import PropTypes from 'prop-types';

export default class Cloud extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(tag) {
    alert(`'${tag.value}' was selected!`);
  }

  render() {
    return (
      <TagCloud minSize={12} maxSize={50} tags={this.props.data} onClick={this._handleClick}/>
    );
  }
}

Cloud.defaultProps = {
  data: [
    {value: "JavaScript", count: 38},
    {value: "React", count: 30},
    {value: "Nodejs", count: 28},
    {value: "Express.js", count: 25},
    {value: "HTML5", count: 33},
    {value: "Linux", count: 50},
    {value: "MongoDB", count: 50},
    {value: "Swift", count: 18},
    {value: "Apple", count: 38},
    {value: "X1", count: 50},
    {value: "IBM", count: 18},
    {value: "Amazon", count: 38},
    {value: "Google", count: 50},
    {value: "Tesla", count: 38},
    {value: "CSS3", count: 20}
  ]
};

Cloud.propTypes = {
  data: PropTypes.array
};