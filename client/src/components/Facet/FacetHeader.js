import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FacetHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: 0
    };
    this._changeIcon = this._changeIcon.bind(this);
  }

  _changeIcon() {
    const icon = this.state.icon ^ 1;
    this.setState({
      icon
    });
  }

  _getIcon() {
    let icon = '';
    if (this.props.collapse) {
      if (this.state.icon) {
        icon = (
          <span>
            <i className="far fa-minus-square" />
          </span>
        );
      } else {
        icon = (
          <span>
            <i className="far fa-plus-square" />
          </span>
        );
      }
    }
    return icon;
  }

  _getCollapse() {
    return this.props.collapse ? 'collapse' : '';
  }

  _getRightElement() {
    if (this.props.collapse) {
      return this._getCollapseIcon();
    }
    return this.props.children;
  }

  _getCollapseIcon() {
    return (
      <button
        className="btn btn-link"
        type="button"
        data-toggle={this._getCollapse()}
        data-target={`#${this.props.id}`}
        onClick={this._changeIcon}
      >
        {this._getIcon()}
      </button>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-4 text-left">
          <button
            className="btn btn-link"
            type="button"
            data-toggle={this._getCollapse()}
            data-target={`#${this.props.id}`}
            onClick={this._changeIcon}
          >
            <span className={this.props.icon} />
            {this.props.title}
          </button>
        </div>
        <div className="col-8 text-right">{this._getRightElement()}</div>
      </div>
    );
  }
}

FacetHeader.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  id: PropTypes.string,
  collapse: PropTypes.bool,
  title: PropTypes.string
};

FacetHeader.defaultProps = {
  collapse: false
};
