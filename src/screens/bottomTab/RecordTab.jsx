/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Skeleton, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import RecordBarGraph from '../../components/RecordComponents/RecordBarGraph';
import DetailRecordCard from '../../components/RecordComponents/DetailRecordCard';
import Filtering from '../../components/RecordComponents/Filtering';
import Summary from '../../components/RecordComponents/Summary';
import tempProps from '../../testData/recordTabTest';
import { useLocation } from 'react-router';

// type RunHistory = {
//   totalDistance: number;
//   totalAveragePace: number;
//   totalTime: number;
//   analysisRunningListBetweenTerm: RunStatistics;
//   runningList: Array<RunRecord>;
// };

const RecordTab = () => {
  const [props, setProps] = useState(null);
  const [loading, setLoading] = useState();
  const [showOneRecord, setShowOneRecord] = useState(); //전체 기록 보여주는건지, 하나의 기록 보여주는건지
  const [menu, setMenu] = useState(0); // 모여런 뷰, 개인런 뷰 구분
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [filteringProps, setFilteringProps] = useState();
  const [summaryProps, setSummaryProps] = useState();
  const [graphProps, setGraphProps] = useState();
  const [detailRecordProps, setDetailRecordProps] = useState();

  const { pathname } = useLocation();

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'recordTab') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    if (pathname === '/test/recordTab') setProps(tempProps);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  useEffect(() => {
    if (props) {
      let filteringData = {};
      let summaryData = {};
      let graphData = [];
      let detailRecordData = [];

      // 한개 기록만 보여주는 경우
      if (showOneRecord) {
        console.log('한개만');
        filteringData = { startDate: selectedDay, showOneRecord: showOneRecord };
        for (let key in props.runHistory.runningList[0]) {
          if (
            key === 'runPace' ||
            key === 'runTime' ||
            key === 'runDistance' ||
            key === 'type' ||
            key === 'id' ||
            key === 'targetTime' ||
            key === 'targetDistance' ||
            key === 'createdAt'
          ) {
            summaryData[key] = props.runHistory.runningList[0][key];
          }
        }
        const headInfo = summaryData.id && {
          type: summaryData.type,
          target: summaryData.targetDistance || summaryData.targetTime || '',
        };
        const typeValue = { free: '자유', time: '목표시간', distance: '목표거리' };
        const tempData = [];
        if (headInfo) {
          tempData.push({ value: typeValue[headInfo.type], keyword: '종류' });
          headInfo.type !== 'free' &&
            headInfo.target !== '' &&
            tempData.push(
              headInfo.type === 'time'
                ? { value: secondToTimeString(headInfo.target), keyword: '목표' }
                : headInfo.type === 'distance' && {
                    value: getDistanceString(headInfo.target),
                    keyword: '목표',
                  },
            );
        }
        summaryData.headData = tempData;
        graphData = props.runHistory.analysisRunningListBetweenTerm.map((day) =>
          new Date(day.date).getDate() === selectedDay.getDate()
            ? { ...day, active: true }
            : { ...day },
        );
        detailRecordData =
          props.runHistory.runningList.find((item) => new Date(item.createdAt) === selectedDay) ||
          [];
      }

      // 모든 기록 보여주는 경우
      else {
        console.log('여러개');
        filteringData = { startDate: selectedDay, showOneRecord: showOneRecord };
        for (let key in props.runHistory) {
          if (
            key === 'totalTime' ||
            key === 'totalDistance' ||
            key === 'totalAveragePace' ||
            key === 'runningList'
          )
            summaryData[key] = props.runHistory[key];
        }
        graphData = props.runHistory.analysisRunningListBetweenTerm;
        detailRecordData = props.runHistory.runningList;
      }

      setFilteringProps(filteringData);
      setSummaryProps(summaryData);
      setGraphProps(graphData);
      setDetailRecordProps(detailRecordData);
    }
  }, [props, selectedDay]);

  const handlePostMessage = (type, value = '') => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'type', value: value }));
    setLoading(true);
  };

  const [a, setA] = useState(false);
  useEffect(() => {
    console.log(showOneRecord);
    if (a) {
      setShowOneRecord(!showOneRecord);
      setA(false);
    }
  }, [a, showOneRecord]);

  const getPickedDayRecords = (day) => {
    console.log('하루 찍은 날짜 기록 보여주기 , 날짜 : ' + day);
    const pickedDate = summaryProps.runningList.find(
      (item) => new Date(item.createdAt).getDate() === day,
    ).createdAt;
    setA(true);
    if (showOneRecord) {
      handlePostMessage('refresh');
    } else {
      setSelectedDay(new Date(pickedDate));
    }
    //이미 있는 상세기록 데이터에서 하나만 남기고 다시 랜더링 해주는 식으로,```````````````````````````````````````````````````````````````
    //term기록 바꾸면 안됌
    //같은 날짜 한번 더 누르면 다시 원상복구
    // summary 값도 같이 바꿔줘야한다
    //
  };

  const getSelectedWeekRecords = (startDay) => {
    console.log('찍은 날로부터 1주일 기록 보여주기 , 날짜 : ' + startDay);
    // handlePostMessage('weekRecord', startDay);
    setSelectedDay(startDay);
    //불러와서 리랜더링
  };

  // console.log(filteringProps, summaryProps, graphProps, detailRecordProps);
  if (!(filteringProps && summaryProps && graphProps && detailRecordProps))
    return <Box>로딩중</Box>;
  if (filteringProps && summaryProps && graphProps && detailRecordProps) {
    return (
      <>
        <Box css={recordWrapper}>
          <Box css={recordTitle}>기록</Box>
          <Tabs
            value={menu}
            onChange={(event, newValue) => {
              setMenu(newValue);
            }}
            css={menuWrapper}
            TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
          >
            <Tab
              label="모여런"
              css={menuItem}
              onClick={() => {
                console.log('multiRunRecord 불러오기');
                setMenu(0);
                // handlePostMessage('multiRunRecord');
              }}
            />
            <Tab
              label="개인런"
              css={menuItem}
              onClick={() => {
                setMenu(1);
                console.log('singleRunRecord 불러오기');
                // handlePostMessage('singleRunRecord');
              }}
            />
          </Tabs>

          {props ? (
            <>
              <Filtering
                filteringProps={filteringProps}
                getSelectedWeekRecords={getSelectedWeekRecords}
              />

              <Summary summaryProps={summaryProps} />
              <RecordBarGraph graphProps={graphProps} getPickedDayRecords={getPickedDayRecords} />
            </>
          ) : (
            <>
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="rectangular" width="100%" width="50px" />
              <Skeleton variant="rectangular" width="100%" width="200px" />
            </>
          )}
        </Box>

        {/* /////recordWrapper  : 기록(타이틀), 모여런 개인런 이동 탭, Filtering컴포넌트, 거리 시간 페이스 요약컴포넌트 */}

        <Box css={detailRecordWapper}>
          상세 기록
          {props
            ? detailRecordProps.map((runningList, i) => (
                <DetailRecordCard key={i} runningList={runningList} />
              ))
            : [1, 2, 3, 4].map((x, i) => (
                <Skeleton key={i} variant="rectangular" width="100%" width="100px" />
              ))}
        </Box>
      </>
    );
  }
};

export default RecordTab;

const recordWrapper = css`
  padding: 11px;
`;

const menuWrapper = css`
  margin: 20px 0px;
  padding-left: 6px;
  & .MuiTabs-indicator {
    display: flex;
    justify-content: center;
    background-color: transparent;
  }
  & .MuiTabs-indicatorSpan {
    width: 100%;
    background-color: #1162ff;
  }
`;

const menuItem = css`
  height: fit-content;
  font-family: text-500;
  font-size: 18px;
  display: flex;
  justify-content: center;
  color: #828282;
  margin-right: 16px;
  &.MuiTab-root {
    min-width: 55px;
    padding: 0;
  }
  &.MuiTouchRipple-root {
    width: 100%;
  }
  &.Mui-selected {
    color: #1162ff;
  }
`;

const recordTitle = css`
  font-family: text-500;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 29px;
  letter-spacing: -0.045em;
  text-align: left;
  margin-top: 15px;
  margin-left: 9px;
`;
const detailRecordWapper = css`
  padding: 25px 14px 0px 11px;
  font-family: text-500;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.05em;
  text-align: left;
  background-color: #f4f4f4;
  padding-top: 25px;
`;
