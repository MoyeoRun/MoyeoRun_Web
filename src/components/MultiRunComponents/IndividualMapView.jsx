/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { NaverMap, Polyline, Marker } from 'react-naver-maps';

const IndividualMapView = ({ mapViewProps }) => {
  console.log(mapViewProps);
  const { userPoints, disPlayUserId } = mapViewProps;
  const displayRunData = userPoints.find((user) => user.userId === disPlayUserId).runData;
  console.log(displayRunData);
  const currentPoint = displayRunData[length - 1];
  const center = currentPoint
    ? { lat: currentPoint.latitude, lng: currentPoint.longitude }
    : {
        lat: 37.51977586326575,
        lng: 127.06283169005788,
      };

  // const [props, setProps] = useState(null);
  // const [center, setCenter] = useState({
  // lat: 37.51977586326575,
  // lng: 127.06283169005788,
  // });
  // const [displayRunData, setDisplayRunData] = useState();

  // useEffect(() => {
  //   if (mapViewProps) {
  //     if (displayRunData.length !== 0) {
  //       const currentPoint = displayRunData[length - 1];
  //       setCenter({ lat: currentPoint.latitude, lng: currentPoint.longitude });
  //     }
  //   }
  // }, [mapViewProps]);

  if (!displayRunData) return null;
  if (displayRunData)
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
          {displayRunData.map((point) => {
            console.log(point);
            return (
              <Polyline
                path={[
                  {
                    lat: point.latitude,
                    lng: point.longitude,
                  },
                ]}
                strokeColor={'#1162FF'}
                strokeStyle={'solid'}
                strokeLineCap={'round'}
                strokeLineJoin={'round'}
                line
                strokeOpacity={0.8}
                strokeWeight={7}
              />
            );
          })}

          {/* <Polyline
            // key={i}
            path={[
              {
                lat: 37.51977586326575,
                lng: 127.06283169005788,
              },
            ]}
            strokeColor={'#1162FF'}
            strokeStyle={'solid'}
            strokeLineCap={'round'}
            strokeLineJoin={'round'}
            line
            strokeOpacity={0.8}
            strokeWeight={7}
          /> */}
        </NaverMap>
      </Box>
    );
};

export default IndividualMapView;

const singleRunMapWrapper = css`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const mapStyle = css`
  width: 100%;
  height: 100%;
  &:focus-visible {
    outline: none;
  }
`;
