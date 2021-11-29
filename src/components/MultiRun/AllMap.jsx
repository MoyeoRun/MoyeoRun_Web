/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Card } from '@mui/material';
import { colorData, Map } from './';
import { ClockIcon_blue, MedalIconSmallBlue, MedalIconSmallWhite } from '../../assets/svgs';
import { secondToTimeString } from '../../lib/util/strFormat';
import Text from '../Text';

const AllMap = ({ mapMode, room, time, userRank, handleMoveUserMap }) => {
  return (
    <Box css={allMapWrapper(mapMode)}>
      {/* 타이틀 */}
      <Box css={title}>
        <Box className="top">
          <Box>{room.title}</Box>
          <Box className="timer">
            <ClockIcon_blue />
            <Text className="text">{secondToTimeString((room.targetTime - time) / 1000)}</Text>
          </Box>
        </Box>
      </Box>

      <Box css={mapCardWrapper}>
        {userRank.map((data, rank) => {
          const { user, runStatus, runData } = data;
          const lastPoint = runData[runData.length - 1];
          const center = {
            lat: lastPoint ? lastPoint.latitude : 37.6812312312323,
            lng: lastPoint ? lastPoint.longitude : 127.0514242126567,
          };
          const color = colorData[rank];
          return (
            <Card
              key={rank}
              css={mapCard(rank === 0)}
              onClick={() => {
                handleMoveUserMap(user.id);
              }}
            >
              <Box className="userInfo">
                <Avatar src={user.image} className="avatar" />
                <Text className="nickName">{user.nickName}</Text>
                <Box className="rankBadge">
                  {rank === 0 ? <MedalIconSmallWhite /> : <MedalIconSmallBlue />}
                  <Text className="rankText">{rank + 1}위</Text>
                </Box>
              </Box>
              <Box className="map">
                <Map
                  scrollWheel={false}
                  draggable={false}
                  runData={runData}
                  center={center}
                  color={color}
                  defaultZoom={17}
                  id={`map_of_${user.nickName}`}
                />
              </Box>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default AllMap;

const allMapWrapper = (mapMode) => css`
  position: fixed;
  top: 0;
  left: ${mapMode === 'one' ? '100%' : '0'};
  transition: all 0.5s ease;
  width: calc(100% - 40px);
  height: calc(100% - 50px);
  padding: 50px 20px 0 20px;
  background-color: #ffffff;
  overflow: auto;
`;

const title = css`
  width: 100%;
  height: 70px;
  margin-bottom: 10px;
  & .top {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-family: text-500;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dcdddf;
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

const mapCardWrapper = css`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

const mapCard = (isFirst) => css`
  position: relative;
  width: 95%;
  height: 156px;
  display: flex;
  margin-bottom: 30px;
  z-index: 999;

  & .userInfo {
    height: calc(100% - 24px);
    position: absolute;
    left: 0;
    top: 0;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;

    & .rankBadge {
      height: 27px;
      width: 48px;
      margin-top: auto;
      background-color: ${isFirst ? '#1162ff' : 'white'};
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
      & .rankText {
        margin-left: 4px;
        font-family: text-500;
        font-size: 16px;
        color: ${isFirst ? 'white' : '#1162ff'};
      }
    }

    & .avatar {
      width: 55px;
      height: 55px;
      box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    }

    & .nickName {
      font-family: text-500;
      font-size: 15px;
      margin: 5px 0;
    }
  }

  & .map {
    flex: 1;
  }
`;
