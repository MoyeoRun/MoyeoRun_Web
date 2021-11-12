/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import RecordDetailTable from '../components/RecordDetailTable';
import Text from '../components/Text';
import CustomButton from '../components/CustomButton';
import { getDistanceString, getPaceString, recordTimeString } from '../lib/util/strFormat';
import { ReactComponent as EditIcon } from '../assets/svgs/EditIcon.svg';
import { useEffect, useState } from 'react';
import recordDetailData from '../testData/recordDetailData.json';

let map = null;

const RecordDetail = () => {
  const [data, setData] = useState(null);
  const [buffer, setBuffer] = useState(null);

  useEffect(() => {
    const listener = ({ data }) => {
      const { latitude, longitude } = JSON.parse(data);
      setBuffer({ latitude, longitude });
    };
    setData(recordDetailData);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    var container = document.getElementById('map');
    var options = {
      center: new window.kakao.maps.LatLng(37.659187827620975, 127.0514252126567),
      level: 5,
    };
    map = new window.kakao.maps.Map(container, options);
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

  useEffect(() => {
    if (data && map) {
      new window.kakao.maps.Polyline({
        map: map,
        path: [
          data.runData.map((point) => {
            return new window.kakao.maps.LatLng(point.latitude, point.longitude);
          }),
        ],
        strokeWeight: 7,
        strokeColor: '#1162FF',
        strokeOpacity: 0.8,
      }).setMap(map);
      new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(data.runData[0].latitude, data.runData[0].longitude),
      }).setMap(map);
      new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(
          data.runData[data.runData.length - 1].latitude,
          data.runData[data.runData.length - 1].longitude,
        ),
      }).setMap(map);
    }
  }, [data]);

  if (!data) return null;

  return (
    <Box css={RecordDetailWrapper}>
      <Text css={recordDate}>{new Date(data.date).toLocaleString()}</Text>
      <Box css={recordTitleWrapper}>
        <Text>{data.title}</Text>
        <EditIcon />
      </Box>
      <div id="map" style={{ width: '100%', height: '430px' }}></div>
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
