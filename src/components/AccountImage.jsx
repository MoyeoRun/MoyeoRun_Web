/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import React from 'react';

const AccountImage = ({ image, size = 48 }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: size,
        backgroundImage: `url(${image}})`,
        backgroundSize: 'cover',
      }}
    />
  );
};

export default AccountImage;
