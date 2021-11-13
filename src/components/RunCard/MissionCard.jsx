/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';

const MissionCard = ({ missionData }) => (
  <Box
    css={runCardWrapper(
      missionData.image
        ? missionData.image
        : 'https://images.unsplash.com/photo-1604314923234-5144a466130f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80',
    )}
  >
    <Box css={gradient}>
      <Box css={bottomTitle}>{missionData.title}</Box>
      <Box css={bottomDescription}>{missionData.description}</Box>
    </Box>
  </Box>
);

export default MissionCard;

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
  font-size: 18px;
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
