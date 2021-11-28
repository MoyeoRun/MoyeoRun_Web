/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { ReactComponent as CommingSoonSvg } from '../../assets/svgs/CommingSoon.svg';

const CommingSoon = ({}) => {
  return (
    <Box css={svgSource}>
      <CommingSoonSvg css={svg} />
    </Box>
  );
};
export default CommingSoon;

const svgSource = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const svg = css`
  width: 100%;
  height: 100%;
`;
