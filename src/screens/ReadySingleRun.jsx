/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { ReactComponent as LeftIcon } from '../assets/svgs/LeftIcon.svg';
import CustomButton from '../components/CustomButton';
import Text from '../components/Text';

const ReadySingleRun = () => {
  const [props, setProps] = useState(null);
  const [select, setSelect] = useState(0);

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

  return (
    <Box css={readySingleRunWrapper}>
      <Box css={topWrapper}>
        <LeftIcon className="icon" />
        <Text className="text">자유 달리기</Text>
      </Box>
      <Text css={distanceData}>{5}</Text>
      <Text css={distancetitle}>킬로미터</Text>
      <CustomButton css={selectButton}>
        {select === 0 && '자유'}
        {select === 1 && '시간'}
        {select === 2 && '거리'}
      </CustomButton>
      <Box css={{ flex: 1 }}></Box>
      <IconButton css={operationButton}>시간</IconButton>
      <Box css={{ flex: 1 }}></Box>
    </Box>
  );
};

export default ReadySingleRun;

const readySingleRunWrapper = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const topWrapper = css`
  width: 100%;
  display: flex;
  align-items: center;
  .icon {
    height: 32px;
  }
  .text {
    font-family: text-500;
    font-weight: 600;
    font-size: 24px;
    letter-spacing: -0.045em;
    color: #333333;
    margin-left: 15px;
  }
`;

const distanceData = css`
  margin-top: 50px;
  font-family: number-500;
  font-size: 100px;
  color: #111111;
`;
const distancetitle = css`
  margin-top: 18px;
  font-family: text-500;
  font-size: 20px;
  color: rgba(85, 85, 85, 0.8);
`;

const selectButton = css`
  margin-top: 70px;
  background: white;
  border-radius: 32px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const operationButton = css`
  width: 112px;
  height: 112px;
  margin-top: 92px;
  border-radius: 50%;
  background-color: #1162ff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: text-500;
  font-size: 30px;
  &:hover {
    background-color: #1162ff;
  }
`;
