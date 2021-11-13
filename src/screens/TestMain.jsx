/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Menu, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Text from '../components/Text';
import BodyInfo from './BodyInfo';
import MyPage from './MyPage';
import Login from './Login';
import RecordAnalysis from './RecordAnalysis';
import RecordDetail from './RecordDetail';
import SingleRunStatus from './SingleRunStatus';
import Home from './Home';
import Record from './Record';
import Running from './Running';
import Mission from './Mission';
import Friend from './Friend';
import ReadySingleRun from './ReadySingleRun';
import SingleRunMap from './SingleRunMap';
import MakeRoom from './MakeRoom';
import Room from './Room';

const device = [
  { name: 'iPhone6, 7, 8 (9:16)', width: 375, height: 667 },
  { name: 'iPhoneX (9:9.15)', width: 375, height: 812 },
  { name: 'iPad Pro (3:4)', width: 1024, height: 1366 },
  { name: 'Galaxy S20 (9:20)', width: 480, height: 1066 },
];

const index = [
  { url: '/test/login', title: '로그인', component: <Login /> },
  { url: '/test/bodyInfo', title: '신체정보 입력 스크린', component: <BodyInfo /> },
  { url: '/test/myPage', title: '마이페이지 스크린', component: <MyPage /> },
  { url: '/test/home', title: '홈 탭 스크린', component: <Home /> },
  { url: '/test/record', title: '기록 탭 스크린', component: <Record /> },
  { url: '/test/recordAnalysis', title: '기록 상세 분석 스크린', component: <RecordAnalysis /> },
  { url: '/test/recordDetail', title: '기록 상세 스크린', component: <RecordDetail /> },
  { url: '/test/running', title: '러닝 탭 스크린', component: <Running /> },
  { url: '/test/mission', title: '미션 탭 스크린', component: <Mission /> },
  { url: '/test/friend', title: '친구 탭 스크린', component: <Friend /> },
  { url: '/test/singleRunStatus', title: '개인런 상태 스크린', component: <SingleRunStatus /> },
  { url: '/test/readySingleRun', title: '개인런 준비 스크린', component: <ReadySingleRun /> },
  { url: '/test/singleRunMap', title: '개인런 맵 스크린', component: <SingleRunMap /> },
  { url: '/test/makeRoom', title: '모여런 만들기 스크린', component: <MakeRoom /> },
  { url: '/test/room', title: '모여런 방 스크린', component: <Room /> },
];

const TestMain = () => {
  const [width, setWidth] = useState(375);
  const [height, setHeight] = useState(812);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [screenAnchorEl, setScreenAnchorEl] = useState(null);
  const screenMenuOpen = Boolean(screenAnchorEl);
  const handleScreenMenuClick = (event) => {
    setScreenAnchorEl(event.currentTarget);
  };
  const handleScreenMenuClose = () => {
    setScreenAnchorEl(null);
  };

  const [deviceAnchorEl, setDeviceAnchorEl] = useState(null);
  const deviceMenuOpen = Boolean(deviceAnchorEl);
  const handleDeviceMenuClick = (event) => {
    setDeviceAnchorEl(event.currentTarget);
  };
  const handleDeviceMenuClose = () => {
    setDeviceAnchorEl(null);
  };

  return (
    <Box css={mainWrapper}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            onClick={handleScreenMenuClick}
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={screenAnchorEl} open={screenMenuOpen} onClose={handleScreenMenuClose}>
            {index.map((item) => (
              <MenuItem
                key={item.url}
                onClick={() => {
                  navigate(item.url);
                  handleScreenMenuClose();
                }}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pathname === '/test'
              ? '로그인 스크린'
              : index.filter((item) => item.url === pathname)[0].title}
          </Typography>
          <Button
            variant="contained"
            disableElevation
            onClick={handleDeviceMenuClick}
            endIcon={<KeyboardArrowDownIcon />}
            css={css`
              background: white;
              color: black;
              margin-right: 15px;
              &:hover {
                background-color: white;
              }
            `}
          >
            디바이스 선택
          </Button>
          <Menu anchorEl={deviceAnchorEl} open={deviceMenuOpen} onClose={handleDeviceMenuClose}>
            {device.map((item) => (
              <MenuItem
                key={item.name}
                onClick={() => {
                  setWidth(item.width);
                  setHeight(item.height);
                  handleDeviceMenuClose();
                }}
              >
                {item.name}
              </MenuItem>
            ))}
          </Menu>

          <Text>가로 길이</Text>
          <TextField
            css={screenSizeField}
            size="small"
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
            }}
          />

          <Text>세로 길이</Text>
          <TextField
            css={screenSizeField}
            size="small"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
            }}
          />
        </Toolbar>
      </AppBar>
      <Box css={screenWrapper(width, height)}>
        <Box css={screen(width, height)}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default TestMain;

const mainWrapper = css`
  height: 100%;
`;

const screenWrapper = (width, height) => css`
  height: 100%;
  min-width: ${width + 100}px;
  min-height: ${height + 100}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c7ce;
`;
const screen = (width, height) => css`
  width: ${width}px;
  height: ${height}px;
  background-color: white;
  overflow: auto;
`;

const screenSizeField = css`
  width: 100px;
  background-color: white;
  margin-left: 5px;
  margin-right: 15px;
  border-radius: 5px;
`;
