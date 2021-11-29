/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';
import { NaverMap, Polyline, Marker } from 'react-naver-maps';

const Map = ({ center, runData, color, id, ...props }) => (
  <NaverMap
    id={id || 'react-naver-map'}
    css={mapStyle}
    center={center}
    mapTypes={
      new window.naver.maps.MapTypeRegistry({
        normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
      })
    }
    defaultZoom={15}
    {...props}
  >
    <Marker
      position={center}
      icon={{
        content: `
        <div style="
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: ${color}1A;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translate(-50px, -50px);
          ">
            <div style="
              width: 30px;
              height: 30px; background: ${color};
              border: 3px solid #FFFFFF;
              box-sizing: border-box;
              border-radius: 50%;
              box-shadow: 0px 0px 2px ${color};">
            </div>
        </div>
      `,
      }}
    />
    <Polyline
      path={runData.map((point) => ({
        lat: point.latitude,
        lng: point.longitude,
      }))}
      strokeColor={color}
      strokeStyle="solid"
      strokeLineCap="round"
      strokeLineJoin="round"
      line
      strokeOpacity={0.8}
      strokeWeight={7}
    />
  </NaverMap>
);

export default memo(Map);

const mapStyle = css`
  width: 100%;
  height: 100%;
  &:focus-visible {
    outline: none;
  }
`;
