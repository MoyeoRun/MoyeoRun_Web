/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ButtonUnstyled } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

import { ReactComponent as CalendarIcon } from '../../assets/svgs/CalendarIcon.svg';
import CalenderPicker from './CalenderPicker';

const Filtering = ({ startDate, endDate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };
  const date = new Date(startDate);
  const week = Math.floor(date.getDate() / 7 + 1);

  return (
    <>
      <ButtonUnstyled css={Button} onClick={() => setModalOpen(true)}>
        <Box css={flexWrap}>
          <CalendarIcon />
          {`${date.getFullYear()}년 ${date.getMonth()}월 ${week}째주`}
        </Box>
      </ButtonUnstyled>
      <CalenderPicker open={modalOpen} handleClose={handleClose} />
    </>
  );
};

export default Filtering;

const Button = css`
  background: #ffffff;
  border-width: 0px;
`;
const flexWrap = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 11px;
`;
const Typo = css`
  font-family: SF Compact Display;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 8px;
`;
