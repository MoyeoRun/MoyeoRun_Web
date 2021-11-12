/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { ReactComponent as RunIcon } from '../../assets/svgs/RunIcon.svg';

const TimeBadge = ({ runTime }) => {
  const second = (new Date(runTime) - new Date()) / 1000;
  return (
    <Box css={timeBadgeWrapper}>
      <RunIcon />
      {second > 60 ? Math.floor(second) + '초 전' : Math.floor(second / 60) + '초 전'}
    </Box>
  );
};

export default TimeBadge;

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
`;
