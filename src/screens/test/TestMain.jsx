/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

const index = [
  { url: '/test/login', title: '로그인 스크린' },
  { url: '/test/recordDetail', title: '기록 상세 스크린' },
  { url: '/test/recordAnalysis', title: '기록 분석 스크린' },
];

const TestMain = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box css={mainWrapper}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {index.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => {
                  navigate(item.url);
                  handleClose();
                }}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pathname === '/test'
              ? '로그인 스크린'
              : index.filter((item) => item.url === pathname)[0].title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default TestMain;

const mainWrapper = css``;
