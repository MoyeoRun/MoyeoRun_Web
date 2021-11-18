/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import {
  CurrentRankStatus,
  DividedMapView,
  IndividualMapView,
  LineUp,
  RunStatus,
  Timer,
  UserRank,
  Widgets,
} from '../../components/MultiRunComponents';

// {type MultiRunProps = {
// 	user: User,
//  point:point
// 	room: Room,
//  runStatus:RunStatus,
// 	myRunData: RunData,
// 	othersRunData: OthersRunData;
// }

const InitValue = {
  none: {
    remainTime: 10000,
    rank: 1,
    image: 'https://source.unsplash.com/random/90x90',
  },
  point: {
    latitude: 37.659187827620975,
    longitude: 127.0514252126567,
    currentAltitude: 30,
    currentTime: 1234567,
    currentDistance: 3.23,
    currentPace: 612,
  },
  runStatus: {
    pace: 1000,
    distance: 1000,
    time: 1000,
  },
  user: {
    id: 1,
    name: '황인서',
    nickName: 'sjsjsj1246',
    email: 'test@gmail.com',
    token: null,
    weight: 50,
    height: 190,
    image: 'https://source.unsplash.com/random/90x90',
  },
  room: {
    id: 1,
    roomImage: '',
    title: '바람 부는 날 5Km 함께 뛰어요',
    statue: 'open',
    description: 'ㅎㅇ',
    startDate: '2021-11-14T12:31:04.672Z',
    targetDistance: 3,
    targetTime: 30,
    roomImage: '',
    limitMember: 4,
    // userAmount: 3,
    // roomId: 1,
    // userId: 2,
    // runId: 1,
    // isOwner: true,
    // isReady: false,
    multiRoomMember: [
      {
        userId: 1,
        isOwer: true,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 1,
          name: '황인서',
          nickName: 'sjsjs…',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
      },
      {
        userId: 2,
        isOwer: false,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 2,
          name: '김건훈',
          nickName: 'sjsjs…',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
      },
      {
        userId: 3,
        isOwer: false,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 3,
          name: '조인혁',
          nickName: 'ㅁㄴㄹㅁㄴㅇㄹ',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
      },
    ],
  },
  othersRunData: [
    {
      userId: 1,
      time: 1234,
      distance: 1.232,
      pace: 3.12,
      runData: [
        {
          latitude: 37.659187827620975,
          longitude: 127.0514252126567,
          currentAltitude: 30,
          currentTime: 1234567,
          currentDistance: 3.23,
          momentPace: 6.12,
        },
      ],
    },

    {
      userId: 2,
      time: 1234,
      distance: 1.5552,
      pace: 3.12,
      runData: [
        {
          latitude: 37.6812312312323,
          longitude: 127.0514242126567,
          currentAltitude: 28,
          currentTime: 1234657,
          currentDistance: 3.12,
          momentPace: 6.01,
        },
      ],
    },
    {
      userId: 3,
      time: 2334,
      distance: 2.232,
      pace: 5.12,
      runData: [
        {
          latitude: 37.692342342343434,
          longitude: 127.0514252126567,
          currentAltitude: 30,
          currentTime: 1234567,
          currentDistance: 3.23,
          momentPace: 6.12,
        },
      ],
    },
  ],
  runData: [
    {
      latitude: 37.659232320975,
      longitude: 127.0514252126567,
      currentAltitude: 30,
      currentTime: 1234567,
      currentDistance: 3.23,
      currentPace: 612,
    },
  ],
};

