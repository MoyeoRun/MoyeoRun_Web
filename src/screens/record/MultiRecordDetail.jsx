/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {
  LeftBackArrowIcon,
  MoreIcon,
  ShareIcon,
  DistanceIcon_Room,
  PeopleIcon_Room,
  ClockIcon_Room,
} from '../../assets/svgs';
import { Loading } from '../../components/MultiRun';
import Text from '../../components/Text';
import tempProps from '../../testData/multiRecordProps';
import { NaverMap, Polyline, Marker } from 'react-naver-maps';
import { getDistanceString, getPaceString, secondToTimeString } from '../../lib/util/strFormat';

// type MultiRecordDetailProps = {
//   multiRoom: Room;
//   multiRecord: RunRecord;
//   displayUserId: User['id'];
//   onChangeDisplayUser: (userId: User['id']) => void;
// };

const startTimeString = (startTime) => {
  const date = new Date(startTime);
  let hour = date.getHours();
  let period = hour >= 12 ? '오후' : '오전';
  if (hour > 12) hour -= 12;
  hour = hour.toString().padStart(2, '0');
  let min = date.getMinutes().toString().padStart(2, '0');
  return period + ' ' + hour + ' : ' + min;
};

const targetTimeString = (second) => {
  return `${parseInt(second / 3600) > 0 ? `${parseInt(second / 3600)}시간` : ''} ${
    parseInt((second % 3600) / 60) + '분'
  }`;
};

const MultiRecordDetail = () => {
  const [props, setProps] = useState(null);
  const [displayUser, setDisplayUser] = useState(null);
  const { pathname } = useLocation();
  const placeholder = { free: '자유', distance: '목표거리', time: '목표시간', multi: '모여런' };

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'multiRecordDetail') {
      setProps(propsData.value);
      setDisplayUser(
        propsData.value.multiRoom.multiRoomMember.find(
          (user) => user.userId === propsData.value.displayUserId,
        ),
      );
    }
  };

  useEffect(() => {
    if (pathname === '/test/multiRecordDetail') {
      setProps(tempProps);
      setDisplayUser(
        tempProps.multiRoom.multiRoomMember.find((user) => user.userId === tempProps.displayUserId),
      );
    }
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  if (!props || !displayUser) return <Loading />;
  return (
    <Box css={MultiRecordDetailWrapper}>
      <Box css={title}>
        <IconButton
          onClick={() => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'goBack' }));
          }}
        >
          <LeftBackArrowIcon className="icon" />
        </IconButton>
        <div css={{ flex: 1 }}></div>
        <IconButton
          onClick={() => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share' }));
          }}
        >
          <ShareIcon className="icon" />
        </IconButton>
        <IconButton
          onClick={() => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'more' }));
          }}
        >
          <MoreIcon className="icon" />
        </IconButton>
      </Box>

      <Box css={top}>
        <Text css={recordDate}>{new Date(props.multiRoom.startDate).toLocaleString()}</Text>
        <Box css={recordTitleWrapper}>
          <Text>
            {props.multiRoom.title || `${new Date(props.multiRoom.startDate).getDate()}일 모여런`}
          </Text>
        </Box>

        {/* 룸 정보 */}
        <Box css={roomInfo}>
          <Box className="raw">
            <Box className="item">
              <DistanceIcon_Room className="icon" />
              <Text className="type">목표거리</Text>
              <Text className="value">{props.multiRoom.targetDistance}km</Text>
            </Box>
            <Box className="item">
              <PeopleIcon_Room className="icon" />
              <Text className="type">인원</Text>
              <Text className="value">{props.multiRoom.multiRoomMember.length}명</Text>
            </Box>
          </Box>
          <Box className="raw">
            <Box className="item">
              <ClockIcon_Room className="icon" />
              <Text className="type">시작시간</Text>
              <Text className="value">{startTimeString(props.multiRoom.startDate)}</Text>
            </Box>
            <Box className="item">
              <ClockIcon_Room className="icon" />
              <Text className="type">제한시간</Text>
              <Text className="value">{targetTimeString(props.multiRoom.targetTime / 1000)}</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box css={bottom}>
        {/* 팀원 리스트 */}
        <Box css={teamWrapper}>
          <Text className="title">팀원</Text>
          <Box className="list">
            <Box css={userWrapper}>
              <Avatar
                src={displayUser.multiRoomUser.image}
                className="avatar"
                onClick={() => {
                  window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                      type: 'changeDisplayUser',
                      value: {
                        userId: displayUser.userId,
                        runId: displayUser.runId,
                      },
                    }),
                  );
                }}
              />
              <Text className="nickName">{displayUser.multiRoomUser.nickName}</Text>
            </Box>
            {props.multiRoom.multiRoomMember
              .filter((user) => user.userId !== props.displayUserId)
              .map((user) => (
                <Box css={userWrapper}>
                  <Avatar
                    src={user.multiRoomUser.image}
                    className="avatar"
                    onClick={() => {
                      window.ReactNativeWebView.postMessage(
                        JSON.stringify({
                          type: 'changeDisplayUser',
                          value: { userId: user.userId, runId: user.runId },
                        }),
                      );
                    }}
                  />
                  <Text className="nickName">{user.multiRoomUser.nickName}</Text>
                </Box>
              ))}
          </Box>
        </Box>

        {/* 런 요약 */}
        <Box css={summaryWrapper}>
          <Text className="title">
            {displayUser.multiRoomUser.nickName}
            님의 결과
          </Text>
          <Box className="list">
            <Box className="item">
              <Text className="value">{displayUser.rank}</Text>
              <Text className="type">순위</Text>
            </Box>
            <Box className="item">
              <Text className="value">{getDistanceString(props.multiRecord.runDistance)}</Text>
              <Text className="type">거리</Text>
            </Box>
            <Box className="item">
              <Text className="value">{getPaceString(props.multiRecord.runPace)}</Text>
              <Text className="type">평균 페이스</Text>
            </Box>
            <Box className="item">
              <Text className="value">{secondToTimeString(props.multiRecord.runTime)}</Text>
              <Text className="type">시간</Text>
            </Box>
          </Box>
        </Box>

        {/* 지도 */}
        <NaverMap
          id={`map_of_${props.displayUserId}`}
          css={css`
            width: 100%;
            height: 432px;
            &:focus-visible {
              outline: none;
            }
          `}
          mapTypes={
            new window.naver.maps.MapTypeRegistry({
              normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
            })
          }
          defaultZoom={18}
          defaultCenter={{
            lat: props.multiRecord.runData[0].latitude,
            lng: props.multiRecord.runData[0].longitude,
          }}
        >
          {console.log(props.multiRecord.runData)}
          <Polyline
            path={props.multiRecord.runData.map((point) => ({
              lat: point.latitude,
              lng: point.longitude,
            }))}
            strokeColor={'#1162FF'}
            strokeStyle={'solid'}
            strokeLineCap={'round'}
            strokeLineJoin={'round'}
            line
            strokeOpacity={0.8}
            strokeWeight={7}
          />
          <Marker
            position={{
              lat: props.multiRecord.runData[0].latitude,
              lng: props.multiRecord.runData[0].longitude,
            }}
          />
          <Marker
            position={{
              lat: props.multiRecord.runData[props.multiRecord.runData.length - 1].latitude,
              lng: props.multiRecord.runData[props.multiRecord.runData.length - 1].longitude,
            }}
          />
        </NaverMap>

        {/* 순위 리스트
        <Box css={rankListWrapper}>
          {props.multiRoom.multiRoomMember.map((user) => (
            <Box>{user.rank}</Box>
          ))}
        </Box> */}
      </Box>
    </Box>
  );
};

