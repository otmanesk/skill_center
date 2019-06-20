import React from 'react';
import Types from './Types';
import Statistics from './Statistics';
import Programed from './Programed';
const Training = () => {
  return (
    <div>
      <Statistics />

      <Programed />

      <Types label="Created" number="10" />

      <Types label="In progress" number="10" />
    </div>
  );
};
export default Training;
