/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, IconButton } from '@mui/material';
import Text from '../components/Text';
import recordDetailData from '../testData/recordDetailData.json';
import { ReactComponent as PauseIcon } from '../assets/svgs/PauseIcon.svg';
import { ReactComponent as StartIcon } from '../assets/svgs/StartIcon.svg';
import { ReactComponent as FinishIcon } from '../assets/svgs/FinishIcon.svg';
import { useEffect, useState } from 'react';
import useLongPress from '../lib/util/useLongPress';
import { getDistanceString, getPaceString, recordTimeString } from '../lib/util/strFormat';

const SingleRunMap = (props) => {
  const [runStatus, setRunStatus] = useState({ isRunning: false, pace: 8.42, time: 12341 });
  const [data, setData] = useState(null);

  const onIsRunningChange = useLongPress(
    () => {
      setRunStatus({ ...runStatus, isRunning: !runStatus.isRunning });
    },
    () => {},
    { delay: 800 },
  );
  const onFinishe = useLongPress(
    () => {
      alert('러닝 끝');
    },
    () => {},
    { delay: 800 },
  );

  useEffect(() => {
    setData(recordDetailData);
  }, []);

  useEffect(() => {
    if (data) {
      var container = document.getElementById('map');
      var options = {
        center: new window.kakao.maps.LatLng(37.659187827620975, 127.0514252126567),
        level: 5,
      };
      var map = new window.kakao.maps.Map(container, options);
      new window.kakao.maps.Polyline({
        map: map,
        path: [
          data.runData.map((point) => {
            return new window.kakao.maps.LatLng(point.latitude, point.longitude);
          }),
        ],
        strokeWeight: 7,
        strokeColor: '#1162FF',
        strokeOpacity: 0.8,
      }).setMap(map);
      new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(data.runData[0].latitude, data.runData[0].longitude),
      }).setMap(map);
      new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(
          data.runData[data.runData.length - 1].latitude,
          data.runData[data.runData.length - 1].longitude,
        ),
      }).setMap(map);
    }
  }, [data]);

  if (!data) return null;

  return (
    <Box css={singleRunMapWrapper}>
      <div id="map" style={{ width: '100%', flex: 1 }}></div>
      <Box css={bottomSection}>
        <Box css={recordStatusWrapper}>
          <Box css={recordStatusItem}>
            <Text className="value">{getDistanceString(data.distance)}</Text>
            <Text className="key">거리</Text>
          </Box>
          <Box css={recordStatusItem}>
            <Text className="value">{recordTimeString(data.time)}</Text>
            <Text className="key">시간</Text>
          </Box>
          <Box css={recordStatusItem}>
            <Text className="value">{getPaceString(data.pace)}</Text>
            <Text className="key">평균 페이스</Text>
          </Box>
        </Box>
        <Box css={buttonWrapper}>
          {runStatus.isRunning ? (
            <IconButton {...onIsRunningChange} css={operationButton}>
              <PauseIcon />
            </IconButton>
          ) : (
            <>
              <IconButton {...onIsRunningChange} css={operationButton}>
                <StartIcon />
              </IconButton>
              <IconButton {...onFinishe} css={operationButton}>
                <FinishIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SingleRunMap;

const singleRunMapWrapper = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const bottomSection = css`
  height: 310px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const recordStatusWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`;

const recordStatusItem = css`
  margin-top: 25px;
  flex: 1;
  height: 47px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .value {
    font-family: number-500;
    font-size: 30px;
    color: #111111;
  }
  .key {
    margin-top: 7px;
    color: #555555cc;
    font-family: text-500;
    font-size: 18px;
  }
  & + & {
    border-left: 1px solid #d1d1d6;
  }
`;

const buttonWrapper = css`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const operationButton = css`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background-color: #1162ff;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #1162ff;
  }
  &:active {
    background-color: #1162ff;
    transition: all 0.75s ease;
    transform: scale(1.15, 1.15);
  }
  &:not(:active) {
    background-color: #1162ff;
    transition: all 0.43s ease;
    transform: scale(1, 1);
  }
  & + & {
    margin-left: 40px;
  }
`;
