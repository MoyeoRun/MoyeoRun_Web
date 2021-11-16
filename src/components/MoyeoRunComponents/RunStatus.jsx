/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getDistanceString, getPaceString, secondToTimeString } from '../../lib/util/strFormat';

const RunStatus = ({ runData }) => {
  return (
    <Box css={RunStatusWrapper}>
      <Box css={topDataBox}>
        <Box css={topData}>{getDistanceString(runData.distance)}</Box>
        <Box css={topDataTitle}>거리</Box>
      </Box>
      <Box css={topDataBox}>
        <Box css={topData}>{getPaceString(runData.pace)}</Box>
        <Box css={topDataTitle}>평균 페이스</Box>
      </Box>
      <Box css={topDataBox}>
        <Box css={topData}>{secondToTimeString(runData.time / 1000)}</Box>
        <Box css={topDataTitle}>시간</Box>
      </Box>
    </Box>
  );
};

export default RunStatus;

const RunStatusWrapper = css`
  position: fixed;
  width: calc(100% - 28px);
  height: 72px;
  bottom: 72px;
  left: 14px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 10px -4px #777777;
`;

//
const topDataBox = css`
  flex: 1;
  height: 47px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & + & {
    border-left: 0.5px solid #548eff;
  }
`;

const topData = css`
  font-family: SF Compact Display;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 33px;
  letter-spacing: -0.03em;
  text-align: left;
  color: #1162ff;
`;

const topDataTitle = css`
  font-family: Apple SD Gothic Neo;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: -0.05em;
  text-align: left;
  color: #1162ff;
`;

// const distanceData = css`
//   margin-top: 50px;
//   font-family: number-500;
//   font-size: 100px;
//   color: #111111;
// `;
// const distancetitle = css`
//   margin-top: 18px;
//   font-family: text-500;
//   font-size: 20px;
//   color: rgba(85, 85, 85, 0.8);
// `;
