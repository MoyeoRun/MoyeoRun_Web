/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import Text from '../Text';

const GuideCard = ({ guideData }) => (
  <Box
    css={runCardWrapper(
      guideData.image
        ? guideData.image
        : 'https://images.unsplash.com/photo-1604314923234-5144a466130f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80',
    )}
  >
    <Box css={gradient}>
      <Text css={title}>{guideData.title}</Text>
      <Text css={description}>{guideData.description}</Text>
    </Box>
  </Box>
);

export default GuideCard;

const runCardWrapper = (url) => css`
  background-image: ${`url(${url})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 335px;
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
  justify-content: space-between;
  align-items: flex-end;
`;

const title = css`
  max-width: 200px;
  font-family: text-500;
  font-size: 22px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const description = css`
  text-align: right;
  font-family: text-500;
  font-size: 15px;
  color: white;
  opacity: 0.8;
  letter-spacing: -0.06em;
`;
