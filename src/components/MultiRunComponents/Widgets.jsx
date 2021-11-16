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
    >
      <MoveToSelfMapIcon />
    </ButtonBase>
  );
};

const MoveToDiviedMapView = ({ onClick }) => {
  return (
    <ButtonBase
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
    <Box>
      <MoveToIndividualMapView onClick={onHandelViewState} />
      <MoveToDiviedMapView onClick={onHandelViewState} />
    </Box>
  );
};

export default Widgets;
