/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, ButtonBase } from '@mui/material';
import {
  getDistanceString,
  getModifiedDateString,
  getPaceString,
  secondToTimeString,
} from '../../lib/util/strFormat';
import { NaverMap, Polyline, Marker } from 'react-naver-maps';

const DetailRecord = ({ value, keyword, ...props }) => {
  return (
    <Box {...props}>
      <Box css={detailRecordWrap}>
        <Box css={summaryValue}>{value}</Box>
        <Box css={summaryKeyword}>{keyword}</Box>
      </Box>
    </Box>
  );
};

const SingleRecordCard = ({ runRecord }) => {
  const { id, type, title, createdAt, runPace, runTime, runDistance, runData } = runRecord;
  const placeholder = { free: '자유', distance: '목표거리', time: '목표시간' };

  return (
    <ButtonBase
      css={singleRecordListWrapper}
      onClick={() => {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'goSingleDetail', value: id }),
        );
      }}
    >
      {runData[0].length !== 0 ? (
        <Box
          css={{
            width: '90px',
            height: '90px',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <NaverMap
            scrollWheel={false}
            draggable={false}
            id={`single_map_of ${id}`}
            css={css`
              width: 90px;
              height: 130px;
              &:focus-visible {
                outline: none;
              }
            `}
            mapTypes={
              new window.naver.maps.MapTypeRegistry({
                normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
              })
            }
            defaultZoom={18}
            defaultCenter={{
              lat: runData[runData.length - 1][runData[runData.length - 1].length - 1].latitude,
              lng: runData[runData.length - 1][runData[runData.length - 1].length - 1].longitude,
            }}
          >
            {runData.map((points, section) => {
              let lastPoint = null;
              if (section > 0) lastPoint = runData[section - 1][runData[section - 1].length - 1];
              return (
                <>
                  {lastPoint && (
                    <Polyline
                      key={section}
                      path={[
                        { lat: lastPoint.latitude, lng: lastPoint.longitude },
                        { lat: points[0].latitude, lng: points[0].longitude },
                      ]}
                      strokeColor={'#767676'}
                      strokeStyle={'shortdot'}
                      strokeLineCap={'round'}
                      strokeLineJoin={'round'}
                      strokeOpacity={0.8}
                      strokeWeight={5}
                    />
                  )}
                  <Polyline
                    key={section}
                    path={points.map((point) => ({
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
                </>
              );
            })}

            <Marker position={{ lat: runData[0][0].latitude, lng: runData[0][0].longitude }} />
            <Marker
              position={{
                lat: runData[runData.length - 1][runData[runData.length - 1].length - 1].latitude,
                lng: runData[runData.length - 1][runData[runData.length - 1].length - 1].longitude,
              }}
            />
          </NaverMap>
        </Box>
      ) : (
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '4px',
            background: '#e8e8e8',
          }}
        ></div>
      )}

      <Box css={recordWrap}>
        <Box css={cardDate}>{getModifiedDateString(createdAt)}</Box>
        <Box css={cardTitle}>
          {title || `${new Date(createdAt).getDate()}일 ${placeholder[type]} 달리기`}
        </Box>
        <Box css={cardRecordWrap}>
          <DetailRecord value={getDistanceString(runDistance)} keyword="거리" />
          <DetailRecord value={getPaceString(runPace)} keyword="평균 페이스" />
          <DetailRecord value={secondToTimeString(runTime / 1000)} keyword="시간" />
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default SingleRecordCard;

const singleRecordListWrapper = css`
  width: 100%;
  height: 115px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 12px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;
`;

const recordWrap = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 11px;
  margin-right: auto;
`;

const cardDate = css`
  font-family: number-500;
  font-size: 13px;
  font-weight: 400;
  color: #aaaaaa;
`;

const cardTitle = css`
  font-family: text-500;
  font-size: 16px;
  font-weight: 500;
  margin-top: 4px;
`;

const cardRecordWrap = css`
  display: flex;
  margin-top: 12px;
`;

const detailRecordWrap = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-right: 11px;
`;

const summaryValue = css`
  font-family: number-500;
  font-size: 16px;
  font-weight: 400;
`;
const summaryKeyword = css`
  font-family: text-500;
  font-size: 13px;
  font-weight: 400;
  margin-top: 3px;
  color: #aaaaaa;
`;
