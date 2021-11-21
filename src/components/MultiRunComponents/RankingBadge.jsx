/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { ReactComponent as MedalIcon_MoyeoRun } from '../../assets/svgs/MedalIcon_MoyeoRun.svg';
import { ReactComponent as MedalIconSmallBlue_MoyeoRun } from '../../assets/svgs/MedalIconSmallBlue_MoyeoRun.svg';
import { ReactComponent as MedalIconSmallWhite_MoyeoRun } from '../../assets/svgs/MedalIconSmallWhite_MoyeoRun.svg';

const IndividualRankingBadge = ({ rank }) => (
  <Box css={indrankingBadge}>
    <Box css={badgeContainer}>
      {rank === 1 && <MedalIcon_MoyeoRun css={indIconContainer} />}
      {/* {rank === 2 && <MedalIcon_MoyeoRun css={indIconContainer} />} */}
      <Box css={textContainer}>{rank}위</Box>
    </Box>
  </Box>
);

const DevidedMapRankingBadge = ({ rank }) => (
  <Box css={divrankingBadge(rank)}>
    <Box css={badgeContainer}>
      {rank === 1 && <MedalIconSmallWhite_MoyeoRun css={indIconContainer} />}
      {rank === 2 && <MedalIconSmallBlue_MoyeoRun css={indIconContainer} />}
      <Box css={textContainer}> {rank}위</Box>
    </Box>
  </Box>
);

const RankingBadge = ({ rank, divMap }) => {
  return (
    <>
      {divMap ? (
        <DevidedMapRankingBadge rank={rank} divMap={divMap} />
      ) : (
        <IndividualRankingBadge rank={rank} />
      )}
    </>
  );
};
export default RankingBadge;

const indrankingBadge = css`
  height: 33px;
  width: 64px;
  border-radius: 3px;
  box-sizing: border-box;
  color: #ffffff;
  background-color: #1162ff;
  font-family: text-500;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.015em;
  text-align: center;
`;

const divrankingBadge = (rank) => css`
  height: 33px;
  width: 48px;
  border-radius: 3px;
  box-sizing: border-box;
  color: ${rank > 1 ? '#1162ff' : '#ffffff'};
  background-color: ${rank > 1 ? '#ffffff' : '#1162ff'};
  font-family: text-500;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.015em;
  text-align: left;

  line-height: 20px;
`;

const badgeContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 4px;
  box-sizing: border-box;
`;
const indIconContainer = css`
  margin: auto 4px auto 0px;
`;
const textContainer = css`
  margin: auto 0px auto 0px;
`;
