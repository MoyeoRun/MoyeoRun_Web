/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Text from '../../components/Text';
import { ReactComponent as RunMan } from '../../assets/svgs/RunMan.svg';

const ReadyMultiRun = () => {
  const [props, setProps] = useState({
    connectedUser: [],
    roomMember: [],
  });

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'readyMultiRun') {
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

  return (
    <Box css={readyMultiRunWrapper}>
      <RunMan />
      <ReactLoading type="spinningBubbles" color="white" width="60px" height="60px" />
      <Text css={title}>
        {props.connectedUser.length}/{props.roomMember.length} 대기중!
      </Text>
    </Box>
  );
};

export default ReadyMultiRun;

const readyMultiRunWrapper = css`
  width: 100%;
  height: calc(100% - 120px);
  padding: 60px 0;
  background: #1162ff;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
`;

const title = css`
  margin-top: 10px;
  font-family: text-500;
  font-size: 18px;
  color: white;
`;
