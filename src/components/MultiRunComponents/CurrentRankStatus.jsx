/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { Box, ButtonBase, Dialog } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as ToggleIcon } from '../../assets/svgs/ToggleIcon.svg';

const CurrentRankStatus = ({ children }) => {
  // from -> to
  //  현재값 -> end값
  const ref = useRef();
  const [toggleState, setToggleState] = useState();
  const [startLine, endLine] = [-(200 - 48), 0];

  useEffect(() => {
    if (toggleState) {
      ref.current.style.bottom = `${endLine}px`;
    } else {
      ref.current.style.bottom = `${startLine}px`;
    }
  }, [toggleState]);

  const onPositionChange = () => {
    setToggleState(!toggleState);
    // falue->true 바뀐상황이면 창이 위로 올라가야함  : true->false 바뀐상황이면 창이 아래로 내려가야함,
  };

  return (
    <Box css={currentRankingWrapper} ref={ref}>
      <ButtonBase css={head} onClick={() => onPositionChange()}>
        <Box>실시간</Box>
        <ToggleIcon css={toggleIcon(toggleState)} />
      </ButtonBase>
      <Box css={content}>{children}</Box>
    </Box>
  );
};

const currentRankingWrapper = css`
  height: 200px;
  position: fixed;
  bottom: -152px;
  width: 100%;
  transition: all 0.3s ease;
  z-index: 2;
`;
const head = css`
  width: 100%;
  height: 48px;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: text-500;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.05em;
  text-align: left;
  background-color: white;
  border: 1px solid #adadad4e;
`;
const content = css`
  box-sizing: border-box;
  display: flex;
  background-color: white;
  padding: 10px;
  width: 100%;
  height: 100%;
`;
const toggleIcon = (onToggled) => css`
  transform: rotate(${onToggled ? 180 : 0}deg);
  transition: all 0.4s ease;
`;

export default CurrentRankStatus;
