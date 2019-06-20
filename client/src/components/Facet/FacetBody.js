import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class FacetBody extends Component {
  _getCollapse() {
    return this.props.collapse ? 'collapse' : '';
  }

  render() {
    return (
      <div
        id={`${this.props.id}`}
        className={this._getCollapse()}
        data-toggle={this._getCollapse()}
      >
        {this.props.children || this.props.content}
      </div>
    );
  }
}

FacetBody.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  id: PropTypes.string,
  collapse: PropTypes.bool,
  content: PropTypes.string
};

FacetBody.defaultProps = {
  collapse: false
};
