/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import RoomInfo from '../components/RoomComponents/RoomInfo';
import RoomStateButton from '../components/RoomComponents/RoomStateButton';
import RoomCard from '../components/RoomComponents/RoomCard';
import Host from '../components/RoomComponents/Host';
import ParticipationGraph from '../components/RoomComponents/ParticipationGraph';
import MemberList from '../components/RoomComponents/MemberList';
const room = {
  id: 1,
  title: '바람 부는 날 5Km 함께 뛰어요',
  isOpen: true,
  description: 'ㅎㅇ',
  limitMember: 4,
  userAmount: 3,
  multiRoomMember: [
    { id: 1, name: '황인서', image: 'https://source.unsplash.com/random/50x50' },
    { id: 2, name: '김건훈', image: 'https://source.unsplash.com/random/90x90' },
    { id: 3, name: '조인혁', image: 'https://source.unsplash.com/random/100x100' },
  ],
  startDate: '2021-11-14T12:31:04.672Z',
  targetDistance: 3,
  targetTime: 30,
  roomImage: '',
};

const image = 'https://source.unsplash.com/random/100x100';
const Room = ({}) => {
  const [props, setProps] = useState(null);
  const [roomState, setRoomState] = useState({ isMyRoom: true, isAttend: false });

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'MultiRoom') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  return (
    <Box css={roomWrapper}>
      <Box css={cardWrapper}>
        <RoomCard room={room} goBackProp />
      </Box>
      <Box css={contentWrapper}>
        <Box css={informationTypo}>
          <Box>정보</Box>
          <RoomInfo room={room} />
          <Box css={host}>
            <Box>호스트</Box>
            <Host image={image} host={'나'} message={room.title} />
          </Box>
        </Box>
        <Box css={splitLine} />
        <Box>
          <Box css={recruitmentTypo}>참가자 모집중입니다</Box>
          <ParticipationGraph limitMember={room.limitMember} userAmount={room.userAmount} />
          <Box css={restPeopletypo}>{room.limitMember - room.userAmount}명 더 참여하면 방 마감</Box>
        </Box>
        <Box>
          <MemberList
            member={room.multiRoomMember}
            limitMember={room.limitMember}
            userAmount={room.userAmount}
          ></MemberList>
        </Box>
        <RoomStateButton roomState={roomState}>참여하기</RoomStateButton>
      </Box>
    </Box>
  );
};
const roomWrapper = css`
  width: 100%;
  height: 100%;
  padding-bottom: 80px;
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
  font-family: Apple SD Gothic Neo;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: -0.045em;
  text-align: left;
  color: #63676f;
`;

const host = css`
  font-family: Apple SD Gothic Neo;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: -0.045em;
  text-align: left;
  color: #63676f;
`;
const recruitmentTypo = css`
  font-family: Apple SD Gothic Neo;
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
  font-family: Apple SD Gothic Neo;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.005em;
  text-align: left;
  color: #1162ff;
  margin-top: 8px;
`;

const member = css``;

export default MultiRoom;
