import React from 'react';

import burgerLogo from '../../assets/images/icons8-hamburger-100.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;