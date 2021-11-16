/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {
  CurrentRanking,
  DivideMapView,
  IndividualMapView,
  LineUp,
  RunStatus,
  Timer,
  UserRank,
  Widgets,
} from '../components/MoyeoRunComponents';

const InitValue = {
  remainTime: 10000,
  image: 'https://source.unsplash.com/random/90x90',
  rank: 1,
  runData: {
    pace: 1000,
    distance: 1000,
    time: 1000,
  },
};

const MoyeoRun = () => {
  const [props, setProps] = useState(null);
  const [viewState, setViewState] = useState({ selfMapView: true, dividedMapview: false });
  const { pathname } = useLocation();

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'MoyeoRun') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    if (pathname === '/test/MoyeoRun') setProps(tempProps);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);
    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  useEffect(() => {
    setProps(InitValue);
  }, []);

  const onHandelViewState = (type) => {
    const initState = { selfMapView: false, dividedMapview: false };
    setViewState({ ...initState, [type]: true });
  };

  if (!props) return null;
  if (viewState.selfMapView || viewState.dividedMapview)
    return (
      <Box css={moyeoRunWrapper}>
        <Timer remainTime={props.remainTime} />
        <Widgets onHandelViewState={onHandelViewState} />
        <UserRank image={props.image} rank={props.rank} isMe={true} />
        {/* <IndividualMapView data={props} /> */}
        <Box>
          <RunStatus runData={props.runData} />
          <CurrentRanking>
            <LineUp />
          </CurrentRanking>
        </Box>
      </Box>
    );
  if (viewState.dividedMapview)
    return (
      <Box css={moyeoRunWrapper}>
        <DivideMapView />
        <LineUp />
      </Box>
    );
};

export default MoyeoRun;

const moyeoRunWrapper = css`
  width: 100%;
  height: 100%;
`;
