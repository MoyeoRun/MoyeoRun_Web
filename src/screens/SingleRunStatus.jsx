/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import Text from '../components/Text';
import { getDistanceString, getPaceString, secondToTimeString } from '../lib/util/strFormat';
import runData from '../testData/recordDetailServerData.json';

const SingleRunStatus = (props) => {
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
      <Box>버튼</Box>
    </Box>
  );
};

export default SingleRunStatus;

const singleRunStatusWrapper = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
