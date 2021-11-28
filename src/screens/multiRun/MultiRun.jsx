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
  ExitWindow,
  NetworkError,
} from '../../components/MultiRunComponents';
import multiRunProps from '../../testData/multiRunProps';

// type MultiRunProps = {
//   time: number;
//   user: User;
//   room: Room;
//   userRunData: UserRunData;
// };

const MultiRun = () => {
  const [props, setProps] = useState();
  const [displayUserId, setDisplayUserId] = useState();
  const [userRankProps, setUserRankProps] = useState();
  const [mapViewProps, setMapViewProps] = useState();
  const [lineUpProps, setLineUpProps] = useState();
  const [error, setError] = useState();

  const individualMapViewRef = useRef();
  const dividedMapViewRef = useRef();
  const refs = { individualMapView: individualMapViewRef, dividedMapView: dividedMapViewRef };

  const { pathname } = useLocation();

  const colorData = ['#1162FF', '#FC6BFF', '#00F2B8', '#FFDD64'];

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'multiRun') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    if (pathname === '/test/multiRun') setProps(multiRunProps);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);
    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  useEffect(() => {
    if (props) {
      if (!displayUserId) setDisplayUserId(props.user.id);
      console.log(props);
      const userColor = props.room.multiRoomMember.map((member, index) => ({
        userId: member.userId,
        color: colorData[index] || '#E5E5E5',
      }));

      const userImage = props.room.multiRoomMember.map((member) => ({
        userId: member.userId,
        image: member.multiRoomUser.image || 'https://source.unsplash.com/random/90x90',
      }));

      const userRankState = props.userRunData
        .sort((a, b) => b.distance - a.distance)
        .map((member, index) => ({
          ...member,
          rank: index + 1,
          isMe: props.user.id === member.user.id,
          image: userImage.find((user) => user.userId === member.user.id).image,
          color: userColor.find((user) => user.userId === member.user.id).color,
          displayUserId: displayUserId || props.user.id,
        }));

      const userMapData = props.userRunData.map((member) => ({
        userId: member.user.id,
        runData: member.runData,
        center: {
          lat:
            member.runData.length > 0
              ? member.runData[member.runData.length - 1].latitude
              : 37.51977586326575,
          lng:
            member.runData.length > 0
              ? member.runData[member.runData.length - 1].longitude
              : 127.06283169005788,
        },
        rank: userRankState.find((user) => user.user.id === member.user.id),
      }));

      const otherDistance = new Object();
      props.userRunData.forEach(
        (member) => (otherDistance[member.user.id] = member.runStatus.distance),
      );

      const markerData = props.room.multiRoomMember.map((member) => ({
        ...member,
        distance: otherDistance[member.userId],
        color: userColor.find((user) => user.userId === member.userId).color,
      }));

      setUserRankProps({ rank: userRankState });
      setMapViewProps({
        displayUserId,
        userPoints: userMapData,
      });
      setLineUpProps({ markerData: markerData });
      console.log(displayUserId);
    }
  }, [props, displayUserId]);

  const onHandelViewState = (type, userId = props.user.id) => {
    if (type === 'individualMapView') {
      refs.individualMapView.current.style.left = '0px';
      refs.dividedMapView.current.style.left = `${window.innerWidth}px`;
    } else if (type === 'dividedMapView') {
      refs.individualMapView.current.style.left = `-${window.innerWidth}px`;
      refs.dividedMapView.current.style.left = `0px`;
    }
    setDisplayUserId(userId);
  };

  if (!props || !displayUserId || !userRankProps || !mapViewProps || !lineUpProps) return null;
  return (
    <Box css={multiRunWrapper}>
      <Box css={indiVidualWrapper} ref={individualMapViewRef}>
        <ExitWindow remainTime={new Date(props.room.targetTime).getSeconds() - props.time}>
          <IndividualMapView mapViewProps={mapViewProps} userId={props.user.id} />
          <Widgets onHandelViewState={onHandelViewState} userId={props.user.id} />
          <Timer remainTime={new Date(props.room.targetTime).getSeconds() - props.time} fixed />
          <UserRank userRankProps={userRankProps} />
        </ExitWindow>

        <RunStatus
          runStatus={props.userRunData.find((data) => data.user.id === displayUserId).runStatus}
        />

        <CurrentRankStatus>
          <LineUp lineUpProps={lineUpProps} />
        </CurrentRankStatus>
      </Box>

      <Box css={dividedWrapper} ref={dividedMapViewRef}>
        <ExitWindow remainTime={new Date(props.room.targetTime).getSeconds() - props.time}>
          <DividedMapView mapViewProps={mapViewProps} onHandelViewState={onHandelViewState} />
        </ExitWindow>

        <Box css={dividedlineUp}>
          <LineUp lineUpProps={lineUpProps} />
        </Box>
      </Box>
      <NetworkError error={error} />
    </Box>
  );
};

export default MultiRun;

const multiRunWrapper = css`
  position: relative;
`;

const indiVidualWrapper = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
  z-index: 1;
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
