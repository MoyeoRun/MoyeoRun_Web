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
  const [barTouch, setBarTouch] = useState();
  const [menu, setMenu] = useState(0); // 모여런 뷰, 개인런 뷰 구분
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [filteringProps, setFilteringProps] = useState();
  const [summaryProps, setSummaryProps] = useState();
  const [graphProps, setGraphProps] = useState();
  const [detailRecordProps, setDetailRecordProps] = useState();

  const menuChecker = useRef(1);

  const { pathname } = useLocation();

  const getISOstartEndDays = ({ startDay, endDay, runType }) => {
    return {
      startDay: new Date(startDay).toISOString(),
      endDay: new Date(endDay).toISOString(),
      runType: runType,
    };
  };

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'recordTab') {
      handlePostMessage('console', { '데이터 확인': propsData.value });
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
    if (barTouch === null || barTouch === undefined) {
      return () => setBarTouch(false);
    }

    if (barTouch) {
      setShowOneRecord(!showOneRecord);
      setBarTouch(false);
    }
  }, [barTouch]);

  // rn으로 message 보낼때 쓰는 함수
  const handlePostMessage = (type, value = {}) => {
    // window.ReactNativeWebView.postMessage(JSON.stringify({ type: type, value: value }));
    if (type === 'console') return;
    else setLoading(true);
  };

  //chart.js 이벤트리스너에 등록되는 함수, 막대그래프 클릭시 작동
  const getPickedDayRecords = (day) => {
    setSelectedDay(day);
    setBarTouch(true);
  };

  //선택날짜 1주일 전 데이터 불러오는 함수, 캘린더. 모여런개인런 메뉴 변경시 작동
  const getSelectedWeekRecords = (selected) => {
    console.log(selected);
    const endDay = new Date(selected ? selected : '');
    // console.log('찍은 날로부터 1주일 기록 보여주기 , 날짜 : ' + endDay);
    const startDay = new Date(endDay.getFullYear(), endDay.getMonth(), endDay.getDate() - 6);
    handlePostMessage(
      'recordList',
      getISOstartEndDays({
        startDay,
        endDay,
        runType: menuChecker.current === 1 ? 'multi' : 'single',
      }),
    );
    console.log(endDay);

    setSelectedDay(endDay);
    setShowOneRecord(false);
  };

  //날짜 선택 시 summaryprops 정리해주는 함수, 너무 길어서 따로 뻈음,
  // const setSummaryDataProps = (runRecord, menu) => {
  //   // console.log(runRecord);
  //   let summaryData = {};
  //   //summaryData props에 들어갈 데이터 설정
  //   for (let key in runRecord) {
  //     if (
  //       key === 'runPace' ||
  //       key === 'runTime' ||
  //       key === 'runDistance' ||
  //       key === 'type' ||
  //       key === 'id' ||
  //       key === 'targetTime' ||
  //       key === 'targetDistance' ||
  //       key === 'createdAt' ||
  //       key === 'rank' ||
  //       key === 'startDate' ||
  //       key === 'roomImage' ||
  //       key === 'title'
  //     ) {
  //       summaryData[key] = runRecord[key];
  //     }
  //   }

  //   const headInfo = summaryData.id && {
  //     type: summaryData.type,
  //     target: summaryData.targetDistance || summaryData.targetTime || summaryData.rank || '',
  //   };
  //   const typeValue = { free: '자유', time: '목표시간', distance: '목표거리', rank: '순위' };
  //   const tempData = [];

  //   //summaryData 맨 앞에 파란글씨 값 설정해주는곳
  //   if (headInfo) {
  //     //{value : 실제 값, keyword: 타입에대한 텍스트}

  //     tempData.push({ value: typeValue[headInfo.type], keyword: '종류' });

  //     headInfo.type !== 'free' &&
  //       headInfo.target !== '' &&
  //       tempData.push(
  //         headInfo.type === 'time'
  //           ? { value: secondToTimeString(headInfo.target), keyword: '목표' }
  //           : headInfo.type === 'distance' && {
  //               value: getDistanceString(headInfo.target),
  //               keyword: '목표',
  //             },
  //       );
  //   }
  //   summaryData.headData = tempData;
  //   return summaryData;
  // };

  const setSummaryDataProps = (analysisRunningListBetweenTerm) => {
    let summaryData = {};
    //summaryData props에 들어갈 데이터 설정
    for (let key in analysisRunningListBetweenTerm) {
      if (
        key === count ||
        key === date ||
        key === totalDistanceOfTerm ||
        key === totalTimeOfTerm ||
        key === averagePaceOfTerm
      ) {
        summaryData[key] = runRecord[key];
      }

      return summaryData;
    }
  };

  //전체 Props 여기서 설정해줌
  useEffect(() => {
    handlePostMessage('console', { 'props 전달 받음?': props });
    console.log(props);
    console.log(menuChecker, showOneRecord, selectedDay);
    let filteringData = {};
    let summaryData = {};
    let graphData = [];
    let detailRecordData = [];

    if (props) {
      handlePostMessage('console', { '왜 여기로 안넘어올까 props': props });
      console.log(showOneRecord);

      const { singleRecordList, multiRecordList } = props;

      // 한개 기록만 보여주는 경우
      if (showOneRecord) {
        handlePostMessage('console', [
          '기록 하나',
          {
            showOneRecord,
          },
        ]);
        // console.log('기록 하나 보여주는 경우');
        const selectedDayDate = new Date(selectedDay).getDate();
        if (singleRecordList) {
          // console.log('싱글런인 경우');
          handlePostMessage('console', [
            '싱글런 데이터',
            {
              showOneRecord,
            },
          ]);
          const { runningList } = singleRecordList;
          filteringData = { startDate: selectedDay, showOneRecord: showOneRecord };
          summaryData = setSummaryDataProps(
            runningList.find((day) => new Date(day.createAt).getDate() === selectedDayDate),
          );
          graphData = analysisRunningListBetweenTerm.map((day) =>
            new Date(day.createAt).getDate() === selectedDayDate
              ? { ...day, active: true }
              : { ...day },
          );
          detailRecordData = [
            runningList.find((day) => new Date(day.createdAt).getDate() === selectedDate || []),
          ];
          handlePostMessage('console', [filteringData, summaryData, graphData, detailRecordData]);
        }

        //여기 문제
        else if (multiRecordList) {
          // console.log('멀티런인 경우');
          handlePostMessage('console', [
            '멀티런 데이터',
            {
              showOneRecord,
            },
          ]);
          const { analysisRunningListBetweenTerm, runningList } = multiRecordList;
          filteringData = { startDate: selectedDay, showOneRecord: showOneRecord };
          summaryData = setSummaryDataProps(
            analysisRunningListBetweenTerm.find(
              (day) => new Date(day.date).getDate() === selectedDayDate,
            ),
          );
          graphData = analysisRunningListBetweenTerm.map((day) =>
            new Date(day.date).getDate() === selectedDayDate
              ? { ...day, active: true }
              : { ...day },
          );
          detailRecordData = [
            runningList.find(
              (day) => new Date(day.multiroom.startDate).getDate() === selectedDayDate || [],
            ),
          ];
        }
        handlePostMessage('console', [filteringData, summaryData, graphData, detailRecordData]);
      }

      // 모든 기록 보여주는 경우
      else {
        handlePostMessage('console', [
          '기록 리스트',
          {
            showOneRecord,
          },
        ]);
        // console.log('기록 리스트 보여주는 경우');
        if (singleRecordList && menuChecker.current == 0) {
          handlePostMessage('console', [
            '싱글런리스트 데이터',
            {
              singleRecordList: singleRecordList,
              multiRecordList: multiRecordList,
            },
          ]);

          // console.log('싱글런인 경우');
          filteringData = { startDate: selectedDay, showOneRecord: showOneRecord };
          for (let key in singleRecordList) {
            if (
              key === 'totalTime' ||
              key === 'totalDistance' ||
              key === 'totalAveragePace' ||
              key === 'runningList'
            )
              summaryData[key] = singleRecordList[key];
          }
          graphData = singleRecordList.analysisRunningListBetweenTerm;
          detailRecordData = singleRecordList.runningList;
          handlePostMessage('console', [filteringData, summaryData, graphData, detailRecordData]);
        }

        //여기 문제
        else if (multiRecordList && menuChecker.current === 1) {
          handlePostMessage('console', [
            '멀티런리스트 데이터',
            {
              singleRecordList: singleRecordList,
              multiRecordList: multiRecordList,
            },
          ]);

          console.log('바뀌나?');
          console.log(selectedDay);
          filteringData = { startDate: selectedDay, showOneRecord: showOneRecord };
          for (let key in multiRecordList) {
            if (
              key === 'totalTime' ||
              key === 'totalDistance' ||
              key === 'totalAveragePace' ||
              key === 'runningList'
            )
              summaryData[key] = multiRecordList[key];
          }
          graphData = multiRecordList.analysisRunningListBetweenTerm;
          detailRecordData = multiRecordList.runningList;

          handlePostMessage('console', [filteringData, summaryData, graphData, detailRecordData]);
        }
      }

      handlePostMessage('console', [
        '여기에서 Props 넘어가기 전에 안들어가나?',
        filteringData,
        summaryData,
        graphData,
        detailRecordData,
      ]);
    }
    // console.log(selectedDay);
    // console.log(filteringData, summaryData, graphData, detailRecordData);
    setFilteringProps(filteringData);
    setSummaryProps(summaryData);
    setGraphProps(graphData);
    setDetailRecordProps(detailRecordData);
  }, [props, selectedDay, showOneRecord, menu]);

  //막대그래프 클릭시에 showOneRecord 상태 변경,

  handlePostMessage('console', [
    '선수입장',
    filteringProps,
    summaryProps,
    graphProps,
    detailRecordProps,
  ]);

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
                getSelectedWeekRecords(new Date());
                setShowOneRecord(false);
                setMenu(0);
                menuChecker.current = 0;
              }}
            />
            <Tab
              label="개인런"
              css={menuItem}
              onClick={() => {
                getSelectedWeekRecords(new Date());
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
