import React, { useState } from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 2.75rem;
  height: 1.5rem;

  input {
    display: none;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #C8C8C8;
    transition: 0.4s;
    border-radius: 14px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.5rem;
    width: 1.5rem;
    left: 0;
    bottom: 0;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }
`;

const Switch = ({ onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <SwitchContainer>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className="slider"></span>
    </SwitchContainer>
  );
};

export default Switch;
