import { Box } from '@mui/material';
import ReactLoading from 'react-loading';

const Loading = () => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ReactLoading type="bars" color="#1160ffde" width="50px" height="50px" />
  </Box>
);

export default Loading;
