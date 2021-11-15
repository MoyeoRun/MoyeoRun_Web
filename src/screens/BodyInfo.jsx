/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, FormControl, Dialog, DialogContent, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReactComponent as LeftBackArrowIcon } from '../assets/svgs/LeftBackArrowIcon.svg';
import CustomButton from '../components/CustomButton';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSelect = ({
  open,
  weight,
  height,
  setWeight,
  setHeight,
  handleWeightChange,
  handleHeightChange,
  handleClose,
}) => {
  const weightRange = { min: 40, max: 120 };
  const heightRange = { min: 130, max: 230 };
  const weightArr = [];
  const heightArr = [];
  const w = weightRange.max - weightRange.min;
  const h = heightRange.max - heightRange.min;

  let temp1,
    temp2 = 0;
  for (let i = 0; i < w / 5; i++) {
    temp1 = weightRange.min + i * 5;
    weightArr.push(temp1);
  }
  for (let i = 0; i < h / 5; i++) {
    temp2 = heightRange.min + i * 5;
    heightArr.push(temp2);
  }

  return (
    <>
      <Dialog
        disableEscapeKeyDown
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
      >
        <DialogContent css={dialogWrap}>
          <Box css={dialogHead}>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleClose}>완료</Button>
          </Box>
          <Box component="form" css={dialogContent}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Box>키(cm)</Box>
              <select
                id="height"
                native
                value={height}
                setJeight
                onChange={handleHeightChange}
                css={selectForm}
              >
                {heightArr.map((height) => {
                  return <option value={height}> {height}cm </option>;
                })}
              </select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Box>몸무게(kg)</Box>
              <select
                native
                id="weight"
                value={weight}
                setWeight
                onChange={handleWeightChange}
                css={selectForm}
              >
                {weightArr.map((weight) => {
                  return <option value={weight}> {weight}kg </option>;
                })}
              </select>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

const BodyInfo = () => {
  const [props, setProps] = useState(null);

  const listener = ({ data }) => {
    const propsData = JSON.parse(data);
    if (propsData.type === 'bodyInfo') {
      setProps(propsData.value);
    }
  };

  const on = () => {
    const data = JSON.stringify({});
    window.ReactNativeWebView.onMessage(data);
  };

  useEffect(() => {
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();

  const handleWeightChange = (event) => {
    setWeight(Number(event.target.value) || '');
  };
  const handleHeightChange = (event) => {
    setHeight(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    // if (reason !== 'backdropClick') {
    setOpen(false);
    // }
  };

  return (
    <Box css={bodyInfoWrapper}>
      <Box css={backButton}>
        <LeftBackArrowIcon />
      </Box>
      <Box css={splitLine} />
      <Box css={discription}>
        <Box>{`신체정보를 입력해주시면`} </Box>
        <Box>{`효과적인 러닝 데이터를 얻을 수 있어요.`}</Box>
      </Box>

      <Box>
        <Box css={typeTypo}>키(cm)</Box>
        <CustomButton css={inputForm} onClick={handleClickOpen}>
          {height ? `${height}cm` : null}
        </CustomButton>
      </Box>
      <Box css={typeTypo}>
        <Box>몸무게(kg)</Box>
        <CustomButton css={inputForm} onClick={handleClickOpen}>
          {weight ? `${weight}kg` : null}
        </CustomButton>
      </Box>

      <CustomButton css={button}> 다음 </CustomButton>
      <DialogSelect
        open={open}
        weight={weight}
        height={height}
        setWeight={setWeight}
        setHeight={setHeight}
        handleWeightChange={handleWeightChange}
        handleHeightChange={handleHeightChange}
        handleClose={handleClose}
      />
    </Box>
  );
};

const bodyInfoWrapper = css`
  padding: 20px;
`;
const backButton = css`
  margin-top: 60px;
`;
const splitLine = css`
  border: 2px solid #f5f5f5;
  margin-top: 16px;
`;
const discription = css`
  font-family: Apple SD Gothic Neo;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  margin: 22px 0px 22px 0px;
`;
const typeTypo = css`
  font-family: Apple SD Gothic Neo;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: #c4c4c4;
  margin-top: 17px;
`;
const inputForm = css`
  border: 1px solid #d4d4d4;
  box-sizing: border-box;
  border-radius: 2px;
  width: 100%;
  font-family: Apple SD Gothic Neo;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  padding: 15px;
  border-radius: 2px;
  color: #333333;
  margin-top: 10px;
  min-height: 48px;
  display: flex;
  justify-content: start;
`;
const button = css`
  width: 100%;
  padding: 16px;
  font-family: Apple SD Gothic Neo;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  background-color: #1162ff;
  margin-top: 40px;
`;

const selectForm = css`
  border: 1px solid #d4d4d4;
  min-height: 48px;
  margin-top: 10px;
`;
const dialogWrap = css`
  position: fixed;
  width: calc(100% - 40px);
  height: 250px;
  bottom: 0px;
  left: 0;
  background: white;
  border-radius: 12px 12px 0 0;
  padding: 23px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const dialogContent = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 50%;
`;
const dialogHead = css`
  width: calc(100%);
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 10px;
  color: #007aff;
`;
export default BodyInfo;
