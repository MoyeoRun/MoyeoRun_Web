/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { ReactComponent as ClockIcon_blue } from '../../assets/svgs/ClockIcon_Blue.svg';
import { secondToTimeString } from '../../lib/util/strFormat';

const Timer = ({ time, fixed }) => {
  return (
    <Box css={fixed ? fixedTimer : timer}>
      <ClockIcon_blue />
      <Box sx={{ marginLeft: '8px', transform: `translate(0, 1px)` }}>
        {secondToTimeString(time) || `00:00`}
      </Box>
    </Box>
  );
};

export default Timer;

const fixedTimer = css`
  position: fixed;
  width: 124px;
  height: 32px;
  left: 50%;
  top: 40px;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px -4px #777777;
  border-radius: 21px;
  background: #ffffff;
  z-index: 2;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: text-500;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.045em;
  text-align: left;
  color: #1162ff;
`;

const timer = css`
  width: 100%;
  height: 38px;
  display: flex;
  box-sizing: border-box;
  padding-top: 8px;
  justify-content: center;
  align-items: center;
  font-family: text-500;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.045em;
  text-align: left;
  color: #1162ff;
`;
