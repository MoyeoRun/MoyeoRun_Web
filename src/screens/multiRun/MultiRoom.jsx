/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import RoomInfo from '../../components/RoomComponents/RoomInfo';
import RoomCard from '../../components/RoomComponents/RoomCard';
import Host from '../../components/RoomComponents/Host';
import ParticipationGraph from '../../components/RoomComponents/ParticipationGraph';
import MemberList from '../../components/RoomComponents/MemberList';
import { useLocation } from 'react-router';
import multiRoomProps from '../../testData/MultiRoomProps';
import CustomButton from '../../components/CustomButton';
import ReactPullToRefresh from 'react-pull-to-refresh';
import ReactLoading from 'react-loading';

const MultiRoom = () => {
  const [props, setProps] = useState({
    user: null,
    room: null,
    statusBarHeight: 48,
    roomOwner: null,
    error: null,
  });
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'multiRoom') {
      setProps(propsData.value);
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'refresh' }));
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
  };

  useEffect(() => {
    if (pathname === '/test/multiRoom') setProps(multiRoomProps);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  const ActionButton = () => {
    const isAttend =
      props.user &&
      props.room.multiRoomMember.filter((item) => item.multiRoomUser.id === props.user.id)
        .length !== 0;
    const isOwner = props.user && props.user.id === props.roomOwner.id;
    if (props.user.roomId && props.user.roomId !== props.room.id) {
      return <CustomButton css={button(2)}>이미 다른 모여런에 참여 중입니다</CustomButton>;
    }
    if (isOwner) return null;
    if (isAttend)
      return (
        <CustomButton
          css={button(1)}
          onClick={() => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'exitRoom' }));
          }}
        >
          떠나기
        </CustomButton>
      );
    else
      return (
        <CustomButton
          css={button(0)}
          onClick={() => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'joinRoom' }));
          }}
        >
          참여하기
        </CustomButton>
      );
  };

  return (
    <ReactPullToRefresh onRefresh={handleRefresh} css={pullDown}>
      <Box css={multiRoomWrapper}>
        <Box css={cardWrapper}>
          {props.room ? (
            <RoomCard statusBarHeight={props.statusBarHeight} room={props.room} />
          ) : (
            <Skeleton variant="rectangular" css={{ width: '100%', height: '100%' }} />
          )}
        </Box>
        <Box css={contentWrapper}>
          <Box css={informationTypo}>
            <Box>정보</Box>
            {props.room ? (
              <RoomInfo room={props.room} />
            ) : (
              <Skeleton
                variant="rectangular"
                css={{ width: '100%', height: '95px', marginTop: '9px', marginBottom: '24px' }}
              />
            )}

            <Box css={host}>
              <Box>호스트</Box>
              {props.roomOwner ? (
                <Host
                  image={props.roomOwner.image}
                  host={props.roomOwner.nickName}
                  message={props.room.title}
                />
              ) : (
                <Skeleton
                  variant="circular"
                  css={{ width: '48px', height: '48px', marginBottom: '37px', marginTop: '20px' }}
                />
              )}
            </Box>
          </Box>
          <Box css={splitLine} />
          <Box>
            <Box css={recruitmentTypo}>참가자 모집중입니다</Box>
            {props.room ? (
              <>
                <ParticipationGraph
                  limitMember={props.room.limitMember}
                  userAmount={props.room.multiRoomMember.length}
                />
                <Box css={restPeopletypo}>
                  {props.room.limitMember - props.room.multiRoomMember.length}명 더 참여하면 방 마감
                </Box>
              </>
            ) : (
              <>
                <Skeleton variant="rectangular" css={{ width: '100%', height: '8px' }} />
              </>
            )}
          </Box>
          <Box>
            {props.room ? (
              <>
                <MemberList
                  member={props.room.multiRoomMember}
                  limitMember={props.room.limitMember}
                  userAmount={props.room.multiRoomMember.length}
                />
                <ActionButton />
              </>
            ) : (
              <MemberList member={[0, 0, 0]} limitMember={0} userAmount={0} />
            )}
          </Box>
        </Box>
      </Box>
    </ReactPullToRefresh>
  );
};

const pullDown = css`
  flex: 1;
`;

const multiRoomWrapper = css`
  width: 100%;
  height: fit-content;
  padding-bottom: 120px;
  overflow-x: hidden;
`;

const cardWrapper = css`
  width: 100%;
  height: 250px;
`;

const contentWrapper = css`
  padding: 18px;
`;
const splitLine = css`
  border: 1px solid #dcdddf;
  width: 100%;
`;
const informationTypo = css`
  font-family: text-500;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: -0.045em;
  text-align: left;
  color: #63676f;
`;

const host = css`
  font-family: text-500;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: -0.045em;
  text-align: left;
  color: #63676f;
`;
const recruitmentTypo = css`
  font-family: text-500;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.05em;
  text-align: left;
  color: #333333;
  margin-top: 24px;
`;
const restPeopletypo = css`
  font-family: text-500;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.005em;
  text-align: left;
  color: #1162ff;
  margin-top: 8px;
`;

const button = (state) => css`
  font-family: text-500;
  font-size: 21px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: -0.05em;
  text-align: left;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
  height: 88px;
  border-radius: 0px;
  background-color: ${state === 0 ? '#1162ff' : state === 1 ? 'white' : '#E0E0E0'};
  color: ${state === 0 ? 'white' : state === 1 ? '#1162ff' : '#828282'};
  &:hover {
    background-color: ${state === 0 ? '#1162ff' : state === 1 ? 'white' : '#E0E0E0'};
    color: ${state === 0 ? 'white' : state === 1 ? '#1162ff' : '#828282'};
  }
`;

export default MultiRoom;
