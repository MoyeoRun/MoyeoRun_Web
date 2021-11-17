/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {
  DivideMapView,
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
    title: '바람 부는 날 5Km 함께 뛰어요',
    isOpen: true,
    description: 'ㅎㅇ',
    limitMember: 4,
    userAmount: 3,
    multiRoomMember: [
      { id: 1, name: '황인서', image: 'https://source.unsplash.com/random/90x90' },
      { id: 2, name: '김건훈', image: 'https://source.unsplash.com/random/90x90' },
      { id: 3, name: '조인혁', image: 'https://source.unsplash.com/random/90x90' },
    ],
    startDate: '2021-11-14T12:31:04.672Z',
    targetDistance: 3,
    targetTime: 30,
    roomImage: '',
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
          latitude: 37.659181827620975,
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
          latitude: 37.659187827620975,
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
      latitude: 37.659187827620975,
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
  // const [widget, setWidget] = useState();
  const [userRankProps, setUserRankProps] = useState();
  const [mapViewProps, setMapViewProps] = useState();
  const [runStatusProps, setRunStatusProps] = useState();
  const [lineUpProps, setLineUpProps] = useState();
  const [disPlayUserId, setDisPlayUserId] = useState(1);
  const [viewState, setViewState] = useState({ selfMapView: true, dividedMapview: false });

  const { pathname } = useLocation();

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
    console.log(props);
    setProps(InitValue);
  }, []);

  useEffect(() => {
    if (props) {
      console.log('useEffect');

      const userImage = props.room.multiRoomMember.map((member) => ({
        userId: member.id,
        image: member.image,
      }));

      const userRankState = props.othersRunData
        .sort((a, b) => a.distance - b.distance)
        .map((member, index) => ({
          ...member,
          rank: index + 1,
          isMe: props.user.id === member.userId,
          image: userImage.find((user) => user.userId === member.userId).image,
          displayUserId: disPlayUserId,
        }));

      const otherPoints = props.othersRunData.map((member) => ({
        userId: member.userId,
        runData: member.runData,
      }));

      const otherDistance = new Object();
      props.othersRunData.forEach((member) => (otherDistance[member.userId] = member.distance));

      // console.log(otherDistance);
      const markerData = props.room.multiRoomMember.map((member) => ({
        ...member,
        distance: otherDistance[member.id],
      }));
      // console.log(markerData);

      // setDisPlayUserId(props.user.id);
      setTimerProps({ remainTime: props.none.remainTime });
      setUserRankProps({ rank: userRankState });
      setMapViewProps({
        disPlayUserId: props.user.id,
        userPoints: [...otherPoints],
      });
      setRunStatusProps({ runStatus: props.runStatus });
      setLineUpProps({ markerData: markerData });
    }
  }, [props]);

  const onHandelViewState = (type) => {
    const initState = { selfMapView: false, dividedMapview: false };
    setViewState({ ...initState, [type]: true });
  };
  const onChangeDisplayUser = (userId) => {
    setDisPlayUserId(userId);
  };
  if (
    !(timerProps && userRankProps && disPlayUserId && mapViewProps && runStatusProps && lineUpProps)
  ) {
    return <Box>로딩중</Box>;
  }

  if (
    timerProps &&
    userRankProps &&
    disPlayUserId &&
    mapViewProps &&
    runStatusProps &&
    lineUpProps
  ) {
    console.log('lender 시작');
    return (
      <Box css={moyeoRunWrapper}>
        <Timer timerProps={timerProps} />
        <Widgets onHandelViewState={onHandelViewState} onChangeDisPlayUser={onChangeDisplayUser} />
        <UserRank userRankProps={userRankProps} />
        <IndividualMapView mapViewProps={mapViewProps} />
        <RunStatus runStatusProps={runStatusProps} />
        <LineUp lineUpProps={lineUpProps} />
      </Box>
    );
  }
  // if (viewState.dividedMapview) {
  //   return (
  //     <Box css={moyeoRunWrapper}>
  //       <DivideMapView />
  //       <LineUp />
  //     </Box>
  //   );
  // }
};

export default MultiRun;

const moyeoRunWrapper = css`
  width: 100%;
  height: 100%;
`;
