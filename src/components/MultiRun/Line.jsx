/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box } from '@mui/material';
import { colorData } from '.';
import { LineUpMarkerIcon } from '../../assets/svgs';

const LineMarker = ({ color, image, distance }) => {
  console.log(color);
  return (
    <Box css={markerWrap(distance)}>
      <Avatar src={image} css={markerImage} />
      <LineUpMarkerIcon fill={color} css={svgIcon} />
    </Box>
  );
};

const Line = ({ userRank }) => {
  const min = Math.floor(userRank[userRank.length - 1].runStatus.distance);
  const max = Math.ceil(userRank[0].runStatus.distance);

  const getMarkerDistance = (distance) => {
    const markerPositionRatio = ((distance - min) / (max - min)) * 100;
    return 100 - markerPositionRatio;
  };

  return (
    <Box css={lineUpWrapper}>
      <Box css={line} />
      {userRank.map((data, rank) => (
        <LineMarker
          key={rank}
          color={colorData[rank]}
          image={data.user.image}
          distance={getMarkerDistance(data.runStatus.distance)}
        />
      ))}
      <Box>
        {userRank.map((data, rank) => {
          const displayDistance = Math.floor(data.runStatus.distance * 10) / 10;
          return (
            <Box key={rank} css={xAxisValue(getMarkerDistance(data.runStatus.distance))}>
              {displayDistance}
            </Box>
          );
        })}

        <Box css={xAxisBase(true)}>{max}</Box>
        <Box css={xAxisBase(false)}>{min}</Box>
        <Box css={xAxisUnit}>km</Box>
      </Box>
    </Box>
  );
};

export default Line;

const lineUpWrapper = css`
  position: relative;
  top: 0;
  width: calc(100% - 34px);
  height: calc(100% - 34px);
  margin: 10px;
  padding: 7px;
  background: rgba(17, 98, 255, 0.05);
  border-radius: 4px;
`;

const line = css`
  position: absolute;
  top: 55px;
  width: calc(100% - 14px);
  height: 1.5px;
  box-sizing: border-box;
  background-color: rgba(17, 98, 255, 1);
`;

const markerWrap = (distance) => css`
  position: absolute;
  top: 50px;
  width: 30px;
  height: 40px;
  left: ${distance}%;
  transform: translate(-50%, -100%);
  display: flex;
  justify-content: center;
  z-index: 2;
  transition: all 0.1s ease;
`;

const markerImage = css`
  position: absolute;
  z-index: 2;
  margin-top: 4px;
  width: 21px;
  height: 21px;
`;
const svgIcon = css`
  position: absolute;
`;

const xAxisValue = (position) => css`
  position: absolute;
  top: 58px;
  left: calc(${position}%);
  transform: translate(-50%, 4px);
  display: flex;
  justify-content: space-between;
  font-family: number-500;
  font-size: 14px;
  font-weight: 400;
  color: #1162ff;
`;

const xAxisBase = (isLeft) => css`
  position: absolute;
  top: 58px;
  left: calc(${isLeft ? '10px' : '100% - 10px'});
  transform: translate(-50%, 4px);
  display: flex;
  justify-content: space-between;
  font-family: number-500;
  font-weight: bold;
  font-size: 16px;
  color: #1162ff;
`;

const xAxisUnit = css`
  position: absolute;
  left: calc(100% - 10px);
  top: 8px;
  transform: translate(-60%);
  font-family: number-500;
  font-size: 16px;
  color: #1162ff;
`;
