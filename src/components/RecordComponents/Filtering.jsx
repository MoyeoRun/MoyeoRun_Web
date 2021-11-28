/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ButtonUnstyled } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

import { ReactComponent as CalendarIcon } from '../../assets/svgs/CalendarIcon.svg';
import { getSelectedWeekNumber } from '../../lib/util/strFormat';
import CalenderPicker from './CalenderPicker';

const Filtering = ({ filteringProps, getSelectedWeekRecords }) => {
  console.log(filteringProps);
  const { startDate, showOneRecord } = filteringProps || {
    startDate: new Date(),
    showOneRecord: false,
  };
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };

  const date = new Date(startDate);
  // const week = Math.floor(date.getDate() / 7 + 1);
  const week = getSelectedWeekNumber(date);

  return (
    <>
      <ButtonUnstyled css={Button} onClick={() => setModalOpen(true)}>
        <Box css={flexWrap}>
          <CalendarIcon />
          <Box css={typo}>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${week}째주`}</Box>
        </Box>
      </ButtonUnstyled>
      <CalenderPicker
        open={modalOpen}
        handleClose={handleClose}
        getSelectedWeekRecords={getSelectedWeekRecords}
        selectedDay={startDate}
      />
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
const typo = css`
  font-family: number-500;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 8px;
  color: #333333;
`;
