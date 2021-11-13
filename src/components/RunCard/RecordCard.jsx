/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import Text from '../Text';

const RecordCard = ({ recordData }) => (
  <Box
    css={runCardWrapper(
      recordData.image
        ? recordData.image
        : 'https://images.unsplash.com/photo-1604314923234-5144a466130f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80',
    )}
  >
    <Box css={gradient}>
      <Text css={tobTitle}>{recordData.title}</Text>
      <Box css={bottomWrapepr}>
        <Text css={bottomTitle}>순위</Text>
        <Text css={bottomDescription}>{recordData.rate + '/' + recordData.amount}</Text>
      </Box>
    </Box>
  </Box>
);

export default RecordCard;

const runCardWrapper = (url) => css`
  background-image: ${`url(${url})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  border-radius: 3px;
`;

const gradient = css`
  width: calc(100% - 28px);
  height: calc(100% - 28px);
  padding: 14px;
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const tobTitle = css`
  width: 100%;
  font-family: text-500;
  font-size: 23px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const bottomWrapepr = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const bottomTitle = css`
  font-family: text-500;
  font-size: 16px;
  color: white;
`;

const bottomDescription = css`
  font-family: text-500;
  font-size: 16px;
  color: white;
`;
