/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { Box } from '@mui/system';
import { getDistanceString, getPaceString, secondToTimeString } from '../../lib/util/strFormat';

const SummaryItem = ({ value, keyword }) => {
  return (
    <Box css={itemWrap}>
      <Box css={summaryValue}>{value}</Box>
      <Box css={summaryKeyword}>{keyword}</Box>
    </Box>
  );
};

const Summary = ({ summary }) => {
  const { time, distance, pace } = summary;
  const summaryDistance = getDistanceString(distance);
  const summaryPace = getPaceString(pace);
  const summaryTime = secondToTimeString(time / 1000);

  return (
    <>
      <Box css={summaryWrap}>
        <Box css={summaryItemWrap}>
          <SummaryItem value={summaryDistance} keyword="거리" />
          <SummaryItem value={summaryPace} keyword="평균 페이스" sx={{ margin: 'auto' }} />
          <SummaryItem value={summaryTime} keyword="시간" />
        </Box>
      </Box>
    </>
  );
};

export default Summary;

const summaryWrap = css`
  margin-top: 27px;
  padding-bottom: 10px;
  display: flex;
`;
const summaryItemWrap = css`
  display: flex;
  flex-direction: row;
  flex: 3;
  transition: all 0.3s ease;
`;
const itemWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow: hidden;
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
