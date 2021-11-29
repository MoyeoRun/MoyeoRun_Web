/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { NaverMap, Polyline, Marker } from 'react-naver-maps';
import { useLocation } from 'react-router';
import tempProps from '../../testData/singleRumMapData';

const SingleRunOnlyMap = () => {
  const [props, setProps] = useState(null);
  const [center, setCenter] = useState({
    lat: 37.51977586326575,
    lng: 127.06283169005788,
  });
  const { pathname } = useLocation();

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'singleRunOnlyMap') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    if (pathname === '/test/singleRunOnlyMap') setProps(tempProps);
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
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'}
        css={mapStyle}
        center={center}
        mapTypes={
          new window.naver.maps.MapTypeRegistry({
            normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
          })
        }
        defaultZoom={17}
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
  );
};

export default SingleRunOnlyMap;

const singleRunMapWrapper = css`
  width: 100%;
  height: 100%;
`;

const mapStyle = css`
  width: 100%;
  height: 100%;
  &:focus-visible {
    outline: none;
  }
`;
