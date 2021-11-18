/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import {
  getDistanceString,
  getModifiedDateString,
  getPaceString,
  secondToTimeString,
} from '../../lib/util/strFormat';

const Thumbnail = ({ src, ...props }) => {
  return (
    <div
      style={{
        width: '90px',
        height: '90px',
        borderRadius: '4px',
        backgroundImage: `url(${src})`,
      }}
    ></div>
  );
};

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

const DetailRecordCard = ({ detailRecord }) => {
  const { runDistance, runPace, runTime, createdAt, title, image } = detailRecord;
  const detailDistance = getDistanceString(runDistance);
  const detailPace = getPaceString(runPace);
  const detailTime = secondToTimeString(runTime);
  const detailDate = getModifiedDateString(createdAt);
  const detailImage = image || 'https://source.unsplash.com/random/90x90';
  const detailTitle = title || '제목도 받아와야 합니다';
  return (
    <>
      <Box css={cardWrap}>
        <Thumbnail src={detailImage} />
        <Box css={recordWrap}>
          <Box css={cardDate}>{detailDate}</Box>
          <Box css={cardTitle}>{detailTitle}</Box>
          <Box css={cardRecordWrap}>
            <DetailRecord value={detailDistance} keyword="거리" />
            <DetailRecord value={detailPace} keyword="평균 페이스" sx={{ margin: 'auto' }} />
            <DetailRecord value={detailTime} keyword="시간" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DetailRecordCard;

const cardWrap = css`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 12px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 4px;
`;

const recordWrap = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 11px;
`;
const detailRecordWrap = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-right: 11px;
`;

const cardDate = css`
  font-family: number-500;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.045em;
  text-align: left;
  color: #aaaaaa;
`;
const cardTitle = css`
  font-family: text-500;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: -0.045em;
  text-align: left;
  margin-top: 4px;
`;
const cardRecordWrap = css`
  display: flex;
  margin-top: 12px;
`;

const summaryValue = css`
  font-family: number-500;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.045em;
  text-align: left;
`;
const summaryKeyword = css`
  font-family: text-500;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.05em;
  text-align: left;
  margin-top: 3px;
  color: #aaaaaa;
`;
