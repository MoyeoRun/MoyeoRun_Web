/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';

const RecordBarGraph = ({ graphData, selectDay }) => {
  const [graph, setGraph] = useState();
  const labels = graphData.map((item) => new Date(item.date).getDate());
  const labelsRawData = graphData.map((item) => item.date);
  const data = graphData.map((item) => item.totalDistanceOfTerm);

  useEffect(() => {
    const barGraphCtx = document.getElementById('barGraph');
    const barGraph = new Chart(barGraphCtx, {
      type: 'bar',
      data: {
        labels,
        labelsRawData,
        datasets: [
          {
            label: '',
            data,
            backgroundColor: '#C4C4C4',
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: '#fff',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: '#fff',
              },
            },
          ],
        },
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
          },
        },
        responsive: true,
        title: {
          display: true,
          text: '막대 차트 테스트',
        },
        barThickness: '25',
      },
    });
    barGraphCtx.addEventListener(
      'click',
      function (evt, elem) {
        const points = barGraph.getElementsAtEventForMode(
          evt,
          'nearest',
          { intersect: true },
          true,
        );
        if (points.length) {
          const firstPoint = points[0];
          const labelRawData = barGraph.data.labelsRawData[firstPoint.index];
          selectDay(labelRawData);
        }
      },
      false,
    );

    setGraph(barGraph);
    return () => {
      barGraph.reset();
    };
  }, []);

  useEffect(() => {
    if (graph) {
      graph.reset();
      graph.data.labels = graphData.map((item) => new Date(item.date).getDate());
      graph.data.labelsRawData = graphData.map((item) => item.date);
      (graph.data.datasets.data = graphData.map((item) => item.totalDistanceOfTerm)),
        (graph.data.datasets[0].backgroundColor = graphData.map((item) =>
          item.active ? '#1126ff' : '#C4C4C4',
        ));
      graph.options.animation = false;
      graph.update();
    }
  }, [graphData, graph]);

  return (
    <Box css={barGraphWrapper}>
      <div id={'barGraphDiv'}>
        <canvas css={barGraphStyle()} id="barGraph"></canvas>
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
  width: calc(100% - 20px);
  padding: 0 10px;
  box-sizing: border-box;
  margin: auto;
`;

const barGraphStyle = () => css`
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
