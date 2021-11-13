/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { NaverMap, Polyline, Marker } from 'react-naver-maps';
import Text from '../components/Text';
import { getDistanceString, getPaceString, recordTimeString } from '../lib/util/strFormat';
import recordDetailData from '../testData/recordDetailServerData.json';

const SingleRunMap = () => {
  const [props, setProps] = useState(null);
  const [runStatus, setRunStatus] = useState({ isRunning: false, pace: 8.42, time: 12341 });
  const onLongPress = () => {
    setRunStatus({ ...runStatus, isRunning: !runStatus.isRunning });
  };
  const lonePressEvent = useLongPress(onLongPress, () => {}, { delay: 500 });

  const listener = (data) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'singleRunMap') {
      setProps(propsData.value);
    }
  };

  const on = () => {
    const data = JSON.stringify({});
    window.ReactNativeWebView.onMessage(data);
  };

  useEffect(() => {
    console.log(recordDetailData);
    setProps(recordDetailData);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
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
      <Box css={bottomWrapper}>
        <Box css={recordStatusItem}>
          <Text className="value">{getDistanceString(props.runStatus.distance)}</Text>
          <Text className="key">거리</Text>
        </Box>
        <Box css={recordStatusItem}>
          <Text className="value">{recordTimeString(props.runStatus.time)}</Text>
          <Text className="key">시간</Text>
        </Box>
        <Box css={recordStatusItem}>
          <Text className="value">{getPaceString(props.runStatus.pace)}</Text>
          <Text className="key">페이스</Text>
        </Box>
        <Box css={{ flex: 1 }}></Box>
        <IconButton {...lonePressEvent} css={operationButton}>
          {runStatus.isRunning ? <PauseIcon /> : <StartIcon />}
        </IconButton>
        <Box css={{ flex: 1 }}></Box>
      </Box>
    </Box>
  );
};
const singleRunMapWrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const mapStyle = css`
  flex: 1;
`;

const bottomWrapper = css`
  height: 309px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 0 24px;
`;

const recordStatusItem = css`
  flex: 1;
  height: 47px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & + & {
    border-left: 1px solid #d1d1d6;
  }
  .value {
    font-family: number-500;
    font-size: 24px;
  }
  .key {
    margin-top: 10px;
    color: #828282;
    font-family: text-500;
    font-size: 16px;
  }
`;

export default SingleRunMap;
