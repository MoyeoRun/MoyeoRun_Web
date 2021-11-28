/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TimeBadge from './TimeBadge';
import { ReactComponent as PeopleIcon } from '../../assets/svgs/PeopleIcon.svg';
import { Box } from '@mui/material';

const HotRunCard = ({ runData }) => (
  <Box
    css={runCardWrapper(
      runData.roomImage
        ? runData.roomImage
        : 'https://images.unsplash.com/photo-1604314923234-5144a466130f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80',
    )}
  >
    <Box css={gradient}>
      <TimeBadge runTime={runData.startDate} />
      <Box css={bottomWrapper}>
        <Box css={bottomTitle}>{runData.title}</Box>
        <Box css={people}>
          <PeopleIcon className="icon" />
          {runData && runData.multiRoomMember.length + '/' + runData.limitMember}
        </Box>
      </Box>
    </Box>
  </Box>
);

export default HotRunCard;

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
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
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
  text-align: start;
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
