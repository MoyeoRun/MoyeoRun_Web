/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import Chart from 'chart.js/auto';
import React, { useEffect } from 'react';
import Text from '../../components/Text';
import { getPaceString } from '../../lib/util/strFormat';
import runData from '../../testData/recordDetailServerData.json';

const RecordAnalysis = (props) => {
  useEffect(() => {
    const paceCtx = document.getElementById('paceChart');
    const paceChart = new Chart(paceCtx, {
      type: 'line',
      data: {
        labels: runData.runData
          .reduce((acc, item) => acc.concat(...item))
          .filter((item) => item.currentPace > 2)
          .map((x, i) => i + 1 + 'km'),
        datasets: [
          {
            label: '페이스',
            data: runData.runData
              .reduce((acc, item) => acc.concat(...item))
              .filter((item) => item.currentPace > 2)
              .map((point) => point.currentPace),
            borderColor: '#1162FF',
            backgroundColor: function ({ chart: { ctx, chartArea } }) {
              if (!chartArea) return;
              let gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
              gradient.addColorStop(0, 'rgba(237,243,255,1)');
              gradient.addColorStop(1, 'rgba(17,98,255,0.3)');
              return gradient;
            },
            fill: 'start',
          },
        ],
      },
      options: {
        elements: {
          line: {
            tension: 0.4,
          },
        },
        scales: {
          y: {
            max: 20,
            reverse: true,
            ticks: {
              stepSize: 0.5,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          filler: {
            propagate: false,
          },
          title: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
        },
      },
    });

    const ctx = document.getElementById('altitudeChart');
    const altitudeChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: runData.runData
          .reduce((acc, item) => acc.concat(...item))
          .map((x, i) => i + 1 + 'km'),
        datasets: [
          {
            label: '페이스',
            data: runData.runData
              .reduce((acc, item) => acc.concat(...item))
              .map((point) => point.altitude),
            borderColor: '#1162FF',
            backgroundColor: function ({ chart: { ctx, chartArea } }) {
              if (!chartArea) return;
              let gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
              gradient.addColorStop(0, 'rgba(237,243,255,1)');
              gradient.addColorStop(1, 'rgba(17,98,255,0.3)');
              return gradient;
            },
            fill: 'start',
          },
        ],
      },
      options: {
        elements: {
          line: {
            tension: 0.4,
          },
        },
        scales: {
          y: {
            suggestedMin: 0,
            ticks: {
              stepSize: 2,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          filler: {
            propagate: false,
          },
          title: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
        },
      },
    });

    return () => {
      paceChart.reset();
      altitudeChart.reset();
    };
  }, []);

  return (
    <Box css={recordAnalysisWrapper}>
      <Text css={chartTitle}>상세 분석</Text>
      <Text
        css={css`
          font-size: 18px;
          margin-bottom: 18px;
        `}
      >
        페이스
      </Text>
      <canvas
        id="paceChart"
        style={css`
          height: 160px !important;
        `}
      ></canvas>
      <Box css={dataWrapper}>
        <Box css={dataBlock}>
          <Box css={dataTitle}>평균 페이스</Box>
          <Box css={data}>{getPaceString(runData.runPace)}</Box>
        </Box>
        <Box css={dataBlock}>
          <Box css={dataTitle}>최고 페이스</Box>
          <Box css={data}>
            {getPaceString(
              Math.min(
                ...runData.runData
                  .reduce((acc, item) => acc.concat(...item))
                  .filter((item) => item.currentPace > 2)
                  .map((item) => item.currentPace),
              ),
            )}
          </Box>
        </Box>
      </Box>

      <Text css={chartTitle}>고도</Text>
      <canvas
        id="altitudeChart"
        style={css`
          height: 160px !important;
        `}
      ></canvas>
      <Box css={dataWrapper}>
        <Box css={dataBlock}>
          <Box css={dataTitle}>최저 고도</Box>
          <Box css={data}>
            {Math.min(
              ...runData.runData
                .reduce((acc, item) => acc.concat(...item))
                .map((item) => item.altitude),
            )}
          </Box>
        </Box>
        <Box css={dataBlock}>
          <Box css={dataTitle}>최고 고도</Box>
          <Box css={data}>
            {Math.max(
              ...runData.runData
                .reduce((acc, item) => acc.concat(...item))
                .map((item) => item.altitude),
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const recordAnalysisWrapper = css`
  padding: 0 18px;
`;

const chartTitle = css`
  font-size: 24px;
  margin-bottom: 22px;
`;

const dataWrapper = css`
  display: flex;
  justify-content: center;
`;

const dataBlock = css`
  margin: 20px 0 56px 0;
  height: 35px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:first-child {
    border-right: 0.75px solid #cbcbcb;
  }
`;

const dataTitle = css`
  font-family: text-500;
  font-size: 14px;
  color: #828282;
`;

const data = css`
  font-family: number-500;
  font-size: 18px;
  color: #333333;
`;

export default RecordAnalysis;
