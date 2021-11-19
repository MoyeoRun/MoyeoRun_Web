import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, ButtonBase, Dialog, DialogContent, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExitModal = ({ open, setOpen }) => {
  //   console.log(open);
  return (
    <Dialog
      disableEscapeKeyDown
      TransitionComponent={Transition}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogContent css={dialogWrapper}>
        <Box css={head}>모여런 종료</Box>
        <Box css={content}>
          <Box>러닝을 중단하시나요?</Box>
          <Box sx={{ marginTop: '6px' }}>포기하지 않으면 할 수 있어요!</Box>
          <Box css={buttonWrapper}>
            <ButtonBase
              onClick={() => {
                setOpen(false);
              }}
              css={cancleButton}
            >
              취소
            </ButtonBase>
            <ButtonBase
              onClick={() => {
                console.log('나가기');
              }}
              css={exitButton}
            >
              종료
            </ButtonBase>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default ExitModal;

const dialogWrapper = css`
  border-radius: 12px;
  background-color: #ffffff;
  padding: 23px;
`;
const head = css`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-family: Apple SD Gothic Neo;
  font-size: 22px;
  padding-bottom: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: -0.04em;
  text-align: left;
  color: #333333;
  border-bottom: 1px solid #ebecef;
`;
const content = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: Apple SD Gothic Neo;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.0008em;
  text-align: center;
  padding-top: 23px;
`;
const buttonWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 17px;
`;
const cancleButton = css`
  height: 48px;
  width: 130px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid #bdbec1;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Apple SD Gothic Neo;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.065em;
  text-align: left;
  color: #000000;
`;
const exitButton = css`
  border-radius: 4px;
  width: 124px;
  height: 48px;
  margin-left: 9px;
  background: #1162ff;
  border-radius: 4px;
  font-family: Apple SD Gothic Neo;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.065em;
  text-align: left;
  color: #ffffff;
`;
