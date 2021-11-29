/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import RecordDetailTable from '../../components/RecordDetailTable';
import Text from '../../components/Text';
import CustomButton from '../../components/CustomButton';
import { getDistanceString, getPaceString, recordTimeString } from '../../lib/util/strFormat';
import { ReactComponent as EditIcon } from '../../assets/svgs/EditIcon.svg';
import { useEffect, useState } from 'react';
import recordDetailData from '../../testData/recordDetailData.json';
import { NaverMap, Polyline, Marker } from 'react-naver-maps';
import { useLocation } from 'react-router';
import ReactLoading from 'react-loading';

const SingleRecordDetail = () => {
  const [props, setProps] = useState(null);
  const { pathname } = useLocation();
  const placeholder = { free: '자유', distance: '목표거리', time: '목표시간', multi: '모여런' };

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'singleRecordDetail') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    if (pathname === '/test/singleRecordDetail') {
      setProps(recordDetailData);
    }
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  if (!props)
    return (
      <Box
        css={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ReactLoading type="bars" color="#1160ffde" width="50px" height="50px" />
      </Box>
    );

  return (
    <Box css={RecordDetailWrapper}>
      <Text css={recordDate}>{new Date(props.createdAt).toLocaleString()}</Text>
      <Box css={recordTitleWrapper}>
        <Text>
          {props.title ||
            `${new Date(props.createdAt).getDate()}일 ${placeholder[props.type]} 달리기`}
        </Text>
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
          lat: props.runData[props.runData.length - 1][
            props.runData[props.runData.length - 1].length - 1
          ].latitude,
          lng: props.runData[props.runData.length - 1][
            props.runData[props.runData.length - 1].length - 1
          ].longitude,
        }}
      >
        {props.runData.map((points, section) => {
          let lastPoint = null;
          if (section > 0)
            lastPoint = props.runData[section - 1][props.runData[section - 1].length - 1];
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

        <Marker
          position={{ lat: props.runData[0][0].latitude, lng: props.runData[0][0].longitude }}
        />
        <Marker
          position={{
            lat: props.runData[props.runData.length - 1][
              props.runData[props.runData.length - 1].length - 1
            ].latitude,
            lng: props.runData[props.runData.length - 1][
              props.runData[props.runData.length - 1].length - 1
            ].longitude,
          }}
        />
      </NaverMap>

      <Box css={recordStatusWrapper}>
        <Box css={recordStatusItem}>
          <Text className="value">{getDistanceString(props.runDistance)}</Text>
          <Text className="key">거리</Text>
        </Box>
        <Box css={recordStatusItem}>
          <Text className="value">{getPaceString(props.runPace)}</Text>
          <Text className="key">평균 페이스</Text>
        </Box>
        <Box css={recordStatusItem}>
          <Text className="value">{recordTimeString(props.runTime / 1000)}</Text>
          <Text className="key">시간</Text>
        </Box>
      </Box>
      <Box css={buttonWrapper}>
        <CustomButton
          css={recordAnalysisButton}
          onClick={() => {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: 'goAnalysis', value: props.id }),
            );
          }}
        >
          상세 분석 보기
        </CustomButton>
        <CustomButton
          css={recordAnalysisButton}
          onClick={() => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share' }));
          }}
        >
          공유 하기
        </CustomButton>
      </Box>
      <Box>
        <Text css={{ fontFamily: 'text-500', fontSize: '22px' }}>구간</Text>
        <RecordDetailTable data={props.runSummary} />
      </Box>
    </Box>
  );
};

const RecordDetailWrapper = css`
  padding: 0 18px;
  padding-bottom: 100px;
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

const buttonWrapper = css`
  display: flex;
  justify-content: space-between;
`;

const recordAnalysisButton = css`
  width: 48%;
  height: 70px;
  margin: 30px 0;
  border: 1px solid rgba(17, 98, 255, 0.3);
  border-radius: 4px;
  font-family: text-500;
  font-size: 20px;
`;

export default SingleRecordDetail;
