/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';

const FreeRunCard = ({ title, description }) => (
  <Box css={runCardWrapper}>
    <Box css={gradient}>
      <Box css={bottomTitle}>{title}</Box>
      <Box css={bottomDescription}>{description}</Box>
    </Box>
  </Box>
);

export default FreeRunCard;

const runCardWrapper = css`
  background-image: url('https://images.unsplash.com/photo-1604314923234-5144a466130f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 196px;
  border-radius: 3px;
`;

const gradient = css`
  width: calc(100% - 28px);
  height: calc(100% - 28px);
  padding: 14px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

const bottomTitle = css`
  width: 100%;
  font-family: text-500;
  font-size: 22px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const bottomDescription = css`
  width: 100%;
  font-family: text-500;
  font-size: 15px;
  color: white;
  opacity: 0.8;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
`;
