/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, IconButton } from '@mui/material';
import Text from '../components/Text';
import { ReactComponent as PauseIcon } from '../assets/svgs/PauseIcon.svg';
import { ReactComponent as StartIcon } from '../assets/svgs/StartIcon.svg';
import { ReactComponent as FinishIcon } from '../assets/svgs/FinishIcon.svg';
import { useEffect, useState } from 'react';
import useLongPress from '../lib/util/useLongPress';
import { getDistanceString, getPaceString, recordTimeString } from '../lib/util/strFormat';
import { NaverMap, Polyline, Marker } from 'react-naver-maps';
import { useLocation } from 'react-router';
import tempProps from '../testData/singleRumMapData';

const SingleRunMap = () => {
  const [props, setProps] = useState(null);
  const [center, setCenter] = useState({
    lat: 37.51977586326575,
    lng: 127.06283169005788,
  });
  const { pathname } = useLocation();

  const onIsRunningChange = useLongPress(
    () => {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: props.isRunning ? 'stop' : 'start' }),
      );
    },
    () => {},
    { delay: 300 },
  );
  const onFinishe = useLongPress(
    () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish' }));
    },
    () => {},
    { delay: 300 },
  );

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'singleRunMap') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    if (pathname === '/test/singleRunMap') setProps(tempProps);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);
    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  useEffect(() => {
    if (props) {
      if (props.runData[props.section].length !== 0) {
        const currentPoint = props.runData[props.section][props.runData[props.section].length - 1];
        setCenter({ lat: currentPoint.latitude, lng: currentPoint.longitude });
      }
    }
  }, [props]);

  if (!props) return null;

  return (
    <Box css={singleRunMapWrapper}>
      <Box css={{ flex: 1 }}>
        <NaverMap
          mapDivId={'maps-getting-started-uncontrolled'}
          css={mapStyle}
          center={center}
          mapTypes={
            new window.naver.maps.MapTypeRegistry({
              normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
            })
          }
          defaultZoom={15}
        >
          <Marker
            position={center}
            icon={{
              content: `
          <div style="
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(17, 98, 255, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            transform: translate(-50px, -50px);
            ">
              <div style="
                width: 30px;
                height: 30px; background: #1162FF;
                border: 3px solid #FFFFFF;
                box-sizing: border-box;
                border-radius: 50%;
                box-shadow: 0px 0px 2px #1162FF;">
              </div>
          </div>
        `,
            }}
          />
          {props.runData.map((runSection, i) => (
            <Polyline
              key={i}
              path={runSection.map((point) => ({
                lat: point.latitude,
                lng: point.longitude,
              }))}
              strokeColor={'#1162FF'}
              strokeStyle={'solid'}
              strokeLineCap={'round'}
              strokeLineJoin={'round'}
              line
              strokeOpacity={0.8}
              strokeWeight={7}
            />
          ))}
        </NaverMap>
      </Box>
      <Box css={bottomSection}>
        <Box css={recordStatusWrapper}>
          <Box css={recordStatusItem}>
            <Text className="value">{getDistanceString(props.runStatus.distance)}</Text>
            <Text className="key">거리</Text>
          </Box>
          <Box css={recordStatusItem}>
            <Text className="value">{recordTimeString(props.runStatus.time / 1000)}</Text>
            <Text className="key">시간</Text>
          </Box>
          <Box css={recordStatusItem}>
            <Text className="value">{getPaceString(props.runStatus.pace)}</Text>
            <Text className="key">평균 페이스</Text>
          </Box>
        </Box>
        <Box css={buttonWrapper}>
          {props.isRunning ? (
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
  width: 100%;
  height: 100%;
  &:focus-visible {
    outline: none;
  }
`;

const bottomSection = css`
  height: 310px;
  padding-bottom: 30px;
  flex-shrink: 0;
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
  min-height: 150px;
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
    transition: all 0.3s ease;
    transform: scale(1.15, 1.15);
  }
  &:not(:active) {
    background-color: #1162ff;
    transition: all 0.1s ease;
    transform: scale(1, 1);
  }
  & + & {
    margin-left: 40px;
  }
`;
