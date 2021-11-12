/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Skeleton, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import Text from '../components/Text';
import tempProps from '../testData/runningData';

const Running = () => {
  const [props, setProps] = useState(null);
  const [menu, setMenu] = useState(0);

  const listener = (data) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'running') {
      setProps(propsData.value);
    }
  };

  const on = () => {
    const data = JSON.stringify({});
    window.ReactNativeWebView.onMessage(data);
  };

  useEffect(() => {
    //테스트 데이터 주입
    setProps(tempProps);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  return (
    <Box css={runningWrapper}>
      {props ? (
        <Text css={headTitle}>{props.user.name}님, 달려 볼까요?</Text>
      ) : (
        <Skeleton variant="text" css={headTitle} />
      )}
      <Tabs
        value={menu}
        onChange={(event, newValue) => {
          setMenu(newValue);
        }}
        css={menuWrapper}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
      >
        <Tab label="모여런" css={menuItem} />
        <Tab label="개인런" css={menuItem} />
      </Tabs>
      {menu === 0 && <Box>모여런</Box>}
      {menu === 1 && <Box>개인런</Box>}
    </Box>
  );
};

export default Running;

const runningWrapper = css`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 18px;
  padding-bottom: 88px;
  background-color: white;
`;

const headTitle = css`
  font-family: text-500;
  font-size: 24px;
  color: #333333;
  margin-top: 20px;
`;

const menuWrapper = css`
  margin-top: 20px;
  & .MuiTabs-indicator {
    display: flex;
    justify-content: center;
    background-color: transparent;
  }
  & .MuiTabs-indicatorSpan {
    width: 55px;
    background-color: #111;
  }
`;

const menuItem = css`
  height: fit-content;
  font-family: text-500;
  font-size: 18px;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  color: #828282;
  .MuiButtonBase-root {
    width: 55px !important;
    padding: 0;
  }
  .MuiTab-root {
    padding: 0;
    width: 55px !important;
  }
  &.Mui-selected {
    color: #111;
  }
  &.Mui-focusVisible {
    background-color: rgba(100, 95, 228, 0.32);
  }
`;
