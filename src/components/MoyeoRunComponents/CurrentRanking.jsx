/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, ButtonBase, Dialog } from '@mui/material';
import React from 'react';

const CurrentRanking = ({ children }) => {
  return (
    <Box css={currentRankingWrapper}>
      <ButtonBase css={head}>
        <Box>현재 순위</Box>
        {/* <ToggleIcon /> */}
      </ButtonBase>
      <Box css={content}>{children}</Box>
    </Box>
  );
};

export default CurrentRanking;

const currentRankingWrapper = css`
  height: 200px;
  position: fixed;
  bottom: -152px;
  width: 100%;
  border: 1px solid;
`;
const head = css`
  box-sizing: border-box;
  padding: 14px;
  height: 20px;
  font-family: Apple SD Gothic Neo;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.05em;
  text-align: left;
`;
const content = css`
  padding: 10px;
`;
