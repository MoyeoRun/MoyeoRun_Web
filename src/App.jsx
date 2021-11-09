import { Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import RecordDetail from './screens/RecordDetail';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/recordDetail" element={<RecordDetail />} />
      <Route path="/recordAnalysis " element={<Login />} />
    </Routes>
  );
}

export default App;
