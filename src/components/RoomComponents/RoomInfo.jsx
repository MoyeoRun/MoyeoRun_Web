/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { ReactComponent as PeopleIcon_Room } from '../../assets/svgs/PeopleIcon_Room.svg';
import { ReactComponent as ClockIcon_Room } from '../../assets/svgs/ClockIcon_Room.svg';
import { ReactComponent as DistanceIcon_Room } from '../../assets/svgs/DistanceIcon_Room.svg';
// import React from 'react';
// startDate: '2021-11-14T12:31:04.672Z',
// targetDistance: 3,
// targetTime: 30,
// roomImage: '',

const startTimeString = (startTime) => {
  const parseDate = startTime.toString().split('-');
  const beforeHour = parseInt(parseDate[2].slice(3, 5));
  const AMorPM = beforeHour <= 12 ? '오전' : '오후';
  const hour = beforeHour <= 12 ? beforeHour.toString() : (beforeHour - 12).toString();
  const min = parseDate[2].slice(6, 8);
  return AMorPM + ' ' + hour + ' : ' + min;
};
const targetTimeString = (targetTime) => {
  return `${parseInt(targetTime / 60) ? `${parseInt(targetTime / 60)}시간` : ''} ${
    (targetTime % 60) + '분'
  }`;
};

const RoomInfo = ({ room = room }) => {
  const { limitMember, startDate, targetDistance, targetTime } = room;

  return (
    <Box css={roomInfoWrapper}>
      <Box css={roomInfoPart}>
        <Content css={content}>
          <DistanceIcon_Room />
          <Keyword>목표거리</Keyword>
          <Value>{targetDistance}km</Value>
        </Content>
        <Content>
          <PeopleIcon_Room />
          <Keyword>인원</Keyword>
          <Value>{limitMember}명</Value>
        </Content>
      </Box>
      <Box css={splitLine} />
      <Box css={roomInfoPart}>
        <Content>
          <ClockIcon_Room />
          <Keyword>시작시간</Keyword>
          <Value>{startTimeString(startDate)}</Value>
        </Content>
        <Content>
          <ClockIcon_Room />
          <Keyword>제한시간</Keyword>
          <Value>{targetTimeString(targetTime)}</Value>
        </Content>
      </Box>
    </Box>
  );
};

const Content = ({ children }) => <Box css={content}>{children}</Box>;
const Keyword = ({ children }) => <Box css={keyword}>{children}</Box>;
const Value = ({ children }) => <Box css={value}>{children}</Box>;

export default RoomInfo;

const roomInfoWrapper = css`
  background: #f8f8f8;
  border-radius: 4px;
  padding: 0px 12px;
  display: flex;
  flex-direction: column;
  margin-top: 9px;
  margin-bottom: 24px;
`;
const roomInfoPart = css`
  display: flex;
  flex-direction: row;
  padding: 15px 0px;
`;
const splitLine = css`
  width: 100%;
  border: 0.75px solid #dcdddf;
`;
const content = css`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
`;
const keyword = css`
  font-family: Apple SD Gothic Neo;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.045em;
  text-align: left;
  color: #6a6a6a;
  margin-left: 10px;
`;
const value = css`
  font-family: SF Compact Display;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.01em;
  text-align: left;
  margin-left: 15px;
  color: #000000;
`;
