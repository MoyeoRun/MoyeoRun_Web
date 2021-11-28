/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { ReactComponent as LineUpMarkerIcon } from '../../assets/svgs/LineUpMarkerIcon.svg';

const colorData = ['#1162FF', '#FC6BFF', '#00F2B8', '#FFDD64'];

const LineUpMarker = ({ fill, image, distance }) => {
  return (
    <Box css={markerWrap(distance)}>
      <Box css={markerImage(image)} />
      <LineUpMarkerIcon fill={fill} css={svgIcon} />
    </Box>
  );
};

const LineUp = ({ lineUpProps }) => {
  const { markerData } = lineUpProps;
  const runDistanceArr = markerData.map((member) => member.distance.toFixed(1));
  runDistanceArr.sort(function (a, b) {
    return a - b;
  });
  const left = Math.ceil(runDistanceArr[runDistanceArr.length - 1]);
  const right = Math.floor(runDistanceArr[0]);

  const getMarkerPositionRatio = (marker) => {
    const markerPositionRatio = ((marker - right) / (left - right)) * 100;
    return 100 - markerPositionRatio;
  };

  return (
    <Box css={lineUpWrapper}>
      <Box css={lineUpContainer}>
        <Box css={line} />
        {markerData.map((member, index) => (
          <LineUpMarker
            key={index}
            fill={member.color}
            image={member.multiRoomUser.image}
            distance={getMarkerPositionRatio(member.distance)}
          />
        ))}
        <Box>
          {runDistanceArr.map((distance, index) => (
            <Box key={index} css={xAxisValue(getMarkerPositionRatio(distance))}>
              {distance}
            </Box>
          ))}

          <Box css={xAxisBase(true)}>{left}</Box>
          <Box css={xAxisBase(false)}>{right}</Box>
          <Box css={xAxisUnit}>km</Box>
        </Box>
      </Box>
    </Box>
  );
};
export default LineUp;

const lineUpWrapper = css`
  position: relative;
  flex: 1;
  height: 82px;
  background: rgba(17, 98, 255, 0.05);
  border-radius: 4px;
  margin-top: 20px;
`;

const lineUpContainer = css`
  position: relative;
  box-sizing: border-box;
  margin: 55px 8px 0px 8px;
`;

const line = css`
  width: 100%;
  height: 0px;
  box-sizing: border-box;
  border: 1.5px solid rgba(17, 98, 255, 1);
  background-color: rgba(17, 98, 255, 1);
`;

const markerWrap = (distance) => css`
  position: absolute;
  width: 30px;
  height: 40px;
  top: -7px;
  left: calc(${distance}%);
  transform: translate(-50%, -100%);
  display: flex;
  justify-content: center;
  z-index: 2;
  transition: all 0.1s ease;
`;

const markerImage = (image) => css`
  position: absolute;
  z-index: 2;
  margin-top: 4px;
  width: 21px;
  height: 21px;
  border-radius: 20px;
  background-image: url(${image});
  background-size: 21px 21px;
`;
const svgIcon = css`
  position: absolute;
`;

const xAxisValue = (position) => css`
  position: absolute;
  left: calc(${position}%);
  transform: translate(-50%, 4px);
  display: flex;
  justify-content: space-between;
  font-family: number-500;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.045em;
  text-align: left;
  color: #1162ff;
`;
const xAxisBase = (location) => css`
  position: absolute;
  left: calc(${location ? 0 : 100}%);
  transform: translate(-50%, 4px);
  display: flex;
  justify-content: space-between;
  font-family: number-500;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.045em;
  text-align: left;
  color: #1162ff;
`;

const xAxisUnit = css`
  position: absolute;
  left: 100%;
  top: -55px;
  transform: translate(-60%);
  font-family: number-500;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.045em;
  text-align: left;
  color: #1162ff;
`;
