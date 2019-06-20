import React from 'react';
const Types = ({ number, label }) => {
  return (
    <div>
      <h3 className="headerBtn">
        <a id="a-cr" className="m-r-5" href="#">
          <span className="label label-info ">
            {label} : <span id="stat0">{number}</span>
          </span>
        </a>
      </h3>
    </div>
  );
};
export default Types;
