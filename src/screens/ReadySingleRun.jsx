/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

const ReadySingleRun = () => {
  const [props, setProps] = useState(null);

  const listener = (data) => {
    const propsData = JSON.parse(data);
    if (propsData.type === 'readySingleRun') {
      setProps(propsData.value);
    }
  };

  const on = () => {
    const data = JSON.stringify({});
    window.ReactNativeWebView.onMessage(data);
  };

  useEffect(() => {
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  return <Box css={readySingleRunWrapper}></Box>;
};
const readySingleRunWrapper = css``;

export default ReadySingleRun;
