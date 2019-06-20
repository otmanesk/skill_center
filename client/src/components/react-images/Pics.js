import React from 'react';

import PropTypes from 'prop-types';
const imageNotFound = require('assets/img/faces/pageNotFound.png');

const Pics = ({ src, alt, height, width, ...classes }) => {
  return <img {...classes} src={src} alt={alt} height={height} width={width} />;
};

Pics.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  alt: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Pics.defaultProps = {
  alt: 'Card image',
  src: 'imageNotFound',
  height: 960,
  width: 640
};
export default Pics;
