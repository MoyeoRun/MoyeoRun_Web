/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar } from '@mui/material';

const AccountImage = ({ image, size = 48, isMe }) => {
  return (
    <Avatar
      src={image}
      css={{
        width: size,
        height: size,
        borderRadius: '50%',
      }}
    />
  );
};

export default AccountImage;

const crownIcon = css`
  position: absolute;
  bottom: 0px;
  right: 0px;
`;
