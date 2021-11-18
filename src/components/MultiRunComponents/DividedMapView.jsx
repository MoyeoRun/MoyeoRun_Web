/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { NaverMap, Polyline, Marker } from 'react-naver-maps';
import { RankingBadge } from '.';
import AccountImage from '../AccountImage';

const Map = ({ userId, runData, center, rank, index, onHandelViewState }) => {
  return (
    <Box css={mapWrapper} onDoubleClick={(e) => onHandelViewState('individualMapView', userId, e)}>
      <Box css={accountImage}>
        <AccountImage isMe={rank.isMe} image={rank.image} />
      </Box>
      <Box css={rankingBadge}>
        <RankingBadge rank={rank.rank} divMap={true} />
      </Box>
      <NaverMap
        id={`map_of_${userId}`}
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
            background: ${rank.color}1A;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: translate(-50px, -50px);
            ">
              <div style="
                width: 20px;
                height: 20px; background: ${rank.color};
                border: 3px solid #FFFFFF;
                box-sizing: border-box;
                border-radius: 50%;
                box-shadow: 0px 0px 2px ${rank.color};">
              </div>
          </div>
        `,
          }}
        />
        {runData.map((point, i) => {
          return (
            <Polyline
              key={i}
              path={[
                {
                  lat: point.latitude,
                  lng: point.longitude,
                },
              ]}
              strokeColor={`${rank.color}`}
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

const DividedMapView = ({ mapViewProps, onHandelViewState }) => {
  const { userPoints, disPlayUserId } = mapViewProps;

  if (!userPoints) {
    console.log('랜더링 노노');
    return null;
  }
  if (userPoints) {
    console.log('랜더링 고고');
    return (
      <Box css={dividedMapViewWrapper}>
        <Box css={mapWrapper}>
          {userPoints.map((user, i) => (
            <Map
              index={i}
              key={i}
              userId={user.userId}
              center={user.center}
              runData={user.runData}
              rank={user.rank}
              onHandelViewState={onHandelViewState}
            />
          ))}
        </Box>
      </Box>
    );
  }
};

export default DividedMapView;

const dividedMapViewWrapper = css`
  position: relative;
  padding: 14px;
  margin-top: 30px;
`;

const mapWrapper = css`
  position: relative;
  background-color: white;
  width: 100%;
  height: 155px;
  z-index: 0;
  margin-top: 12px;
`;

const mapStyle = css`
  position: relative;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 155px;
  &:focus-visible {
    outline: none;
  }
`;
const accountImage = css`
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 2;
`;
const rankingBadge = css`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
`;
