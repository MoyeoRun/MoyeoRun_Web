/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { NaverMap, Polyline, Marker } from 'react-naver-maps';

const IndividualMapView = ({ mapViewProps, userId, children }) => {
  const { userPoints, displayUserId = userId } = mapViewProps;
  const displayData = userPoints.find((user) => user.userId === displayUserId);
  const center = displayData.center;
  const color = displayData.rank.color;

  const ref = useRef();

  if (!displayData) return null;
  if (displayData)
    return (
      <Box css={individualMapWrapper}>
        <NaverMap
          id={'individualMap'}
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
          {displayData.runData.map((point, i) => {
            return (
              <Polyline
                key={i}
                path={[
                  {
                    lat: point.latitude,
                    lng: point.longitude,
                  },
                ]}
                strokeColor={`${color}`}
                strokeStyle={'solid'}
                strokeLineCap={'round'}
                strokeLineJoin={'round'}
                line
                strokeOpacity={0.8}
                strokeWeight={7}
              />
            );
          })}
        </NaverMap>
      </Box>
    );
};

export default IndividualMapView;

const individualMapWrapper = css`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #ffffff;
`;

const mapStyle = css`
  width: 100%;
  height: 100%;
  &:focus-visible {
    outline: none;
  }
  z-index: 0;
`;
