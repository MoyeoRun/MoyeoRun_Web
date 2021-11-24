/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, ButtonBase } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ExitModal, Timer } from '.';

const ExitWindow = ({ title, children, timerProps }) => {
  const ref = useRef();
  const exitWindowRef = useRef();
  const mouseEventRef = { type: '', change: 'false' };
  const [open, setOpen] = useState(false);
  const onMouseDown = () => {
    mouseEventRef.type = 'click';
  };

  const onMouseMove = () => {
    mouseEventRef.type = 'drag';
  };

  const onOnlyClick = (e) => {
    // console.log(e.target.tagName, e.currentTarget.tagName);
    const [startLine, endLine] = [-200, 0];
    if (
      e.target.tagName !== 'BUTTON' &&
      e.target.tagName !== 'svg' &&
      e.target.tagName !== 'path'
    ) {
      if (mouseEventRef.type === 'click') {
        mouseEventRef.change = !mouseEventRef.change;
        if (mouseEventRef.change) {
          exitWindowRef.current.style.top = `${startLine}px`;
        } else {
          exitWindowRef.current.style.top = `${endLine}px`;
        }
      }
    }
  };

  useEffect(() => {
    console.log('이벤트 등록 useEffect');
    if (ref.current) {
      ref.current.addEventListener('mousedown', onMouseDown);
      ref.current.addEventListener('mousemove', onMouseMove);
      ref.current.addEventListener('mouseup', onOnlyClick, true);
    }
  }, []);

  return (
    <>
      <Box css={wholeScreenWrapper} ref={ref}>
        {children}

        <Box css={exitWindow} ref={exitWindowRef}>
          <Box css={titleStyle}>
            <Box>{title || '바람 부는 날 5km 함께 뛰어요'}</Box>
            <ButtonBase
              css={exitButton}
              onClick={() => {
                console.log(123123);
                setOpen(true);
              }}
            >
              나가기
            </ButtonBase>
          </Box>
          <Timer timerProps={timerProps} />
        </Box>
      </Box>
      <ExitModal open={open} setOpen={setOpen} />
    </>
  );
};

const wholeScreenWrapper = css`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const exitWindow = css`
  position: fixed;
  box-sizing: border-box;
  top: -200px;
  width: 100%;
  height: 130px;
  padding: 11px 16px;
  background-color: white;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 4;
`;

const titleStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  padding-bottom: 13px;
  font-family: text-500;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: -0.05em;
  text-align: left;
  border-bottom: 1px solid #dcdddf;
`;
const exitButton = css`
  padding: 8px;
  font-family: text-500;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.045em;
  text-align: left;
  color: #1162ff;
`;

export default ExitWindow;