const MultiRun = () => {
  const [props, setProps] = useState(InitValue);
  const [timerProps, setTimerProps] = useState();
  const [userRankProps, setUserRankProps] = useState();
  const [mapViewProps, setMapViewProps] = useState();
  const [runStatusProps, setRunStatusProps] = useState();
  const [lineUpProps, setLineUpProps] = useState();
  const [displayUserId, setDisplayUserId] = useState(props.user.id);

  const individualMapViewRef = useRef();
  const dividedMapViewRef = useRef();
  const refs = { individualMapView: individualMapViewRef, dividedMapView: dividedMapViewRef };

  const { pathname } = useLocation();

  const colorData = ['#1162FF', '#FC6BFF', '#00F2B8', '#FFDD64'];

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'MultiRun') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    if (pathname === '/test/MultiRun') setProps(tempProps);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);
    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  useEffect(() => {
    setProps(InitValue);
  }, []);

  useEffect(() => {
    if (props) {
      console.log('useEffect');

      //multiRun에서 사용하는 데이터는 여기서 다 설정해준다

      const userColor = props.room.multiRoomMember.map((member, index) => ({
        userId: member.userId,
        color: colorData[index] || '#E5E5E5',
      }));

      // console.log(props.room.multiRoomMember);
      const userImage = props.room.multiRoomMember.map((member) => ({
        userId: member.userId,
        image: member.multiRoomUser.image || 'https://source.unsplash.com/random/90x90',
      }));
      console.log(userImage);
      const userRankState = props.othersRunData
        .sort((a, b) => b.distance - a.distance)
        .map((member, index) => {
          console.log(member);
          return {
            ...member,
            rank: index + 1,
            isMe: props.user.id === member.userId,
            image: userImage.find((user) => user.userId === member.userId).image,
            displayUserId: displayUserId,
            color: userColor.find((user) => user.userId === member.userId).color,
          };
        });
      console.log(userRankState);
      const otherMapData = props.othersRunData.map((member) => ({
        userId: member.userId,
        runData: member.runData,
        center: {
          lat: member.runData[member.runData.length - 1].latitude,
          lng: member.runData[member.runData.length - 1].longitude,
        },
        rank: userRankState.find((user) => user.userId === member.userId),
      }));

      const otherDistance = new Object();
      props.othersRunData.forEach((member) => (otherDistance[member.userId] = member.distance));

      const markerData = props.room.multiRoomMember.map((member) => ({
        ...member,
        distance: otherDistance[member.userId],
        color: userColor.find((user) => user.userId === member.userId).color,
      }));

      setTimerProps({ remainTime: props.none.remainTime });
      setUserRankProps({ rank: userRankState });
      setMapViewProps({
        displayUserId: displayUserId,
        userPoints: [...otherMapData],
      });
      setRunStatusProps({ runStatus: props.runStatus });
      setLineUpProps({ markerData: markerData });
    }
  }, [props, displayUserId]);

  const onHandelViewState = (type, userId = displayUserId) => {
    if (type === 'individualMapView') {
      refs.individualMapView.current.style.left = '0px';
      refs.dividedMapView.current.style.left = `${window.innerWidth}px`;
    } else if (type === 'dividedMapView') {
      refs.individualMapView.current.style.left = `-${window.innerWidth}px`;
      refs.dividedMapView.current.style.left = `0px`;
    } else {
      console.log(오류오류);
    }
    console.log(userId);
    setDisplayUserId(userId);
  };

  console.log(timerProps, userRankProps, displayUserId, mapViewProps, runStatusProps, lineUpProps);
  if (
    !(timerProps && userRankProps && displayUserId && mapViewProps && runStatusProps && lineUpProps)
  ) {
    return <Box>로딩중</Box>;
  }

  if (
    timerProps &&
    userRankProps &&
    displayUserId &&
    mapViewProps &&
    runStatusProps &&
    lineUpProps
  ) {
    return (
      <Box css={multiRunWrapper}>
        <Box css={indiVidualWrapper} ref={individualMapViewRef}>
          <Timer timerProps={timerProps} />
          <Widgets onHandelViewState={onHandelViewState} userId={props.user.id} />
          <UserRank userRankProps={userRankProps} />
          <IndividualMapView mapViewProps={mapViewProps} />
          <RunStatus runStatusProps={runStatusProps} />
          <CurrentRankStatus>
            <LineUp lineUpProps={lineUpProps} />
          </CurrentRankStatus>
        </Box>

        <Box css={dividedWrapper} ref={dividedMapViewRef}>
          <DividedMapView mapViewProps={mapViewProps} onHandelViewState={onHandelViewState} />
          <Box css={dividedlineUp}>
            <LineUp lineUpProps={lineUpProps} />
          </Box>
        </Box>
      </Box>
    );
  } else return <Box>오류오류</Box>;
};

export default MultiRun;

const multiRunWrapper = css``;

const indiVidualWrapper = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
  z-index: 3;
`;
const dividedWrapper = css`
  position: fixed;
  top: 0px;
  left: ${window.innerWidth}px;
  width: 100%;
  height: 100%;
  background-color: white;
  transition: all 0.5s ease;
  z-index: 3;
`;

const dividedlineUp = css`
  position: fixed;
  bottom: 0px;
  box-sizing: border-box;
  display: flex;
  background-color: white;
  padding: 10px;
  width: 100%;
`;
