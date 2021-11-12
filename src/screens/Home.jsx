/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Grid, IconButton, Skeleton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import CustomButton from '../components/CustomButton';
import Text from '../components/Text';
import tempProps from '../testData/homeData';
import { ReactComponent as LogoMini } from '../assets/svgs/LogoMini.svg';
import { ReactComponent as RightArrowIcon } from '../assets/svgs/RightArrowIcon.svg';
import HotRunCard from '../components/RunCard/HotRunCard';
import MissionCard from '../components/RunCard/MissionCard';
import RecordCard from '../components/RunCard/RecordCard';

const Home = () => {
  const [props, setProps] = useState(null);
  const [scroll, setScroll] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    const updateScroll = () => {
      setScroll(window.scrollY || document.documentElement.scrollTop);
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  });

  const listener = (data) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'home') {
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
    <Box css={homeWrapper} ref={containerRef}>
      <Box css={header({ scrolled: scroll > 10 })}>
        <IconButton
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <LogoMini className="icon" />
        </IconButton>
        <Avatar
          className="personIcon"
          src="https://images.unsplash.com/photo-1613188665424-b6790816c9f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
        />
      </Box>
      {props ? (
        <Text css={headTitle}>{props.user.name}님, 즐거운 러닝 되세요</Text>
      ) : (
        <Skeleton variant="text" css={headTitle} />
      )}
      <Box css={runListTitle}>
        지금 인기있는 러닝
        <RightArrowIcon css={{ width: '12px', height: '12px' }} />
      </Box>
      <Box css={runListWraper}>
        <Box css={runList}>
          {props
            ? props.runList.map((runData) => (
                <Box css={runItem}>
                  <HotRunCard runData={runData} />
                </Box>
              ))
            : [1, 2, 3].map(() => <Skeleton variant="rectangular" width="335px" height="196px" />)}
        </Box>
      </Box>

      <Box css={missionWrapper}>
        <Text css={missionTitle}>새로운 미션</Text>
        <Grid container spacing={1} css={missionList}>
          {props
            ? props.missionList.map((missionData) => (
                <Grid item xs={6} css={missionItem}>
                  <MissionCard missionData={missionData} />
                </Grid>
              ))
            : [1, 2, 3].map(() => (
                <Grid item xs={6} css={missionItem}>
                  <Skeleton variant="rectangular" width="335px" height="196px" />
                </Grid>
              ))}
        </Grid>
      </Box>
      <CustomButton css={button}>전체보기 {'>'}</CustomButton>

      <Box css={recordWrapper}>
        <Text css={recordTitle}>지난 기록</Text>
        <Box css={recordList}>
          {props
            ? props.lastRecordList.map((recordData) => (
                <Box css={recordItem}>
                  <RecordCard recordData={recordData} />
                </Box>
              ))
            : [1, 2, 3].map(() => <Skeleton variant="rectangular" width="335px" height="196px" />)}
        </Box>
      </Box>
      <CustomButton css={button}>전체보기 {'>'}</CustomButton>
    </Box>
  );
};

export default Home;

const homeWrapper = css`
  width: calc(100% - 36px);
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 18px;
  padding-bottom: 88px;
  background-color: white;
`;

const header = ({ scrolled }) => css`
  width: calc(100vw - 36px);
  padding: 0 18px;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${scrolled && '0px 1px 1px rgba(0, 0, 0, 0.25);'};
  z-index: 1000;
  .icon {
    width: 27px;
    height: 27px;
  }
  .userIcon {
    width: 37px;
    height: 37px;
    border-radius: 50%;
  }
`;

const headTitle = css`
  font-family: text-500;
  font-size: 24px;
  color: #333333;
  margin-top: 60px;
`;

const runListTitle = css`
  height: 14px;
  width: 100%;
  font-family: text-500;
  font-size: 18px;
  color: #333333;
  margin-top: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const runListWraper = css`
  margin-top: 12px;
  width: 100%;
  height: 196px;
  overflow-x: hidden;
`;

const runList = css`
  display: flex;
  overflow-x: auto;
`;

const runItem = css`
  margin-right: 10px;
`;

const missionWrapper = css`
  width: 102%;
  margin-top: 30px;
`;

const missionTitle = css`
  font-family: text-500;
  font-size: 24px;
  margin-bottom: 16px;
  color: #333333;
`;

const missionList = css`
  width: 100%;
`;

const missionItem = css`
  height: 180px;
`;

const recordWrapper = css`
  width: 100%;
  margin-top: 54px;
`;

const recordTitle = css`
  font-family: text-500;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333333;
`;

const recordList = css`
  width: 100%;
`;

const recordItem = css`
  height: 89px;
  margin-bottom: 11px;
`;

const button = css`
  width: 100%;
  height: 44px;
  margin-top: 20px;
  background-color: #e0e0e0;
  font-family: text-500;
  font-size: 15px;
  color: #828282;
  &:hover {
    background-color: #e0e0e0;
  }
`;
