/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import AccountImage from '../AccountImage';

const Host = ({ image, message, host }) => {
  return (
    <Box css={hostWrap}>
      <Box css={account}>
        <AccountImage image={image} isMe={true} />
        <Box css={accountName}>{host}</Box>
      </Box>
      <Box css={hostMessage}>{message}</Box>
    </Box>
  );
};
export default Host;
const hostWrap = css`
  margin-top: 20px;
  margin-bottom: 37px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const hostMessage = css`
  width: 100%;
  padding: 15px 0px;
  border-radius: 8px;
  font-family: text-500;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: -0.04em;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-image: url("data:image/svg+xml, %3Csvg width='260' height='49' viewBox='0 0 260 49' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M21 1C16.5817 1 13 4.58172 13 9V19.2413L1.70174 22.772C0.793223 23.056 0.757651 24.3286 1.64889 24.6628L13 28.9195V40C13 44.4183 16.5817 48 21 48H251C255.418 48 259 44.4183 259 40V9C259 4.58172 255.418 1 251 1H21Z' fill='%23F8F8F8' /%3E%3Cpath d='M13 19.2413L13.1491 19.7186L13.5 19.6089V19.2413H13ZM1.70174 22.772L1.5526 22.2948H1.5526L1.70174 22.772ZM1.64889 24.6628L1.82446 24.1947H1.82446L1.64889 24.6628ZM13 28.9195H13.5V28.573L13.1756 28.4513L13 28.9195ZM13.5 9C13.5 4.85786 16.8579 1.5 21 1.5V0.5C16.3056 0.5 12.5 4.30558 12.5 9H13.5ZM13.5 19.2413V9H12.5V19.2413H13.5ZM1.85088 23.2493L13.1491 19.7186L12.8509 18.7641L1.5526 22.2948L1.85088 23.2493ZM1.82446 24.1947C1.37883 24.0276 1.39662 23.3912 1.85088 23.2493L1.5526 22.2948C0.189826 22.7207 0.136468 24.6297 1.47333 25.131L1.82446 24.1947ZM13.1756 28.4513L1.82446 24.1947L1.47333 25.131L12.8244 29.3877L13.1756 28.4513ZM13.5 40V28.9195H12.5V40H13.5ZM21 47.5C16.8579 47.5 13.5 44.1421 13.5 40H12.5C12.5 44.6944 16.3056 48.5 21 48.5V47.5ZM251 47.5H21V48.5H251V47.5ZM258.5 40C258.5 44.1421 255.142 47.5 251 47.5V48.5C255.694 48.5 259.5 44.6944 259.5 40H258.5ZM258.5 9V40H259.5V9H258.5ZM251 1.5C255.142 1.5 258.5 4.85787 258.5 9H259.5C259.5 4.30558 255.694 0.5 251 0.5V1.5ZM21 1.5H251V0.5H21V1.5Z' fill='%23F2F2F2' /%3E%3C/svg%3E");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
const account = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 14px;
`;

const accountName = css`
  position: absolute;
  bottom: -18px;
  font-family: text-500;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: -0.065em;
  text-align: left;
  color: #1162ff;
  margin-top: 4px;
`;
