/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/system';
import React from 'react';
import { getDistanceString, getPaceString, secondToTimeString } from '../../lib/util/strFormat';

const SummaryItem = ({ value, keyword, ...props }) => {
  return (
    <Box {...props}>
      <Box css={itemWrap}>
        <Box css={summaryValue}>{value}</Box>
        <Box css={summaryKeyword}>{keyword}</Box>
      </Box>
    </Box>
  );
};

const Summary = ({ summaryRecord }) => {
  const summaryDistance = getDistanceString(summaryRecord.distance);
  const summaryPace = getPaceString(summaryRecord.pace);
  const summaryTime = secondToTimeString(summaryRecord.time);

  return (
    <>
      <Box css={summaryWrap}>
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
  padding: 0px 30px 37px 30px;
  display: flex;
  flex-direction: row;
`;
const itemWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const summaryValue = css`
  font-family: SF Compact Display;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: -0.045em;
  text-align: left;
`;
const summaryKeyword = css`
  font-family: Apple SD Gothic Neo;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.05em;
  text-align: left;
  color: #828282;
  margin-top: 8px;
`;
