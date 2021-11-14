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
        (option) => option.value && <option value={option.value}>{option.label}</option>,
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

  if (!selectItems) return null;
  if (selectItems) {
    return (
      <>
        <Dialog
          disableEscapeKeyDown
          TransitionComponent={Transition}
          open={open}
          onClose={() => handleClose(type)}
        >
          <DialogContent css={dialogWrap}>
            <Box css={dialogHead}>
              <Button onClick={() => handleClose(type)}>취소</Button>
              <Button onClick={() => handleClose(type)}>완료</Button>
            </Box>
            <Box component="form" css={dialogContent}>
              {value.map((item) => (
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Box>{item.head}</Box>
                  <select
                    id={item.id}
                    native
                    value={item.value}
                    onChange={(e) => onChange(e, value, item.id)}
                    css={selectForm}
                  >
                    {<SelectOptions selectItems={selectItems} optionId={item.id} />}
                  </select>
                </FormControl>
              ))}
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
};

export default DialogSelect;

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
  height: 100%;
`;
const dialogHead = css`
  width: calc(100%);
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 10px;
  color: #007aff;
`;
