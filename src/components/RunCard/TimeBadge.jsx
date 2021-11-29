/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { ReactComponent as RunIcon } from '../../assets/svgs/RunIcon.svg';
import Text from '../Text';

const TimeBadge = ({ runTime, temp }) => {
  const second = (new Date(runTime) - new Date()) / 1000;
  return (
    <Box css={timeBadgeWrapper}>
      <RunIcon />
      <Text>
        {temp
          ? temp
          : second > 60
          ? second > 3600
            ? second > 86400
              ? Math.floor(second / 86400) + '일 전'
              : Math.floor(second / 3600) + '시간 전'
            : Math.floor(second / 60) + '분 전'
          : Math.floor(second) + '초 전'}
      </Text>
    </Box>
  );
};

export default TimeBadge;

const timeBadgeWrapper = css`
  width: 70px;
  height: 24px;
  padding: 0 5px;
  background: #1162ff;
  border-radius: 3px;
  font-family: text-500;
  font-size: 14px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  -webkit-box-shadow: 5px 4px 15px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 5px 4px 15px 5px rgba(0, 0, 0, 0.25);
`;
