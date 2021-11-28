/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, ButtonBase } from '@mui/material';
import {
  getDistanceString,
  getModifiedDateString,
  secondToTimeString,
} from '../../lib/util/strFormat';

const DetailRecord = ({ value, keyword, ...props }) => {
  return (
    <Box {...props}>
      <Box css={detailRecordWrap}>
        <Box css={summaryValue}>{value}</Box>
        <Box css={summaryKeyword}>{keyword}</Box>
      </Box>
    </Box>
  );
};

const MultiRecordCard = ({ runRecord }) => {
  const { multiRoom, rank } = runRecord;
  const { id, roomImage, title, status, startDate, targetDistance, targetTime } = multiRoom;
  return (
    <ButtonBase
      css={multiRecordListWrapper}
      onClick={() => {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'goMultiDetail', value: id }));
      }}
    >
      {status !== 'Close' && <Box css={incompletedRecord}>아직 완료되지 않은 모여런입니다</Box>}
      <div
        style={{
          width: '90px',
          height: '90px',
          borderRadius: '4px',
          backgroundImage: `url(${roomImage})`,
          background: '#e8e8e8',
        }}
      ></div>
      <Box css={recordWrap}>
        <Box css={cardDate}>{getModifiedDateString(startDate)}</Box>
        <Box css={cardTitle}>{title}</Box>
        <Box css={cardRecordWrap}>
          <DetailRecord value={getDistanceString(targetDistance)} keyword="목표 거리" />
          <DetailRecord value={secondToTimeString(targetTime / 1000)} keyword="목표 시간" />
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default MultiRecordCard;

const multiRecordListWrapper = css`
  width: 100%;
  height: 115px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 12px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;
`;

const recordWrap = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 11px;
  margin-right: auto;
`;

const cardDate = css`
  font-family: number-500;
  font-size: 13px;
  font-weight: 400;
  color: #aaaaaa;
`;

const cardTitle = css`
  font-family: text-500;
  font-size: 16px;
  font-weight: 500;
  margin-top: 4px;
`;

const cardRecordWrap = css`
  display: flex;
  margin-top: 12px;
`;

const detailRecordWrap = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-right: 11px;
`;

const summaryValue = css`
  font-family: number-500;
  font-size: 16px;
  font-weight: 400;
`;
const summaryKeyword = css`
  font-family: text-500;
  font-size: 13px;
  font-weight: 400;
  margin-top: 3px;
  color: #aaaaaa;
`;
