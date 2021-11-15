/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomButton from '../CustomButton';

const RoomStateButton = ({ roomState }) => {
  const { isAttend, isMyRoom } = roomState;

  if (isAttend === false) return <CustomButton css={button(0)}>참여하기</CustomButton>;
  else if (isAttend == true && isMyRoom == true)
    return <CustomButton css={button(1)}>나가기</CustomButton>;
  else return <CustomButton css={button(2)}>이미 모여런에 참여 중입니다</CustomButton>;
};

const button = (state) => css`
  font-family: Apple SD Gothic Neo;
  font-size: 21px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: -0.05em;
  text-align: left;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
  height: 88px;
  border-radius: 0px;
  background-color: ${state === 0 ? '#1162ff' : state === 1 ? 'white' : '#E0E0E0'};
  color: ${state === 0 ? 'white' : state === 1 ? '#1162ff' : '#828282'};
`;
export default RoomStateButton;
