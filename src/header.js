import React from 'react';

const Header = props => (
  <div>
    <header>
      <div className="header-title">{props.title}</div>
      <div className="stepper">
        {/* {props.step} */}
        <div className="step-item active">1</div>
        <div className="division" />
        <div className="step-item">2</div>
        <div className="division" />
        <div className="step-item">3</div>
      </div>
    </header>
  </div>
);

export default Header;
