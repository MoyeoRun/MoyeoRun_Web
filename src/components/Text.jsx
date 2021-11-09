/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Text = (props) => {
  return <p css={defaultStyle} {...props} />;
};

const defaultStyle = css`
  margin: 0;
  font-family: text-300;
`;

export default Text;
