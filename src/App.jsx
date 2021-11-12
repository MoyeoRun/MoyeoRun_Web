import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  BodyInfo,
  MyPage,
  Login,
  RecordAnalysis,
  RecordDetail,
  SingleRunStatus,
  TestMain,
  Home,
  Record,
  Running,
  Mission,
  Friend,
  ReadySingleRun,
  SingleRunMap,
  Room,
} from './screens';

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
          <Route path="recordDetail" element={<RecordDetail />} />
          <Route path="recordAnalysis" element={<RecordAnalysis />} />
          <Route path="bodyInfo" element={<BodyInfo />} />
          <Route path="home" element={<Home />} />
          <Route path="record" element={<Record />} />
          <Route path="recordDetail" element={<RecordDetail />} />
          <Route path="running" element={<Running />} />
          <Route path="mission" element={<Mission />} />
          <Route path="friend" element={<Friend />} />
          <Route path="myPage" element={<MyPage />} />
          <Route path="readySingleRun" element={<ReadySingleRun />} />
          <Route path="singleRunMap" element={<SingleRunMap />} />
          <Route path="makeRoom" element={<makeRoom />} />
          <Route path="room" element={<Room />} />
          <Route path="moyeoRun" element={<moyeoRun />} />
        </Route>
      ))}
    </Routes>
  );
}

export default App;
