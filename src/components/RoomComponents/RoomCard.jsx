/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as PeopleIcon } from '../../assets/svgs/PeopleIcon.svg';
import { ReactComponent as RunIcon } from '../../assets/svgs/RunIcon.svg';
import { ReactComponent as LeftBackArrowIcon_White } from '../../assets/svgs/LeftBackArrowIcon_White.svg';
import { Box, ButtonBase } from '@mui/material';

const TimeBadge = ({ runTime }) => {
  const second = (new Date(runTime) - new Date()) / 1000;
  return (
    <Box css={timeBadgeWrapper}>
      <RunIcon />
      {second > 60 ? Math.floor(second) + '초 전' : Math.floor(second / 60) + '초 전'}
    </Box>
  );
};

const RoomCard = ({ room, goBackProp, ...props }) => (
  <Box
    {...props}
    css={runCardWrapper(
      room.image
        ? room.image
        : 'https://images.unsplash.com/photo-1604314923234-5144a466130f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80',
    )}
  >
    <Box css={gradient}>
      {goBackProp && (
        <ButtonBase css={goBackButton}>
          <LeftBackArrowIcon_White stroke="white" />
          <Box sx={{ marginLeft: '6px' }}>뒤로가기</Box>
        </ButtonBase>
      )}
      <TimeBadge runTime={room.startDate} />
      <Box css={bottomWrapper}>
        <Box css={bottomTitle}>{room.title}</Box>
        <Box css={people}>
          <PeopleIcon className="icon" />
          {room.userAmount + '/' + room.limitMember}
        </Box>
      </Box>
    </Box>
  </Box>
);

export default RoomCard;

const runCardWrapper = (url) => css`
  background-image: ${`url(${url})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  border-radius: 3px;
`;

const gradient = css`
  width: calc(100% - 28px);
  height: calc(100% - 28px);
  padding: 14px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const goBackButton = css`
  display: flex;
  justify-content: centerflex;
  align-items: center;
  font-family: Apple SD Gothic Neo;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.04em;
  text-align: left;
  color: white;
`;
const bottomWrapper = css`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const bottomTitle = css`
  font-family: text-500;
  font-size: 24px;
  color: white;
  width: 190px;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const people = css`
  font-family: text-500;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: white;
  .icon {
    margin-right: 10px;
  }
`;

const timeBadgeWrapper = css`
  width: 62px;
  height: 24px;
  background: #1162ff;
  border-radius: 3px;
  font-family: text-500;
  font-size: 14px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  margin-top: 4px;
`;
