/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Box,
  FormControl,
  InputLabel,
  InputUnstyled,
  NativeSelect,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  MenuItem,
  Select,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReactComponent as LeftBackArrowIcon } from '../assets/svgs/LeftBackArrowIcon.svg';
import CustomButton from '../components/CustomButton';

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
  return (
    <>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        {/* <DialogTitle>Fill the form</DialogTitle> */}
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                id="height"
                native
                value={height}
                setHeight
                onChange={handleHeightChange}
                input={<OutlinedInput id="height" />}
              >
                <option aria-label="None" value="" />
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                native
                id="weight"
                value={weight}
                setWeight
                onChange={handleWeightChange}
                input={<OutlinedInput id="weight" />}
              >
                <option aria-label="None" value="" />
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

const BodyInfo = () => {
  const [props, setProps] = useState(null);

  const listener = (data) => {
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
      <Box>
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
          {height}
        </CustomButton>
      </Box>
      <Box css={typeTypo}>
        <Box>몸무게(kg)</Box>
        <CustomButton css={inputForm} onClick={handleClickOpen}>
          {weight}
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

const bodyInfoWrapper = css``;
const splitLine = css`
  border: 2px solid #f5f5f5;
`;
const discription = css`
  font-family: Apple SD Gothic Neo;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
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
`;

export default BodyInfo;
