import React, { Component } from 'react';
import shortId from 'shortid';
import PropTypes from 'prop-types';

export default class Facet extends Component {
  constructor(props) {
    super(props);
    this._cloneChild = this._cloneChild.bind(this);
  }

  _getChildrenProps() {
    return {
      collapse: this.props.collapse,
      id: `id-${shortId.generate()}`
    };
  }

  _cloneChild(child, props) {
    return React.cloneElement(child, props);
  }

  _getChildrenWithProps() {
    const props = this._getChildrenProps();
    return React.Children.map(
      this.props.children,
      child => this._cloneChild(child, props),
      null
    );
  }

  render() {
    return <li className="list-group-item">{this._getChildrenWithProps()}</li>;
  }
}

Facet.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};
