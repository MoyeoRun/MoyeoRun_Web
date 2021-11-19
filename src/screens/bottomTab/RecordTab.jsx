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
import { recordTabProps } from '../../testData/recordTabTest';

// type RunHistory = {
//   totalDistance: number;
//   totalAveragePace: number;
//   totalTime: number;
//   analysisRunningListBetweenTerm: RunStatistics;
//   runningList: Array<RunRecord>;
// };

const RecordTab = () => {
  const [props, setProps] = useState(null);
  const [menu, setMenu] = useState(0);
  const { pathname } = useLocation();

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'recordTab') {
      setProps(propsData.value);
    }
  };

  // useEffect(() => {
  //   if (pathname === '/test/recordTab') setProps(tempProps);
  //   document.addEventListener('message', listener);
  //   window.addEventListener('message', listener);

  //   return () => {
  //     document.removeEventListener('message', listener);
  //     window.removeEventListener('message', listener);
  //   };
  // }, []);

  useEffect(() => {
    setProps(recordTabProps);
  }, []);

  if (!props) return null;
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
          <Tab label="모여런" css={menuItem} />
          <Tab label="개인런" css={menuItem} />
        </Tabs>

        {menu === 0 && (
          <>
            <Filtering startDate={props.startDate} endDate={props.startDate} />
            <Summary
              distance={props.runHistory.totalDistance}
              pace={props.runHistory.totalAveragePace}
              time={props.runHistory.totalTime}
            />
            <RecordBarGraph runStatistics={props.runHistory.analysisRunningListBetweenTerm} />
          </>
        )}

        {menu === 1 && (
          <>
            <Filtering startDate={props.startDate} endDate={props.startDate} />
            <Summary
              distance={props.runHistory.totalDistance}
              pace={props.runHistory.totalAveragePace}
              time={props.runHistory.totalTime}
            />
            <RecordBarGraph runStatistics={props.runHistory.analysisRunningListBetweenTerm} />
          </>
        )}
        {/*         
        props
          <>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="rectangular" width="100%" width="50px" />
            <Skeleton variant="rectangular" width="100%" width="200px" />
          </>
       */}
      </Box>
      {/* recordWrapper  : 기록(타이틀), 모여런 개인런 이동 탭, Filtering컴포넌트, 거리 시간 페이스 요약컴포넌트 */}

      <Box css={detailRecordWapper}>
        상세 기록
        {props
          ? props.runHistory.runningList.map((record, i) => (
              <DetailRecordCard key={i} detailRecord={record} />
            ))
          : [1, 2, 3, 4].map((x, i) => (
              <Skeleton key={i} variant="rectangular" width="100%" width="100px" />
            ))}
      </Box>
    </>
  );
};

export default RecordTab;

const recordWrapper = css`
  padding: 11px;
`;

const menuWrapper = css`
  margin-top: 20px;
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