const MultiRecordDetailWrapper = css`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 50px;
`;

const title = css`
  width: calc(100% - 10px);
  margin-left: 10px;
  height: 55px;
  display: flex;
  align-items: center;
`;

const recordDate = css`
  font-family: number-500;
  font-size: 20px;
  color: #616161;
`;

const recordTitleWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 30px;
  & p {
    word-break: keep-all;
    width: 70%;
    font-family: text-500;
    font-size: 24px;
  }
`;

const top = css`
  width: calc(100% - 40px);
  height: 200px;
  padding: 0 20px;
  border-bottom: 4px solid #dcdddf;
`;

const roomInfo = css`
  width: calc(100% - 24px);
  padding: 0 12px;
  height: 88px;
  background: #f8f8f8;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  & .raw {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex: 1;
    & .item {
      min-width: 120px;
      display: flex;
      align-items: center;
      & .type {
        font-family: text-500;
        font-size: 13px;
        color: #6a6a6a;
        margin-left: 9px;
      }
      & .value {
        font-family: text-500;
        font-size: 14px;
        margin-left: 14px;
      }
    }
  }
  & .raw + .raw {
    border-top: 0.75px solid #dcdddf;
  }
`;

const bottom = css`
  width: calc(100% - 36px);
  height: fit-content;
  padding: 0 18px;
  margin-top: 13px;
`;

const teamWrapper = css`
  width: 100%;
  height: 128px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e9e9e9;
  & .title {
    font-family: text-500;
    font-size: 14px;
    color: #63676f;
  }
  & .list {
    display: flex;
  }
`;

const userWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-right: 15px;
  height: 50px;

  & .avatar {
    border: 2.5px solid transparent;
    margin-bottom: 8px;
  }
  & .nickName {
    font-family: text-500;
    font-size: 12px;
  }

  &:first-child {
    border-right: 1px solid #e9e9e9;
    padding-right: 15px;
    & .avatar {
      border: 2.5px solid #1162ff;
    }
    & .nickName {
      color: #1162ff;
    }
  }
`;

const summaryWrapper = css`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  & .title {
    font-family: text-500;
    font-size: 14px;
    color: #63676f;
  }
  & .list {
    display: flex;
  }
  & .item {
    flex: 1;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & .type {
      font-family: text-500;
      font-size: 16px;
      color: #828282;
    }
    & .value {
      font-family: text-500;
      font-size: 20px;
      color: #333333;
      margin-bottom: 6px;
    }

    &:first-child {
      & .value {
        color: #1162ff;
      }
    }
  }
`;

const rankListWrapper = css`
  margin-top: 28px;
  margin-bottom: 22px;
  border-top: 1px solid #e9e9e9;
  display: flex;
`;

export default MultiRecordDetail;
