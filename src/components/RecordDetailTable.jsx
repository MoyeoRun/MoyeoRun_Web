/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getPaceString } from '../lib/util/strFormat';

const RecordDetailTable = ({ data }) => {
  return (
    <TableContainer css={tableStyle}>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow sx={{ '& th': { border: 0 } }}>
            <TableCell align="left">km</TableCell>
            <TableCell align="left">평균 페이스</TableCell>
            <TableCell align="right">고도</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left">{getPaceString(row.pace)}</TableCell>
              <TableCell align="right">{row.altitude}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const tableStyle = css`
  th {
    font-family: text-500;
    font-size: 18px;
    color: #a4a4a4;
  }
  td {
    font-family: number-500;
    font-size: 20px;
  }
`;

export default RecordDetailTable;
