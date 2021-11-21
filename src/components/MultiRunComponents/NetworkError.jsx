/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, ButtonBase, Dialog, DialogContent, Slide } from '@mui/material';
import { useEffect, useRef } from 'react';

const NetworkError = ({ error = false }) => {
  const ref = useRef();
  const [startLine, endLine] = [0, -100];

  useEffect(() => {
    // console.log(error);

    if (!error) {
      ref.current.style.top = `${endLine}px`;
    } else {
      ref.current.style.top = `${startLine}px`;
    }
  }, [error]);

  return (
    <Box css={networkError} ref={ref}>
      인터넷 연결이 원활하지 않습니다.
    </Box>
  );
};
export default NetworkError;

const networkError = css`
  position: fixed;
  width: 100%;
  height: 50px;
  left: 0px;
  top: -50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ef635b;
  font-family: text-500;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: -0.0208em;
  text-align: center;
  color: white;
  transition: all 0.3s ease;
  z-index: 4;
`;
