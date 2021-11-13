/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ButtonUnstyled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import { ReactComponent as CalendarIcon } from '../../assets/svgs/CalendarIcon.svg';

const Filtering = ({ startDate, endDate }) => {
  return (
    <>
      <ButtonUnstyled css={Button} onClick={() => console.log(123)}>
        <Box css={flexWrap}>
          <CalendarIcon />
          <Box css={Typo}>{`2021년 11월 8 - 19일`}</Box>

          {/* {`${startYear}년 ${startMonth}월 ${startDay} - ${endDay}일`} */}
        </Box>
      </ButtonUnstyled>
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
