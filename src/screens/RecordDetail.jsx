/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import RecordDetailTable from '../components/RecordDetailTable';
import Text from '../components/Text';
import CustomButton from '../components/CustomButton';
import { getDistanceString, getPaceString, recordTimeString } from '../lib/util/strFormat';
import { ReactComponent as EditIcon } from '../assets/svgs/EditIcon.svg';
import { useEffect } from 'react';

const recordData = {
  date: new Date().toString(),
  title: '바람부는 날 5Km 함께 뛰어요',
  distance: 5,
  pace: 5.36,
  time: 1700,
};

const runData = [
  {
    pace: 5.0,
    altitude: -2,
  },
  {
    pace: 5.3,
    altitude: -3,
  },
  {
    pace: 5.22,
    altitude: -4,
  },
  {
    pace: 5.1,
    altitude: -1,
  },
];

const RecordDetail = () => {
  useEffect(() => {
    console.log(window.kakao);
    var container = document.getElementById('map');
    var options = {
      center: new window.kakao.maps.LatLng(37.66149803713027, 127.05093170702871),
      level: 5,
    };
    var map = new window.kakao.maps.Map(container, options);
    var polyline = new window.kakao.maps.Polyline({
      map: map,
      path: [
        new window.kakao.maps.LatLng(37.659187827620975, 127.0514252126567),
        new window.kakao.maps.LatLng(37.65703042721502, 127.05266975756653),
        new window.kakao.maps.LatLng(37.653191118834805, 127.0534422337102),
        new window.kakao.maps.LatLng(37.65312316468623, 127.0548155246323),
        new window.kakao.maps.LatLng(37.65599417327399, 127.05449365957243),
        new window.kakao.maps.LatLng(37.66012211532027, 127.052326434836),
        new window.kakao.maps.LatLng(37.66441968764726, 127.05174707772825),
        new window.kakao.maps.LatLng(37.66779131629595, 127.0497408063072),
        new window.kakao.maps.LatLng(37.66776583850865, 127.04826022703183),
        new window.kakao.maps.LatLng(37.666118256361884, 127.04911853385815),
        new window.kakao.maps.LatLng(37.66453008843758, 127.05060984196885),
        new window.kakao.maps.LatLng(37.66149803713027, 127.05093170702871),
        new window.kakao.maps.LatLng(37.659553042638635, 127.05138231811692),
        new window.kakao.maps.LatLng(37.6556629007224, 127.05346371235336),
      ],
      strokeWeight: 7,
      strokeColor: '#1162FF',
      strokeOpacity: 0.8,
    });
    new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(37.659187827620975, 127.0514252126567),
    }).setMap(map);
    new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(37.6556629007224, 127.05346371235336),
    }).setMap(map);
    polyline.setMap(map);
  }, []);

  return (
    <Box css={RecordDetailWrapper}>
      <Text css={recordDate}>{new Date(recordData.date).toLocaleString()}</Text>
      <Box css={recordTitleWrapper}>
        <Text>{recordData.title}</Text>
        <EditIcon />
      </Box>
      <div id="map" style={{ width: '100%', height: '430px' }}></div>
      <Box css={recordStatusWrapper}>
        <Box css={recordStatusItem}>
          <Text className="value">{getDistanceString(recordData.distance)}</Text>
          <Text className="key">거리</Text>
        </Box>
        <Box css={recordStatusItem}>
          <Text className="value">{getPaceString(recordData.pace)}</Text>
          <Text className="key">평균 페이스</Text>
        </Box>
        <Box css={recordStatusItem}>
          <Text className="value">{recordTimeString(recordData.time)}</Text>
          <Text className="key">시간</Text>
        </Box>
      </Box>
      <CustomButton css={recordAnalysisButton}>상세 분석 보기</CustomButton>
      <Box>
        <Text css={{ fontFamily: 'text-500', fontSize: '22px' }}>구간</Text>
        <RecordDetailTable data={runData} />
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
