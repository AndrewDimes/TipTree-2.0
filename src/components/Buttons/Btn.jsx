import React from 'react';
import './Btn.css';

function Btn(props) {
  return <button className="Btn">{props.label}</button>;
}

export default Btn;
