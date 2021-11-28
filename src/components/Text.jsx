/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Text = (props) => {
  return <p css={defaultStyle} {...props} />;
};

const defaultStyle = css`
  margin: 0;
  padding: 0;
  font-family: text-500;
`;

export default Text;
