/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import React from 'react';
import { ReactComponent as CrownIcon } from '../assets/svgs/CrownIcon.svg';

const AccountImage = ({ image, size = 48, isMe }) => {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: size,
          backgroundImage: `url(${image}})`,
          backgroundSize: 'cover',
        }}
      >
        {isMe && <CrownIcon css={crownIcon} />}
      </Box>
    </>
  );
};

export default AccountImage;

const crownIcon = css`
  position: absolute;
  bottom: 0px;
  right: 0px;
`;
