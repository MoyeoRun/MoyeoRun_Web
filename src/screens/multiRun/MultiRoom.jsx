/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

const MultiRoom = () => {
  const [props, setProps] = useState(null);

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'MultiRoom') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  return <Box css={MultiRoomWrapper}></Box>;
};
const MultiRoomWrapper = css``;

export default MultiRoom;