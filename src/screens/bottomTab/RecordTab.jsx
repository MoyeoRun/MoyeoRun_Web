/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Skeleton, Tab, Tabs } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [showOneRecord, setShowOneRecord] = useState(false); //전체 기록 보여주는건지, 하나의 기록 보여주는건지
  const [menu, setMenu] = useState(0); // 모여런 뷰, 개인런 뷰 구분
  const menuChecker = useRef();
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [filteringProps, setFilteringProps] = useState();
  const [summaryProps, setSummaryProps] = useState();
  const [graphProps, setGraphProps] = useState();
  const [detailRecordProps, setDetailRecordProps] = useState();

  const { pathname } = useLocation();

  const getISOstartEndDays = ({ startDay, endDay, type }) => {
    console.log('날짜 범위로 보여주기');
    // console.log(startDay, endDay, type);
    return {
      startDay: new Date(startDay).toISOString(),
      endDay: new Date(endDay).toISOString(),
      type: type,
    };
  };
  const getIdValue = ({ day, type }) => {
    console.log('날짜 한개만 보여주기');
    // console.log(day, type);
    return {
      id: props.runHistory.runningList.find((item) => new Date(item.createdAt).getDate() === day)
        .id,
      type: type,
    };
  };

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
    console.log('기록 1개만 보기 모드? ', loading, showOneRecord);
    if (loading) {
      setShowOneRecord(!showOneRecord);
      setLoading(false);
    }
  }, [loading, showOneRecord]);

  // rn으로 message 보낼때 쓰는 함수
  const handlePostMessage = (type, value = {}) => {
    // window.ReactNativeWebView.postMessage(JSON.stringify({ type: type, value: value }));
    setLoading(true);
  };

  //chart.js 이벤트리스너에 등록되는 함수, 막대그래프 클릭시 작동
  const getPickedDayRecords = (day) => {
    // console.log(menu, menuChecker);
    // console.log(showOneRecord);
    console.log('하루 찍은 날짜 기록 보여주기 , 날짜 : ' + day);
    const pickedDate = summaryProps.runningList.find(
      (item) => new Date(item.createdAt).getDate() === day,
    ).createdAt;
    handlePostMessage(
      'runRecord',
      getIdValue({
        day,
        type: menuChecker.current === 0 ? 'multi' : menuChecker === 1 ? 'single' : '',
      }),
    );
    setSelectedDay(new Date(pickedDate));
  };

  //선택날짜 1주일 전 데이터 불러오는 함수, 캘린더. 모여런개인런 메뉴 변경시 작동
  const getSelectedWeekRecords = (selected) => {
    const endDay = new Date(selected ? selected : '');
    console.log('찍은 날로부터 1주일 기록 보여주기 , 날짜 : ' + endDay);
    const startDay = new Date(endDay.getFullYear(), endDay.getMonth(), endDay.getDate() - 6);

    console.log(startDay, endDay, menu, menuChecker);
    handlePostMessage(
      'runHistory',
      getISOstartEndDays({
        startDay,
        endDay,
        type: menuChecker.current === 0 ? 'multi' : menuChecker === 1 ? 'single' : '',
      }),
    );
    setSelectedDay(endDay);
    setShowOneRecord(false);
  };

  //날짜 선택 시 summaryprops 정리해주는 함수, 너무 길어서 따로 뻈음
  const setSummaryDataProps = (runRecord) => {
    console.log(runRecord);
    let summaryData = {};
    for (let key in runRecord) {
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
        summaryData[key] = runRecord[key];
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
    return summaryData;
  };

  //전체 Props 여기서 설정해줌
  useEffect(() => {
    if (props) {
      let filteringData = {};
      let summaryData = {};
      let graphData = [];
      let detailRecordData = [];

      // 한개 기록만 보여주는 경우
      if (showOneRecord) {
        console.log('한개만');
        console.log(props.runRecord);
        filteringData = { startDate: selectedDay, showOneRecord: showOneRecord };
        summaryData = setSummaryDataProps(props.runRecord);
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
  }, [props, selectedDay, menu]);

  //막대그래프 클릭시에 showOneRecord 상태 변경,

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
                // getSelectedWeekRecords(new Date());
                setShowOneRecord(false);
                setMenu(0);
                menuChecker.current = 0;
              }}
            />
            <Tab
              label="개인런"
              css={menuItem}
              onClick={() => {
                // getSelectedWeekRecords(new Date());
                setShowOneRecord(false);
                setMenu(1);
                menuChecker.current = 1;
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
