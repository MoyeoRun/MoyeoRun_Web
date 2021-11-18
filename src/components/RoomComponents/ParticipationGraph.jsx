/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';

const ParticipationGraph = ({ limitMember, userAmount }) => {
  const ratio = userAmount / limitMember;
  return (
    <Box css={graphBackground}>
      <Box css={deadLinePosition(ratio)}>
        <Box css={deadLine}>방 마감</Box>
      </Box>
      <Box css={graphFill(ratio)} />
    </Box>
  );
};
const graphBackground = css`
  position: relative;
  height: 8px;
  width: 100%;
  background-color: #dcdddf;
  display: flex;
  justify-content: flex-start;
  margin-top: 36px;
`;

const graphFill = (ratio) => css`
  width: calc(100% * ${ratio});
  height: 100%;
  background-color: #1162ff;
`;
const deadLinePosition = (ratio) => css`
  position: absolute;
  width: 100%;
  top: -38px;
  left: calc(100% * ${ratio});
`;

const deadLine = css`
  box-sizing: border-box;
  width: 50px;
  height: 32px;
  background-image: url("data:image/svg+xml,%3Csvg width='50' height='32' viewBox='0 0 50 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3 0C1.34315 0 0 1.34315 0 3V23C0 24.6569 1.34315 26 3 26H19.7178L25.0742 31.1421L30.4306 26H47C48.6569 26 50 24.6569 50 23V3C50 1.34315 48.6569 0 47 0H3Z' fill='%231162FF'/%3E%3C/svg%3E%0A");
  font-family: text-500;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: -0.05em;
  text-align: left;
  color: white;
  padding: 8px;
  display: flex;
  justify-content: center;
  transform: translate(-50%, 0);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export default ParticipationGraph;
