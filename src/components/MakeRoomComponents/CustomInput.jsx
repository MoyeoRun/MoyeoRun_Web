/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const CustomInput = ({ placeholder, value, setValue }) => {
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <InputBase
      css={input}
      placeholder={placeholder}
      multiline={true}
      value={value}
      onChange={onChange}
    ></InputBase>
  );
};
export default CustomInput;

const input = css`
  font-family: Apple SD Gothic Neo;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.04em;
  text-align: left;
  width: 100%;
  height: 100%;
  min-height: 88px;
  border: 1px solid #dcdddf;
  border-radius: 3px;
  padding: 15px;
  align-items: start;
  margin-top: 13px;
  & .MuiInputBase-input {
    font-family: Apple SD Gothic Neo;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
  }
`;
