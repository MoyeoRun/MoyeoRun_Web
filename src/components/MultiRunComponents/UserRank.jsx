/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { RankingBadge } from '.';
import AccountImage from '../AccountImage';

const UserRank = ({ userRankProps }) => {
  const { rank } = userRankProps;
<<<<<<< Updated upstream
  const user = rank.find((user) => user.displayUserId === user.userId);

=======
  const user = rank.find((user) => user.displayUserId === user.user.id);
>>>>>>> Stashed changes
  return (
    <>
      <Box css={userWrap}>
        <AccountImage isMe={user.isMe} image={user.image} />
        <Box css={rankingBadgeMargin}>
          <RankingBadge rank={user.rank} />
        </Box>
      </Box>
    </>
  );
};
export default UserRank;

const userWrap = css`
  position: fixed;
  left: 20px;
  top: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
`;

const rankingBadgeMargin = css`
  margin-top: 18px;
`;
