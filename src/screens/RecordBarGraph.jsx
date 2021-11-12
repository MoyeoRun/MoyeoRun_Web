/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import runData from '../../testData/recordDetailServerData.json';
import { useLocation } from 'react-router';
import externalTooltipHandler from '../../components/BarGraphToolTip';

const initData = {
  labels: [1, 2, 3, 4, 5, 7],
  datasets: [
    {
      label: '',
      data: [10, 3, 10, 23, 10, 5, 15, 20, 13, 5, 9],
      backgroundColor: '#C4C4C4',
      fill: true,
    },
  ],
};

const RecordTab = () => {
  const [data, setData] = useState(null);
  const [buffer, setBuffer] = useState(null);

  useEffect(() => {
    setData(initData);
    document.addEventListener('message', (e) => {
      const { latitude, longitude } = JSON.parse(e.data);
      alert(latitude, longitude);
      setBuffer({ latitude, longitude });
    });
    window.addEventListener('message', (e) => {
      const { latitude, longitude } = JSON.parse(e.data);
      alert(latitude, longitude);
      setBuffer({ latitude, longitude });
    });
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
    const barGraphCtx = document.getElementById('barGraph');
    const barGraph = new Chart(barGraphCtx, {
      //     type: TType;
      //     data: ChartData<TType, TData, TLabel>;
      //     options?: ChartOptions<TType>;
      //     plugins?: Plugin<TType>[];
      //   }
      type: 'bar',
      data: {
        labels: [1, 2, 3, 4, 5, 7],
        datasets: [
          {
            label: '',
            data: [10, 3, 10, 23, 10, 5, 15, 20, 13, 5, 9],
            backgroundColor: '#C4C4C4',
            fill: true,
          },
        ],
      },

      options: {
        scales: {
          x: {
            grid: {
              borderWidth: 0,
              display: false,
            },
          },
          y: {
            grid: {
              borderWidth: 0,
              borderColor: 'rgba(0,0,0,0)',
            },
          },
        },

        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
            external: externalTooltipHandler,
          },
        },
        responsive: true,
        title: {
          display: true,
          text: '막대 차트 테스트',
        },
        hoverBackgroundColor: '#1162FF',
        barThickness: '8',
      },
    });
    return () => {
      barGraph.reset();
    };
  }, []);

  return (
    <>
      {/* <Box css={barGraphWrapper(375)}> */}
      <div>
        <canvas css={barGraph()} id="barGraph"></canvas>
      </div>
      <Box css={axis()}>
        <Box>km</Box>
        <Box>일</Box>
      </Box>
      {/* </Box> */}
    </>
  );
};

export default RecordTab;

// const barGraphWrapper = (width) => css`
//   /* border: 1px solid black; */
//   box-sizing: border-box;
//   width: ${width}px;
//   height: ${width / 2}px;
//   margin: auto;
// `;

const barGraph = () => css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0px 0px 0px 5px;
`;

const axis = () => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  line-height: 12px;
  position: relative;
  flex-direction: row;
  padding: 0px 0px 0px 5px;
  top: -16px;
  font-size: 12px;
  color: #848484;
`;
