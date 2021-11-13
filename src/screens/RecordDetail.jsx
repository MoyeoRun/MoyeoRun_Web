/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import RecordDetailTable from '../components/RecordDetailTable';
import Text from '../components/Text';
import CustomButton from '../components/CustomButton';
import { getDistanceString, getPaceString, recordTimeString } from '../lib/util/strFormat';
import { ReactComponent as EditIcon } from '../assets/svgs/EditIcon.svg';
import { useEffect, useRef, useState } from 'react';
import recordDetailData from '../testData/recordDetailData.json';
import { NaverMap, Polyline, Marker } from 'react-naver-maps';

const RecordDetail = () => {
  const [data, setData] = useState(null);
  const [buffer, setBuffer] = useState(null);

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const { latitude, longitude } = JSON.parse(data);
    setBuffer({ latitude, longitude });
  };

  useEffect(() => {
    setData(recordDetailData);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  useEffect(() => {
    if (buffer) {
      setData({
        ...data,
        runData: data.runData.concat({
          latitude: buffer.latitude,
          longitude: buffer.longitude,
        }),
      });
    }
  }, [buffer]);

  if (!data) return null;

  return (
    <Box css={RecordDetailWrapper}>
      <Text css={recordDate}>{new Date(data.date).toLocaleString()}</Text>
      <Box css={recordTitleWrapper}>
        <Text>{data.title}</Text>
        <EditIcon />
      </Box>
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'}
        css={css`
          width: 100%;
          height: 430px;
          &:focus-visible {
            outline: none;
          }
        `}
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
      >
        {data && (
          <>
            <Polyline
              path={data.runData.map((point) => ({
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
            <Marker position={{ lat: data.runData[0].latitude, lng: data.runData[0].longitude }} />
            <Marker
              position={{
                lat: data.runData[data.runData.length - 1].latitude,
                lng: data.runData[data.runData.length - 1].longitude,
              }}
            />
          </>
        )}
      </NaverMap>

      <Box css={recordStatusWrapper}>
        <Box css={recordStatusItem}>
          <Text className="value">{getDistanceString(data.distance)}</Text>
          <Text className="key">거리</Text>
        </Box>
        <Box css={recordStatusItem}>
          <Text className="value">{getPaceString(data.pace)}</Text>
          <Text className="key">평균 페이스</Text>
        </Box>
        <Box css={recordStatusItem}>
          <Text className="value">{recordTimeString(data.time)}</Text>
          <Text className="key">시간</Text>
        </Box>
      </Box>
      <CustomButton css={recordAnalysisButton}>상세 분석 보기</CustomButton>
      <Box>
        <Text css={{ fontFamily: 'text-500', fontSize: '22px' }}>구간</Text>
        <RecordDetailTable data={data.runSummaryData} />
      </Box>
    </Box>
  );
};

const RecordDetailWrapper = css`
  padding: 0 18px;
`;

const recordDate = css`
  font-family: number-500;
  font-size: 20px;
  color: #a4a4a4;
`;

const recordTitleWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 30px;
  & p {
    word-break: keep-all;
    width: 70%;
    font-family: text-500;
    font-size: 24px;
  }
`;

const recordStatusWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 0 24px;
`;

const recordStatusItem = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const recordAnalysisButton = css`
  width: 100%;
  height: 70px;
  margin: 30px 0;
  border: 1px solid rgba(17, 98, 255, 0.3);
  border-radius: 4px;
  font-family: text-500;
  font-size: 20px;
`;

export default RecordDetail;
