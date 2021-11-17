/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Timer } from '@mui/icons-material';
import { Box, ButtonBase } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReactComponent as ClockIcon } from '../../assets/svgs/ClockIcon_Blue.svg';
import { ReactComponent as MoveToSelfMapIcon } from '../../assets/svgs/MoveToSelfMapIcon_MoyeoRun.svg';
import { ReactComponent as MoveToDividedMapIcon } from '../../assets/svgs/MoveToDividedMapIcon_MoyeoRun.svg';
import AccountImage from '../AccountImage';

const MoveToIndividualMapView = ({ onClick }) => {
  return (
    <ButtonBase
      onClick={() => {
        console.log('individualMapView로 이동');
        onClick('selfMapView');
      }}
      css={buttonIcon}
    >
      <MoveToSelfMapIcon />
    </ButtonBase>
  );
};

const MoveToDiviedMapView = ({ onClick }) => {
  return (
    <ButtonBase
      css={buttonIcon}
      onClick={() => {
        console.log('dividedMapview로 이동');
        onClick('dividedMapview');
      }}
    >
      <MoveToDividedMapIcon />
    </ButtonBase>
  );
};

const Widgets = ({ onHandelViewState }) => {
  return (
    <Box css={widgetsWrap}>
      <MoveToIndividualMapView onClick={onHandelViewState} />
      <MoveToDiviedMapView onClick={onHandelViewState} />
    </Box>
  );
};

export default Widgets;

const widgetsWrap = css`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 64px;
  right: 22px;
  z-index: 1;
`;
const buttonIcon = css`
  width: 55px;
  height: 55px;
  padding: 15px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-top: 8px;
`;
