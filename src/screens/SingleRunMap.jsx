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
import { NaverMap } from 'react-naver-maps';

const SingleRunMap = () => {
  const [runStatus, setRunStatus] = useState({ isRunning: false, pace: 8.42, time: 12341 });
  const [props, setProps] = useState(null);

  const onIsRunningChange = useLongPress(
    () => {
      setRunStatus({ ...runStatus, isRunning: !runStatus.isRunning });
    },
    () => {},
    { delay: 500 },
  );
  const onFinishe = useLongPress(
    () => {
      alert('러닝 끝');
    },
    () => {},
    { delay: 500 },
  );

  const listener = (data) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'singleRunMap') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    setProps(recordDetailData);
  }, []);

  useEffect(() => {
    console.log(recordDetailData);
    setProps(recordDetailData);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);
  }, []);

  if (!props) return null;

  return (
    <Box css={singleRunMapWrapper}>
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'}
        css={mapStyle}
        mapTypes={
          new window.naver.maps.MapTypeRegistry({
            normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
          })
        }
        defaultZoom={15}
        defaultCenter={{
          lat: 37.659187827620975,
          lng: 127.0514252126567,
        }}
      ></NaverMap>
      <Box css={bottomSection}>
        <Box css={recordStatusWrapper}>
          <Box css={recordStatusItem}>
            <Text className="value">{getDistanceString(props.distance)}</Text>
            <Text className="key">거리</Text>
          </Box>
          <Box css={recordStatusItem}>
            <Text className="value">{recordTimeString(props.time)}</Text>
            <Text className="key">시간</Text>
          </Box>
          <Box css={recordStatusItem}>
            <Text className="value">{getPaceString(props.pace)}</Text>
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const mapStyle = css`
  flex: 1;
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
    transition: all 0.5s ease;
    transform: scale(1.15, 1.15);
  }
  &:not(:active) {
    background-color: #1162ff;
    transition: all 0.2s ease;
    transform: scale(1, 1);
  }
  & + & {
    margin-left: 40px;
  }
`;
