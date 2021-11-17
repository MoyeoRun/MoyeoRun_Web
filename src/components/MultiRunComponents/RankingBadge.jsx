/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { ReactComponent as MedalIcon_MoyeoRun } from '../../assets/svgs/MedalIcon_MoyeoRun.svg';

const RankingBadge = ({ rank, divMap }) => {
  return (
    <Box css={rankingBadge(divMap, rank)}>
      <Box css={badgeContainer}>
        {rank === 1 && (
          <Box css={iconContainer(divMap, rank)}>
            <MedalIcon_MoyeoRun />
          </Box>
        )}
        <Box css={rankText}>{rank}위</Box>
      </Box>
    </Box>
  );
};
export default RankingBadge;

const rankingBadge = (divMap, rank) => css`
  height: 33px;
  width: ${divMap ? 52 : 64}px;
  border-radius: 3px;
  box-sizing: border-box;
  color: ${rank > 1 ? '#1162ff' : '#ffffff'};
  background-color: ${rank > 1 ? '#ffffff' : '#1162ff'};
`;

const badgeContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const iconContainer = (divMap, rank) => css`
  margin-right: ${!divMap && 5}px;
  transform: ${divMap && 'scale(0.8)'};
`;

const rankText = (divMap) => css`
  ${divMap
    ? `
    font-family: Apple SD Gothic Neo;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.015em;
    text-align: left;
    `
    : `
    font-family: Apple SD Gothic Neo;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.015em;
    text-align: left;
    `}
`;
