/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { getDistanceString, getPaceString, secondToTimeString } from '../../lib/util/strFormat';

const fadein = keyframes`
  from {
    transform: translate(0,50%);
    opacity: 0;
  }
  to {
    transform: translate(0,0%);

    opacity: 1;
  }

`;

const SummaryHead = ({ headData }) => {
  if (headData.length === 0) return null;
  return (
    <>
      <Box css={headWrap(headData.length)}>
        {headData.map((head, index) => (
          <Box key={index} css={headContainer}>
            <Box css={summaryHeadValue}>{head.value}</Box>
            <Box css={summaryHeadKeyword}>{head.keyword}</Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

const SummaryItem = ({ value, keyword }) => {
  return (
    <Box css={itemWrap}>
      <Box css={summaryValue}>{value}</Box>
      <Box css={summaryKeyword}>{keyword}</Box>
    </Box>
  );
};

const Summary = ({ summaryProps }) => {
  const {
    totalAveragePace,
    runPace,
    totalDistance,
    runDistance,
    totalTime,
    runTime,
    type,
    targetDistance,
    targetTime,
    id,
  } = summaryProps;
  console.log(summaryProps);
  const [headData, setHeadData] = useState();
  const typeValue = { free: '자유', time: '목표시간', distance: '목표거리' };
  const summaryDistance = getDistanceString(totalDistance || runDistance);
  const summaryPace = getPaceString(totalAveragePace || runPace);
  const summaryTime = secondToTimeString(totalTime || runTime);

  console.log(summaryPace, summaryTime, summaryDistance);
  const headInfo = id && {
    type: type,
    target: targetDistance || targetTime || '',
  };

  console.log(headInfo);
  const tempData = [];
  useEffect(() => {
    if (headInfo) {
      tempData.push({ value: typeValue[headInfo.type], keyword: '종류' });
      tempData.push(
        headInfo.target !== '' &&
          (headInfo.type === 'time'
            ? { value: secondToTimeString(headInfo.target), keyword: '목표' }
            : headInfo.type === 'distance'
            ? { value: getDistanceString(headInfo.target), keyword: '목표' }
            : headInfo.type === 'free' && null),
      );
      setHeadData(tempData);
    }
  }),
    [];

  return (
    <>
      <Box css={summaryWrap}>
        {headData && <SummaryHead headData={headData} />}
        <SummaryItem value={summaryDistance} keyword="거리" />
        <SummaryItem value={summaryPace} keyword="평균 페이스" sx={{ margin: 'auto' }} />
        <SummaryItem value={summaryTime} keyword="시간" />
      </Box>
    </>
  );
};

export default Summary;

const summaryWrap = css`
  margin-top: 27px;
  padding-bottom: 37px;
  display: flex;
  flex-direction: row;
`;
const itemWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow: hidden;
  animation: ${fadein} 0.4s ease;
`;
const headWrap = (length) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: ${length};
  border-right: 1px solid #1162ff;
  overflow: hidden;
  transition: all 0.3s ease;
`;
const headContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  animation: ${fadein} 0.4s ease;
`;
const summaryValue = css`
  font-family: number-500;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: -0.045em;
  text-align: left;
`;
const summaryKeyword = css`
  font-family: text-500;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.05em;
  text-align: left;
  color: #828282;
  margin-top: 8px;
`;

const summaryHeadValue = css`
  font-family: number-500;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: -0.045em;
  text-align: left;

  color: #1162ff;
`;
const summaryHeadKeyword = css`
  font-family: text-500;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.05em;
  text-align: left;
  color: #828282;
  margin-top: 8px;
`;
