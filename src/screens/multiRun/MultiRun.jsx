/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, ButtonBase } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import testProps from '../../testData/multiRun2Props';
import { OneMap, AllMap, Loading } from '../../components/MultiRun';
import { ClockIcon_blue } from '../../assets/svgs';
import { secondToTimeString } from '../../lib/util/strFormat';
import Text from '../../components/Text';
import Line from '../../components/MultiRun/Line';

const MultiRun = () => {
  const [user, setUser] = useState(null);
  const [time, setTime] = useState(0);
  const [room, setRoom] = useState(null);
  const [displayUserId, setDisplayUserId] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [lineOpen, setLineOpen] = useState(false);
  const [titleOpen, setTitleOpen] = useState(false);
  const [mapMode, setMapMode] = useState('one');
  const { pathname } = useLocation();

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    switch (propsData.type) {
      case 'user':
        setUser(propsData.value);
        setDisplayUserId(propsData.value.id);
        break;
      case 'time':
        setTime(propsData.value);
        break;
      case 'room':
        setRoom(propsData.value);
        break;
      case 'userRunData':
        setUserRank(propsData.value.sort((a, b) => b.runStatus.distance - a.runStatus.distance));
        break;
    }
    if (propsData.type === 'user') {
      setProps(propsData.value);
    }
  };

  const clickListener = () => {
    setTitleOpen(false);
  };

  const handleMoveSelf = () => {
    setDisplayUserId(user.id);
  };

  const handleMoveAllMap = () => {
    setLineOpen(true);
    setMapMode('all');
  };

  const handleMoveUserMap = (userId) => {
    setDisplayUserId(userId);
    setMapMode('one');
  };

  useEffect(() => {
    setUser(testProps.user);
    setDisplayUserId(testProps.user.id);
    setTime(testProps.time);
    setRoom(testProps.room);
    setUserRank(testProps.userRunData.sort((a, b) => b.runStatus.distance - a.runStatus.distance));

    document.addEventListener('message', listener);
    window.addEventListener('message', listener);
    document.addEventListener('click', clickListener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
      document.removeEventListener('click', clickListener);
    };
  }, []);

  if (!user || !time || !room || !userRank || !displayUserId) return <Loading />;

  return (
    <Box css={MultiRun2Wrapper}>
      {/* 한명의 지도 */}
      <OneMap
        time={time}
        room={room}
        lineOpen={lineOpen}
        setLineOpen={setLineOpen}
        titleOpen={titleOpen}
        setTitleOpen={setTitleOpen}
        handleMoveSelf={handleMoveSelf}
        handleMoveAllMap={handleMoveAllMap}
        userRunData={userRank}
        rank={userRank.findIndex((data) => data.user.id === displayUserId)}
      />

      {/* 모든 유저의 지도 */}
      <AllMap
        mapMode={mapMode}
        room={room}
        time={time}
        userRank={userRank}
        handleMoveUserMap={handleMoveUserMap}
      />

      {/* 실시간 순위 */}
      <Box css={line(lineOpen)}>
        <Line userRank={userRank} />
      </Box>

      {/* 타이틀 */}
      <Box css={title(titleOpen)}>
        <Box className="top">
          <Box>{room.title}</Box>
          <ButtonBase
            className="exitButton"
            onClick={() => {
              setOpen(true);
            }}
          >
            나가기
          </ButtonBase>
        </Box>
        <Box className="timer">
          <ClockIcon_blue />
          <Text className="text">{secondToTimeString((room.targetTime - time) / 1000)}</Text>
        </Box>
      </Box>
    </Box>
  );
};

const MultiRun2Wrapper = css`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
`;

const line = (lineOpen) => css`
  position: fixed;
  bottom: ${lineOpen ? 0 : '-102px'};
  width: 100%;
  height: 102px;
  background: white;
  z-index: 999;
  transition: all 0.3s ease;
  border: ${open ? '1px solid #adadad4e' : 0};
`;

const title = (titleOpen) => css`
  position: fixed;
  padding-top: 45px;
  top: ${titleOpen ? 0 : '-130px'};
  width: 100%;
  height: 85px;
  background: white;
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  & .top {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: calc(100% - 40px);
    font-family: text-500;
    font-size: 18px;
    border-bottom: 1px solid #dcdddf;
  }

  & .exitButton {
    padding: 8px;
    font-family: text-500;
    font-size: 18px;
    font-weight: 500;
    color: #1162ff;
  }

  & .timer {
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1162ff;
    & .text {
      margin-left: 7px;
      margin-bottom: 4px;
      font-family: text-500;
      font-size: 20px;
    }
  }
`;

export default MultiRun;
