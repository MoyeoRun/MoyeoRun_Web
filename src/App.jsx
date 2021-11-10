import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './screens/service/Login';
import RecordDetail from './screens/service/RecordDetail';
import TestMain from './screens/test/TestMain';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/test" />}></Route>
      {[
        { path: '/service', element: undefined },
        { path: '/test', element: <TestMain /> },
      ].map((route) => (
        <Route path={route.path} element={route.element}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="recordDetail" element={<RecordDetail />} />
          <Route path="recordAnalysis " element={<Login />} />
        </Route>
      ))}
    </Routes>
  );
}

export default App;
