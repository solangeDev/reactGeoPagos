import React from 'react';

const Header = props => (
  <div>
    <header>
      <div className="header-title">{props.title}</div>
      <div className="stepper">
        <div className={(props.step==1)?'step-item active':'step-item'}>1</div>
        <div className="division" />
        <div className={(props.step==2)?'step-item active':'step-item'}>2</div>
        <div className="division" />
        <div className={(props.step==3)?'step-item active':'step-item'}>3</div>
      </div>
    </header>
  </div>
);

export default Header;
