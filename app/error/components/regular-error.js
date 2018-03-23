// @flow
import React from 'react';
import { Link } from 'react-router-dom';

const RegularError = () => (
  <div>
    <h1>Ha ocurrido un error</h1>
    <Link to="/">go back to home</Link>
  </div>
);

export default RegularError;
