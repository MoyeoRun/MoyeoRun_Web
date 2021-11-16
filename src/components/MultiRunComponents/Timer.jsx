/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { ReactComponent as ClockIcon_blue } from '../../assets/svgs/ClockIcon_Blue.svg';
import { secondToTimeString } from '../../lib/util/strFormat';

const Timer = ({ remainTime = 10000 }) => {
  console.log(remainTime);
  return (
    <Box css={timer}>
      <ClockIcon_blue />

      <Box sx={{ marginLeft: '8px', transform: `translate(0, 1px)` }}>
        {secondToTimeString(remainTime) || `00:00`}
      </Box>
    </Box>
  );
};

export default Timer;

const timer = css`
  position: fixed;
  width: 124px;
  height: 32px;
  left: 138px;
  top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 21px;
  font-family: Apple SD Gothic Neo;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.045em;
  text-align: left;
  color: #1162ff;

  box-shadow: 0px 0px 10px -4px #777777;
`;
