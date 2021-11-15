/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import Chart from 'chart.js/auto';
import { useEffect } from 'react';
import externalTooltipHandler from '../BarGraphToolTip';

// type RunStatistics = Array<{
//   count: number;
//   date: string;
//   totalDistanceOfTerm: number;
//   totalTimeOfTerm: number;
//   averagePaceOfTerm: number;
// }>;

const RecordBarGraph = ({ runStatistics }) => {
  useEffect(() => {
    const barGraphCtx = document.getElementById('barGraph');
    const barGraph = new Chart(barGraphCtx, {
      type: 'bar',
      data: {
        labels: runStatistics.map((item) => new Date(item.date).getDate()),
        datasets: [
          {
            label: '',
            data: runStatistics.map((item) => item.totalDistanceOfTerm),
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
    <Box css={barGraphWrapper}>
      <Box css={graphBorder} />
      <div>
        <canvas css={barGraph()} id="barGraph"></canvas>
      </div>
      <Box css={axis()}>
        <Box>km</Box>
        <Box>일</Box>
      </Box>
    </Box>
  );
};

export default RecordBarGraph;

const barGraphWrapper = css`
  box-sizing: border-box;
  margin: auto;
  padding: 0px 9px 0px 9px;
`;

const barGraph = () => css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const axis = () => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  line-height: 12px;
  position: relative;
  flex-direction: row;
  top: -16px;
  font-size: 12px;
  color: #848484;
`;
const graphBorder = css`
  width: 100%;
  border: 1px solid #dddddd;
  margin-bottom: 32px;
`;
