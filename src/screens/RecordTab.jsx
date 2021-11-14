/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import RecordBarGraph from '../components/RecordComponents/RecordBarGraph';
import DetailRecordCard from '../components/RecordComponents/DetailRecordCard';
import Filtering from '../components/RecordComponents/Filtering';
import Summary from '../components/RecordComponents/Summary';

const RecordTab = () => {
  const [props, setProps] = useState(null);

  const listener = ({ data }) => {
    const propsData = JSON.parse(data);
    if (propsData.type === 'recordTab') {
      setProps(propsData.value);
    }
  };

  const on = () => {
    const data = JSON.stringify({});
    window.ReactNativeWebView.onMessage(data);
  };

  useEffect(() => {
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  const detailRecords = [
    {
      totalDistanceOfTerm: 12312,
      averagePaceOfTerm: 12312312,
      totalTimeOfTerm: 12312333,
      date: '2021-11-13T06:55:56.670Z',
      title: 'tiltittltl',
    },
    {
      totalDistanceOfTerm: 12312,
      averagePaceOfTerm: 12312312,
      totalTimeOfTerm: 12312333,
      date: '2021-11-13T06:55:56.670Z',
      title: 'tiltittltl',
    },
    {
      totalDistanceOfTerm: 12312,
      averagePaceOfTerm: 12312312,
      totalTimeOfTerm: 12312333,
      date: '2021-11-13T06:55:56.670Z',
      title: 'tiltittltl',
    },
    {
      totalDistanceOfTerm: 12312,
      averagePaceOfTerm: 12312312,
      totalTimeOfTerm: 12312333,
      date: '2021-11-13T06:55:56.670Z',
      title: 'tiltittltl',
    },
    {
      totalDistanceOfTerm: 12312,
      averagePaceOfTerm: 12312312,
      totalTimeOfTerm: 12312333,
      date: '2021-11-13T06:55:56.670Z',
      title: 'tiltittltl',
    },
  ];
  const summaryRecord = { distance: 123123, pace: 1231.123, time: 12312223123 };
  return (
    <>
      <Box css={recordWrapper}>
        <Box css={recordTitle}>기록</Box>
        <Filtering />
        <Summary summaryRecord={summaryRecord} />
        <RecordBarGraph />
      </Box>

      <Box css={detailRecordWapper}>
        상세 기록
        {detailRecords.map((record) => {
          return <DetailRecordCard detailRecord={record} />;
        })}
      </Box>
    </>
  );
};

export default RecordTab;

const recordWrapper = css`
  padding: 11px;
`;
const recordTitle = css`
  font-family: Apple SD Gothic Neo;
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
  font-family: Apple SD Gothic Neo;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.05em;
  text-align: left;
  background-color: #f4f4f4;
  padding-top: 25px;
`;
