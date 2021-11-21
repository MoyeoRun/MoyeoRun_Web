/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ButtonBase } from '@mui/material';
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

const DetailHead = ({ value, keyword, ...props }) => {
  return (
    <Box {...props}>
      <Box css={detailRecordWrap}>
        <Box css={summaryValue}>{value}</Box>
        <Box css={summaryKeyword}>{keyword}</Box>
      </Box>
    </Box>
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

const DetailRecordCard = ({ runningList }) => {
  const {
    id,
    type,
    targetDistance,
    targetTime,
    runDistance,
    runPace,
    runTime,
    createdAt,
    title,
    image,
    multiRunIncompleted = false,
  } = runningList;
  const detailDistance = getDistanceString(runDistance);
  const detailPace = getPaceString(runPace);
  const detailTime = secondToTimeString(runTime);
  const detailDate = getModifiedDateString(createdAt);
  const detailImage = image || 'https://source.unsplash.com/random/90x90';
  const detailTitle = title || '제목도 받아와야 합니다';

  const placeholder = { type: '종류', target: '목표' };

  return (
    <>
      <ButtonBase css={cardWrap}>
        {multiRunIncompleted && <Box css={incompletedRecord}>아직 완료되지 않은 모여런입니다</Box>}

        <Thumbnail src={detailImage} />
        <Box css={recordWrap}>
          <Box css={cardDate}>{detailDate}</Box>
          <Box css={cardTitle}>{detailTitle}</Box>
          <Box css={cardRecordWrap}>
            <DetailHead value={detailDistance} keyword="거리" />
            <DetailRecord value={detailDistance} keyword="거리" />
            <DetailRecord value={detailPace} keyword="평균 페이스" sx={{ margin: 'auto' }} />
            <DetailRecord value={detailTime} keyword="시간" />
          </Box>
        </Box>
      </ButtonBase>
    </>
  );
};

export default DetailRecordCard;

const cardWrap = css`
  box-sizing: border-box;
  width: 100%;
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

const incompletedRecord = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background: rgba(231, 239, 255, 0.9);
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: text-500;
  font-size: 18px;
  font-weight: 500;
  color: #1162ff;
`;
