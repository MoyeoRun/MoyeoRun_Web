/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Skeleton } from '@mui/material';
import { ReactComponent as PeopleIcon_Room } from '../../assets/svgs/PeopleIcon_Room.svg';
import { ReactComponent as RightArrowIcon_Room } from '../../assets/svgs/RightArrowIcon_Room.svg';
import AccountImage from '../AccountImage';

const MemberList = ({ member, limitMember, userAmount }) => {
  return (
    <Box css={memberWrap}>
      <Box>
        {member.map((item, index) => (
          <Box css={memberImage(index)}>
            {item ? (
              <AccountImage image={item.multiRoomUser.image} />
            ) : (
              <Skeleton variant="circular" css={{ width: '48px', height: '48px' }} />
            )}
          </Box>
        ))}
      </Box>
      <Box css={participants}>
        <PeopleIcon_Room />
        <Box sx={{ margin: '0px 4px' }}>{userAmount + '/' + limitMember}</Box>
        <RightArrowIcon_Room />
      </Box>
    </Box>
  );
};
export default MemberList;

const memberWrap = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
`;
const memberImage = (index) => css`
  position: absolute;
  left: ${index * 30}px;
  transform: translate(0, -50%);
`;
const participants = css`
  display: flex;
  justify-content: center;
  align-items: center center;
  font-family: text-500;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: #828282;
`;
