/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, ButtonBase } from '@mui/material';
import { memo, useState } from 'react';
import { colorData, Map } from './';
import { getDistanceString, getPaceString, secondToTimeString } from '../../lib/util/strFormat';
import Text from '../Text';
import {
  MoveToSelfMapIcon,
  MoveToDividedMapIcon,
  ClockIcon_blue,
  MedalIcon,
  ToggleIcon,
} from '../../assets/svgs';

const OneMap = ({
  time,
  rank,
  room,
  lineOpen,
  setLineOpen,
  titleOpen,
  setTitleOpen,
  handleMoveSelf,
  handleMoveAllMap,
  userRunData,
}) => {
  const { user, runStatus, runData } = userRunData[rank];
  const lastPoint = runData[runData.length - 1];
  const center = {
    lat: lastPoint ? lastPoint.latitude : 37.6812312312323,
    lng: lastPoint ? lastPoint.longitude : 127.0514242126567,
  };
  const color = colorData[rank];

  return (
    <Box css={oneMapWrapper}>
      {/* 지도 */}
      <Map center={center} color={color} runData={runData} defaultZoom={17} />

      {/* 위젯 */}
      <Box css={widgetsWrap}>
        <ButtonBase css={buttonIcon} onClick={handleMoveSelf}>
          <MoveToSelfMapIcon />
        </ButtonBase>
        <ButtonBase css={buttonIcon} onClick={handleMoveAllMap}>
          <MoveToDividedMapIcon />
        </ButtonBase>
      </Box>

      {/* 타이머 */}
      <ButtonBase
        css={timer}
        onClick={(e) => {
          e.stopPropagation();
          setTitleOpen(!titleOpen);
        }}
      >
        <ClockIcon_blue />
        <Box sx={{ marginLeft: '8px', marginBottom: '3px' }}>
          {secondToTimeString((room.targetTime - time) / 1000)}
        </Box>
      </ButtonBase>

      {/* 랭크 */}
      <Box css={userRank}>
        <Avatar src={user.image} className="avatar" />
        <Text className="nickName">{user.nickName}</Text>
        <Box className="rankBadge">
          {rank === 0 && <MedalIcon />}
          <Text className="rankText">{rank + 1}위</Text>
        </Box>
      </Box>

      {/* 런 상태 */}
      <Box css={RunStatusWrapper(lineOpen)}>
        <Box css={topDataBox}>
          <Box css={topData}>{getDistanceString(runStatus.distance)}</Box>
          <Box css={topDataTitle}>거리</Box>
        </Box>
        <Box css={topDataBox}>
          <Box css={topData}>{getPaceString(runStatus.pace)}</Box>
          <Box css={topDataTitle}>평균 페이스</Box>
        </Box>
        <Box css={topDataBox}>
          <Box css={topData}>{secondToTimeString(time / 1000)}</Box>
          <Box css={topDataTitle}>시간</Box>
        </Box>
      </Box>

      {/* 실시간 등수확인 */}
      <Box css={currentRankingWrapper(lineOpen)}>
        <ButtonBase
          className="head"
          onClick={() => {
            setLineOpen(!lineOpen);
          }}
        >
          <Box>실시간</Box>
          <ToggleIcon className="toggleIcon" />
        </ButtonBase>
      </Box>
    </Box>
  );
};

export default memo(OneMap);

const oneMapWrapper = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  transition: all 0.5s ease;
`;

const widgetsWrap = css`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 114px;
  right: 22px;
  z-index: 3;
`;
const buttonIcon = css`
  width: 55px;
  height: 55px;
  padding: 15px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-top: 8px;
`;

const timer = css`
  position: fixed;
  width: 124px;
  height: 32px;
  left: 50%;
  top: 90px;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px -4px #777777;
  border-radius: 21px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: text-500;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.045em;
  color: #1162ff;
`;

const userRank = css`
  position: fixed;
  left: 20px;
  top: 115px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  & .avatar {
    width: 55px;
    height: 55px;
    box-shadow: 0px 0px 10px -4px #777777;
  }

  & .nickName {
    font-family: text-500;
    font-size: 15px;
    margin: 5px 0;
  }

  & .rankBadge {
    height: 33px;
    width: 64px;
    background-color: #1162ff;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    & .rankText {
      margin-bottom: 4px;
      font-family: text-500;
      font-size: 20px;
      color: #ffffff;
    }
  }
`;

const RunStatusWrapper = (open) => css`
  position: fixed;
  bottom: ${open ? 'calc(102px + 72px)' : '72px'};
  transition: all 0.3s ease;
  width: calc(100% - 28px);
  height: 72px;
  left: 14px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 6px -4px #777777;
  background-color: white;
`;

//
const topDataBox = css`
  flex: 1;
  height: 47px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & + & {
    border-left: 0.5px solid #548eff;
  }
`;

const topData = css`
  font-family: number-500;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 33px;
  letter-spacing: -0.03em;
  text-align: left;
  color: #1162ff;
`;

const topDataTitle = css`
  font-family: text-500;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: -0.05em;
  text-align: left;
  color: #1162ff;
`;

const currentRankingWrapper = (open) => css`
  position: fixed;
  bottom: ${open ? '102px' : '0'};
  width: 100%;
  transition: all 0.3s ease;
  z-index: 1000;

  & .head {
    width: 100%;
    height: 48px;
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    font-family: text-500;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.05em;
    text-align: left;
    background-color: white;
  }

  & .toggleIcon {
    transform: rotate(${open ? 180 : 0}deg);
    transition: all 0.4s ease;
  }
`;
