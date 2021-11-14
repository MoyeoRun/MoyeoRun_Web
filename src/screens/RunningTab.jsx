/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Dialog, IconButton, Skeleton, Slide, Tab, Tabs } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import Text from '../components/Text';
import tempProps from '../testData/runningData';
import GuideCard from '../components/RunCard/GuideCard';
import FreeRunCard from '../components/RunCard/FreeRunCard';
import MoyeoRunCard from '../components/RunCard/HotRunCard';
import { ReactComponent as PlusIcon } from '../assets/svgs/PlusIcon.svg';
import { ReactComponent as CancleIcon } from '../assets/svgs/CancleIcon.svg';
import CustomButton from '../components/CustomButton';
import { useLocation } from 'react-router';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RunningTab = () => {
  const [props, setProps] = useState(null);
  const [menu, setMenu] = useState(0);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'runningTab') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    if (pathname === '/test/runningTab') setProps(tempProps);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  return (
    <Box css={runningTabWrapper}>
      {props ? (
        <Box css={headWrapper}>
          <Text css={headTitle}>
            {props.user.name}님,
            <br /> 달려 볼까요?
          </Text>
          {menu === 0 && (
            <IconButton onClick={handleClickOpen} css={{ flexShrink: 0 }}>
              <PlusIcon />
            </IconButton>
          )}
          <Dialog TransitionComponent={Transition} open={open} onClose={handleClose}>
            <Box css={makeRoomWrapper}>
              <Box className="header">
                <Text className="title">방 만들기</Text>
                <IconButton className="icon" onClick={handleClose}>
                  <CancleIcon />
                </IconButton>
              </Box>
              <Text className="description">목표를 설정하고 함께 뛸 수 있어요!</Text>
              <CustomButton
                className="button"
                onClick={() => {
                  window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'goMakeRoom' }));
                }}
              >
                방 만들기
              </CustomButton>
            </Box>
          </Dialog>
        </Box>
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
      {menu === 0 && (
        <Box css={section}>
          {props
            ? props.moyeoRunList.map((moyeoRunData) => (
                <Box css={moyeoRunItem}>
                  <MoyeoRunCard runData={moyeoRunData} />
                </Box>
              ))
            : [1, 2, 3].map(() => <Skeleton css={moyeoRunItem} />)}
        </Box>
      )}
      {menu === 1 && (
        <Box css={section}>
          <FreeRunCard title="자유 달리기" description="원하는 만큼 자유롭게 달려보세요" />
          <Text css={singleRunTitle}>러닝 가이드</Text>
          <Box css={runListWraper}>
            <Box css={runList}>
              {props
                ? props.singleRunGuideList.map((guideData) => (
                    <Box css={runItem}>
                      <GuideCard guideData={guideData} />
                    </Box>
                  ))
                : [1, 2, 3].map(() => (
                    <Skeleton variant="rectangular" width="335px" height="196px" />
                  ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RunningTab;

const runningTabWrapper = css`
  width: calc(100% - 36px);
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 18px;
  padding-bottom: 88px;
  background-color: white;
`;

const headWrapper = css`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const headTitle = css`
  width: 200px;
  font-family: text-500;
  font-size: 24px;
  color: #333333;
`;

const makeRoomWrapper = css`
  position: fixed;
  width: calc(100% - 40px);
  height: 317px;
  bottom: 0px;
  left: 0;
  background: white;
  border-radius: 12px 12px 0 0;
  padding: 23px 20px;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    .title {
      font-family: text-500;
      font-weight: 600;
      font-size: 24px;
      color: #333333;
    }
    .icon {
      position: absolute;
      right: 12px;
      top: 17px;
    }
  }
  .description {
    width: 100%;
    flex: 1;
    text-align: center;
    margin-top: 52px;
    font-family: text-500;
    font-size: 18px;
    color: #505050;
  }
  .button {
    margin-top: 66px;
    margin-bottom: 70px;
    width: 100%;
    height: 56px;
    border-radius: 4px;
    background-color: #1162ff;
    color: white;
    font-size: 18px;
    &:hover {
      background-color: #1162ff;
    }
  }
`;

const menuWrapper = css`
  margin-top: 20px;
  & .MuiTabs-indicator {
    display: flex;
    justify-content: center;
    background-color: transparent;
  }
  & .MuiTabs-indicatorSpan {
    width: 100%;
    background-color: #111;
  }
`;

const menuItem = css`
  height: fit-content;
  font-family: text-500;
  font-size: 18px;
  display: flex;
  justify-content: center;
  color: #828282;
  margin-right: 16px;
  &.MuiTab-root {
    min-width: 55px;
    padding: 0;
  }
  &.MuiTouchRipple-root {
    width: 100%;
  }
  &.Mui-selected {
    color: #111;
  }
`;

const section = css`
  margin-top: 22px;
  width: 100%;
  height: fit-content;
`;

const moyeoRunItem = css`
  width: 100%;
  height: 196px;
  margin-bottom: 28px;
`;

const singleRunTitle = css`
  font-family: text-500;
  font-size: 22px;
  color: #333333;
  margin-top: 34px;
`;

const runListWraper = css`
  margin-top: 12px;
  width: 100%;
  height: 196px;
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const runList = css`
  display: flex;
  overflow-x: auto;
`;

const runItem = css`
  margin-right: 10px;
`;
