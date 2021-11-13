import {
  BodyInfo,
  MyPage,
  Login,
  RecordAnalysis,
  RecordDetail,
  SingleRunStatus,
  Home,
  Record,
  Running,
  Mission,
  Friend,
  ReadySingleRun,
  SingleRunMap,
  Room,
  MakeRoom,
} from './index';

const indexObject = [
  { url: '/test/bodyInfo', title: '신체정보 입력 스크린', component: <BodyInfo /> },
  { url: '/test/myPage', title: '마이페이지 스크린', component: <MyPage /> },
  { url: '/test/login', title: '로그인', component: <Login /> },
  { url: '/test/recordAnalysis', title: '기록 상세 분석 스크린', component: <RecordAnalysis /> },
  { url: '/test/recordDetail', title: '기록 상세 스크린', component: <RecordDetail /> },
  { url: '/test/singleRunStatus', title: '개인런 상태 스크린', component: <SingleRunStatus /> },
  { url: '/test/home', title: '홈 탭 스크린', component: <Home /> },
  { url: '/test/record', title: '기록 탭 스크린', component: <Record /> },
  { url: '/test/running', title: '러닝 탭 스크린', component: <Running /> },
  { url: '/test/mission', title: '미션 탭 스크린', component: <Mission /> },
  { url: '/test/friend', title: '친구 탭 스크린', component: <Friend /> },
  { url: '/test/readySingleRun', title: '개인런 준비 스크린', component: <ReadySingleRun /> },
  { url: '/test/singleRunMap', title: '개인런 맵 스크린', component: <SingleRunMap /> },
  { url: '/test/makeRoom', title: '모여런 만들기 스크린', component: <MakeRoom /> },
  { url: '/test/room', title: '모여런 방 스크린', component: <Room /> },
];

export default indexObject;
