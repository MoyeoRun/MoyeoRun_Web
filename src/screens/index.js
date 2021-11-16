import FriendTab from './bottomTab/FriendTab';
import HomeTab from './bottomTab/HomeTab';
import MissionTab from './bottomTab/MissionTab';
import RecordTab from './bottomTab/RecordTab';
import RunningTab from './bottomTab/RunningTab';
import CreateMultiRoom from './multiRun/CreateMultiRoom';
import MultiRoom from './multiRun/MultiRoom';
import Mypage from './profile/MyPage';
import UploadBodyInfo from './profile/UploadBodyInfo';
import UploadNickName from './profile/UploadNickName';
import UploadProfile from './profile/UploadProfile';
import RecordAnalysis from './record/RecordAnalysis';
import RecordDetail from './record/RecordDetail';
import ReadySingleRun from './singleRun/ReadySingleRun';
import SingleRunOnlyMap from './singleRun/SingleRunOnlyMap';

const index = [
  //바텀 탭
  { url: 'homeTab', title: '홈 탭 스크린', component: <HomeTab /> },
  { url: 'recordTab', title: '기록 탭 스크린', component: <RecordTab /> },
  { url: 'runningTab', title: '러닝 탭 스크린', component: <RunningTab /> },
  { url: 'missionTab', title: '미션 탭 스크린', component: <MissionTab /> },
  { url: 'friendTab', title: '친구 탭 스크린', component: <FriendTab /> },

  //기록
  { url: 'recordAnalysis', title: '기록 상세 분석 스크린', component: <RecordAnalysis /> },
  { url: 'recordDetail', title: '기록 상세 스크린', component: <RecordDetail /> },

  //개인런
  { url: 'readySingleRun', title: '개인런 준비 스크린', component: <ReadySingleRun /> },
  { url: 'singleRunOnlyMap', title: '개인런 맵스크린', component: <SingleRunOnlyMap /> },

  //멀티런
  { url: 'makeRoom', title: '멀티 런 만들기 스크린', component: <CreateMultiRoom /> },
  { url: 'room', title: '멀티 런 방 스크린', component: <MultiRoom /> },

  //프로필
  { url: 'uploadProfile', title: '프로필 등록 스크린', component: <UploadProfile /> },
  { url: 'uploadBodyInfo', title: '신체정보 입력 스크린', component: <UploadBodyInfo /> },
  { url: 'uploadNickName', title: '닉네임 입력 스크린', component: <UploadNickName /> },
  { url: 'myPage', title: '마이페이지 스크린', component: <Mypage /> },
];

export default index;
