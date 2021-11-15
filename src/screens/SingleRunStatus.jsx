/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, IconButton } from '@mui/material';
import Text from '../components/Text';
import { getPaceString, secondToTimeString } from '../lib/util/strFormat';
import { ReactComponent as PauseIcon } from '../assets/svgs/PauseIcon.svg';
import { ReactComponent as StartIcon } from '../assets/svgs/StartIcon.svg';
import runData from '../testData/recordDetailServerData.json';
import useLongPress from '../lib/util/useLongPress';
import { useState } from 'react';
import { NaverMap, Polyline, Marker } from 'react-naver-maps';

const SingleRunStatus = (props) => {
  const [runStatus, setRunStatus] = useState({ isRunning: false, pace: 8.42, time: 12341 });
  const onStatusChange = useLongPress(
    () => {
      setRunStatus({ ...runStatus, isRunning: !runStatus.isRunning });
    },
    () => {},
    { delay: 300 },
  );

  return (
    <Box css={singleRunStatusWrapper}>
      <Box css={topDataWrapper}>
        <Box css={topDataBox}>
          <Text css={topData}>{secondToTimeString(runData.runTime / 1000)}</Text>
          <Text css={topDataTitle}>시간</Text>
        </Box>
        <Box css={topDataBox}>
          <Text css={topData}>{getPaceString(runData.runPace)}</Text>
          <Text css={topDataTitle}>평균 페이스</Text>
        </Box>
      </Box>
      <Text css={distanceData}>{Math.floor(runData.runDistance * 100) / 100}</Text>
      <Text css={distancetitle}>킬로미터</Text>
      <Box css={{ flex: 1 }}></Box>
      <IconButton {...onStatusChange} css={operationButton}>
        {runStatus.isRunning ? <PauseIcon /> : <StartIcon />}
      </IconButton>
      <Box css={{ flex: 1 }}></Box>
    </Box>
  );
};

export default SingleRunStatus;

const singleRunStatusWrapper = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
`;

const topDataWrapper = css`
  width: 100%;
  margin-top: 75px;
  display: flex;
`;

const topDataBox = css`
  flex: 1;
  height: 47px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:first-of-type {
    border-right: 1px solid #d1d1d6;
  }
`;

const topData = css`
  font-family: number-500;
  font-size: 40px;
  color: #111111;
`;

const topDataTitle = css`
  font-family: text-500;
  font-size: 24px;
  color: rgba(85, 85, 85, 0.8);
`;

const distanceData = css`
  margin-top: 50px;
  font-family: number-500;
  font-size: 100px;
  color: #111111;
`;
const distancetitle = css`
  margin-top: 18px;
  font-family: text-500;
  font-size: 20px;
  color: rgba(85, 85, 85, 0.8);
`;

const operationButton = css`
  width: 112px;
  height: 112px;
  margin-top: 92px;
  border-radius: 50%;
  background-color: #1162ff;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #1162ff;
  }
  &:active {
    background-color: #1162ff;
    transition: all 0.3s ease;
    transform: scale(1.15, 1.15);
  }
  &:not(:active) {
    background-color: #1162ff;
    transition: all 0.1s ease;
    transform: scale(1, 1);
  }
`;
