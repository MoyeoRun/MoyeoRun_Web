/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Skeleton, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Filtering from '../../components/Record/Filtering';
import MultiRecordCard from '../../components/Record/MultiRecordCard';
import RecordBarGraph from '../../components/Record/RecordBarGraph';
import SingleRecordCard from '../../components/Record/SingleRecordCard';
import Summary from '../../components/Record/Summary';
import Text from '../../components/Text';
import tempProps from '../../testData/recordTabTest';

// type RecordTabProps = {
//   endDay: Date;
//   mode: 'single' | 'multi';
//   singleRecordList: SingleRunHistory | null;
//   multiRecordList: MultiRunHistory | null;
//   onQueryChange: ({ key, value }: { key: 'mode' | 'endDay'; value: any }) => void;
// };

const RecordTab = () => {
  const [mode, setMode] = useState(0);
  const [endDay, setEndDay] = useState(new Date().toISOString());
  const [graphData, setGraphData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [tempSelect, setTempSelect] = useState(null);
  const [totalSummary, setTotalSummary] = useState(null);
  const [runRecordList, setRunRecordList] = useState(null);
  const [summary, setSummary] = useState(null);
  const [barTouch, setBarTouch] = useState();
  const { pathname } = useLocation();

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    switch (propsData.type) {
      case 'mode':
        setMode(propsData.value);
        break;
      case 'endDay':
        setEndDay(propsData.value);
        break;
      case 'singleRecordList':
        setGraphData(propsData.value.analysisRunningListBetweenTerm);
        setTotalSummary({
          time: propsData.value.totalTime,
          distance: propsData.value.totalDistance,
          pace: propsData.value.totalAveragePace,
        });
        setRunRecordList(propsData.value.runningList);
        break;
      case 'multiRecordList':
        setGraphData(propsData.value.analysisRunningListBetweenTerm);
        setTotalSummary({
          time: propsData.value.totalTime,
          distance: propsData.value.totalDistance,
          pace: propsData.value.totalAveragePace,
        });
        setRunRecordList(propsData.value.runningList);
        break;
    }
  };

  const selectWeek = (selected) => {
    if (pathname === '/test/recordTab') {
      setEndDay(selected.toISOString());
    } else {
      setGraphData(null);
      setTotalSummary(null);
      setRunRecordList(null);
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'queryChange', value: { type: 'endDay', value: selected } }),
      );
    }
    setSelectedDay(null);
  };

  const selectDay = (day) => {
    setTempSelect(day);
    setBarTouch(true);
  };

  // 선택 감지
  useEffect(() => {
    if (barTouch) {
      const isOff = selectedDay === tempSelect;
      if (isOff) setSelectedDay(null);
      else setSelectedDay(tempSelect);
      setGraphData(
        graphData.map((data) =>
          new Date(data.date).getDate() === new Date(isOff ? null : tempSelect).getDate()
            ? { ...data, active: true }
            : { ...data, active: false },
        ),
      );
      if (!isOff) {
        const { totalDistanceOfTerm, totalTimeOfTerm, averagePaceOfTerm } = graphData.find(
          (data) => new Date(data.date).getDate() === new Date(isOff ? null : tempSelect).getDate(),
        );
        setSummary({
          distance: totalDistanceOfTerm,
          time: totalTimeOfTerm,
          pace: averagePaceOfTerm,
        });
      }
      setBarTouch(false);
    }
  }, [barTouch]);

  useEffect(() => {
    if (pathname === '/test/recordTab') {
      // 모여런 데이터 주입
      // setMode(0);
      // setEndDay(new Date().toISOString());
      // setGraphData(tempProps.multiRecordList.analysisRunningListBetweenTerm);
      // setTotalSummary({
      //   time: tempProps.multiRecordList.totalTime,
      //   distance: tempProps.multiRecordList.totalDistance,
      //   pace: tempProps.multiRecordList.totalAveragePace,
      // });
      // setRunRecordList(tempProps.multiRecordList.runningList);

      // 개인런 데이터 주입
      setMode(1);
      setEndDay(new Date().toISOString());
      setGraphData(tempProps.singleRecordList.analysisRunningListBetweenTerm);
      setTotalSummary({
        time: tempProps.singleRecordList.totalTime,
        distance: tempProps.singleRecordList.totalDistance,
        pace: tempProps.singleRecordList.totalAveragePace,
      });
      setRunRecordList(tempProps.singleRecordList.runningList);
    }
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  return (
    <Box css={recordTabWrapper}>
      {/* 탭 */}
      <Text className="title">기록</Text>
      <Tabs
        value={mode}
        onChange={(event, newValue) => {
          if (pathname === '/test/recordTab') setMode(newValue);
          else {
            setGraphData(null);
            setTotalSummary(null);
            setRunRecordList(null);
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: 'queryChange', value: { type: 'mode', value: newValue } }),
            );
          }
        }}
        css={menuWrapper}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
      >
        <Tab label="모여런" css={menuItem} />
        <Tab label="개인런" css={menuItem} />
      </Tabs>

      {/* 현재 날짜 */}
      <Filtering endDay={endDay} selectWeek={selectWeek} />

      {/* 요약정보 */}
      {totalSummary || summary ? (
        <Summary summary={selectedDay ? summary : totalSummary} />
      ) : (
        <Skeleton variant="rectangular" width="100%" height="50px" />
      )}

      {/* 차트 */}
      {graphData ? (
        <RecordBarGraph graphData={graphData} selectDay={selectDay} />
      ) : (
        <Skeleton variant="rectangular" width="100%" height="170px" />
      )}

      {/* 러닝 카드리스트 */}
      <Box css={detailRecordWapper}>
        <Text className="title">상세 기록</Text>
        {runRecordList
          ? mode === 0
            ? runRecordList
                .filter((data) =>
                  selectedDay
                    ? new Date(data.multiRoom.startDate).getDate() ===
                      new Date(selectedDay).getDate()
                    : data,
                )
                .map((runRecord) => (
                  <MultiRecordCard key={runRecord.multiRoom.id} runRecord={runRecord} />
                ))
            : runRecordList
                .filter((data) =>
                  selectedDay
                    ? new Date(data.createdAt).getDate() === new Date(selectedDay).getDate()
                    : data,
                )
                .map((runRecord) => <SingleRecordCard key={runRecord.id} runRecord={runRecord} />)
          : [1, 2, 3, 4].map((x, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width="100%"
                height="115px"
                css={{ '& + &': { marginTop: '12px' } }}
              />
            ))}
      </Box>
    </Box>
  );
};

export default RecordTab;

const recordTabWrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  & .title {
    margin-left: 20px;
    margin-top: 16px;
    font-size: 24px;
    font-weight: 600;
    color: #333333;
  }
`;

const menuWrapper = css`
  margin: 20px 0px;
  margin-left: 20px;
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

const detailRecordWapper = css`
  flex: 1;
  padding: 0 13px;
  padding-bottom: 100px;
  width: calc(100% - 26px);
  background-color: #f4f4f4;
  & .title {
    margin: 22px 0 14px 0;
    font-family: text-500;
    font-size: 18px;
  }
`;
