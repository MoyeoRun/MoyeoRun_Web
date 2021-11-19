/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef } from 'react';
import { Button, FormControl, Dialog, DialogContent } from '@mui/material';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/system';
import { ConstructionOutlined } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SelectOptions = ({ selectItems, optionId }) => {
  const options = Object.values(selectItems.find((item) => optionId == item.id));
  return (
    <>
      {options.map(
        (option, index) =>
          option.value !== '' && (
            <option key={index} value={option.value}>
              {optionId === 'start/hour'
                ? option.value === 0
                  ? parseInt(option.label) + 12
                  : option.label
                : option.label}
            </option>
          ),
      )}
    </>
  );
};

const DialogSelect = ({ type, open, value, selectItems, setValue, handleClose }) => {
  const onChange = (e, value, id) => {
    const changedValue = value.find((item) => item.id == id);
    const changedValueIndex = value.findIndex((item) => item.id == id);
    changedValue.value = e.target.value;
    const updateValue = value.map((item, index) =>
      index === changedValueIndex ? changedValue : item,
    );
    setValue(updateValue);
  };

  const parseTitleData = selectItems[0].id.split('/')[0];
  const selectTitle = {
    start: '시작시간 선택',
    distance: '목표거리 선택',
    limit: '제한시간 선택',
    participants: '참여인원 선택',
  };

  if (!selectItems) return null;
  if (selectItems) {
    return (
      <>
        <Dialog
          disableEscapeKeyDown
          TransitionComponent={Transition}
          fullWidth={true}
          open={open}
          onClose={() => handleClose(type)}
          css={dialogWrapper}
        >
          <DialogContent css={dialogContainer}>
            <Box css={dialogHead}>
              <Box css={dialogHeadTitle}>{selectTitle[parseTitleData]}</Box>
            </Box>
            <Box component="form" css={dialogContent}>
              {value.map((item, index) => (
                <Box css={formControlWrap} key={index}>
                  <Box>{item.head}</Box>
                  <select
                    id={item.id}
                    value={item.value}
                    onChange={(e) => onChange(e, value, item.id)}
                    css={selectForm}
                  >
                    {<SelectOptions selectItems={selectItems} optionId={item.id} />}
                  </select>
                  {item.inputLabel && <Box css={inputLabel}>{item.inputLabel}</Box>}
                </Box>
              ))}
            </Box>
            <Box css={buttonWrapper}>
              <Button onClick={() => handleClose(type)} css={dialogButton(false)}>
                취소
              </Button>
              <Button onClick={() => handleClose(type)} css={dialogButton(true)}>
                선택완료
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
};

export default DialogSelect;

const dialogWrapper = css`
  width: 100%;
  height: 100%;
`;

const dialogContainer = css`
  width: 100%;
  height: 360px;
  background: white;
  box-sizing: border-box;
  border-radius: 12px;
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
  height: 100%;
`;
const dialogHead = css`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;

  border-bottom: 1px solid #ebecef;
`;

const dialogHeadTitle = css`
  font-family: text-500;
  font-size: 22px;
  font-style: normal;
  line-height: 26px;
  letter-spacing: -0.04em;
  text-align: left;
`;

const selectForm = css`
  border: 0px solid #d4d4d4;
  border-bottom: 0.5px solid #d4d4d4;
  background: #f0f0f0a7;
  box-shadow: 0px 2px 2px 0px #bcbcbc84;
  border-radius: 8px;
  min-width: 60px;
  min-height: 48px;
  margin-left: 10px;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.5px;
  text-align: center;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

const formControlWrap = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.5px;
  text-align: center;
`;

const inputLabel = css`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.5px;
  text-align: center;
  margin-left: 10px;
`;

const buttonWrapper = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const dialogButton = (selectButton) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 14px;
  width: 100%;
  border-radius: 4px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  border: ${selectButton ? '' : `1px solid #BDBEC1`};
  color: ${selectButton ? '#ffffff' : '#000000'};
  background-color: ${selectButton ? '#007aff' : '#ffffff'};
  margin-left: ${selectButton ? '10px' : ''};
`;
