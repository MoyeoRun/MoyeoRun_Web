/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, ButtonBase } from '@mui/material';
import { ReactComponent as MoveToSelfMapIcon } from '../../assets/svgs/MoveToSelfMapIcon_MoyeoRun.svg';
import { ReactComponent as MoveToDividedMapIcon } from '../../assets/svgs/MoveToDividedMapIcon_MoyeoRun.svg';

const MoveToIndividualMapView = ({ onClick, userId }) => {
  return (
    <ButtonBase
      onClick={() => {
        console.log('individualMapView로 이동');
        onClick('individualMapView', userId);
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
        console.log('dividedMapView로 이동');
        onClick('dividedMapView');
      }}
    >
      <MoveToDividedMapIcon />
    </ButtonBase>
  );
};

const Widgets = ({ onHandelViewState, userId }) => {
  return (
    <Box css={widgetsWrap}>
      <MoveToIndividualMapView onClick={onHandelViewState} userId={userId} />
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
