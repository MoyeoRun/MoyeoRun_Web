/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';

const CustomButton = (props) => {
  return <Button variant="standard" css={defaultStyle} {...props} />;
};

const defaultStyle = css``;

export default CustomButton;
