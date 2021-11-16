import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomeTab from './screens/bottomTab/HomeTab';
import index from './screens';
import TestMain from './screens/TestMain';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/test/homeTab" />}></Route>
      {[
        { path: '/service', element: undefined },
        { path: '/test', element: <TestMain /> },
      ].map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          <Route index element={<HomeTab />} />
          {index.map((screen) => (
            <Route key={screen.url} path={screen.url} element={screen.component} />
          ))}
        </Route>
      ))}
    </Routes>
  );
}

export default App;
