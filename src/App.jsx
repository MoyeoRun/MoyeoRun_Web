import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import RecordAnalysis from './screens/RecordAnalysis';
import RecordDetail from './screens/RecordDetail';
import SingleRunMap from './screens/SingleRunMap';
import SingleRunStatus from './screens/SingleRunStatus';
import TestMain from './screens/TestMain';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/test" />}></Route>
      {[
        { path: '/service', element: undefined },
        { path: '/test', element: <TestMain /> },
      ].map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="singleRunStatus" element={<SingleRunStatus />} />
          <Route path="singleRunMap" element={<SingleRunMap />} />
          <Route path="recordDetail" element={<RecordDetail />} />
          <Route path="recordAnalysis" element={<RecordAnalysis />} />
        </Route>
      ))}
    </Routes>
  );
}

export default App;
