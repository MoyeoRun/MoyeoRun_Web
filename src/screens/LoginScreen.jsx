/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { ReactComponent as LogoBlue } from '../assets/svgs/LogoBlue.svg';
import { ReactComponent as GoogleIcon } from '../assets/svgs/GoogleIcon.svg';
import { ReactComponent as NaverIcon } from '../assets/svgs/NaverIcon.svg';
import { ReactComponent as KakaoIcon } from '../assets/svgs/KakaoIcon.svg';
import { ReactComponent as AppleIcon } from '../assets/svgs/AppleIcon.svg';

const OAuthButton = ({ OauthIcon, title, fontColor, bgColor, ...props }) => {
  return (
    <Box css={oauthButtonWrapper} {...props}>
      <Box css={oauthIcon}>
        <OauthIcon />
      </Box>
      <Box textAlign="center" flex={1}>
        {title}
      </Box>
    </Box>
  );
};

const LoginScreen = () => {
  return (
    <Box css={loginWrapper}>
      <Box css={logo}>
        <LogoBlue />
      </Box>
      <Box css={oauthWrapper}>
        <OAuthButton
          OauthIcon={KakaoIcon}
          title="카카오톡 계정으로 로그인"
          css={{ color: '#3C1E1E', background: '#FEE600' }}
        />
        <OAuthButton
          OauthIcon={NaverIcon}
          title="네이버 계정으로 로그인"
          css={{ color: '#FFFFFF', background: '#27D34A' }}
        />
        <OAuthButton
          OauthIcon={AppleIcon}
          title="애플 계정으로 로그인"
          css={{ color: '#FFFFFF', background: '#111111' }}
        />
        <OAuthButton
          OauthIcon={GoogleIcon}
          title="구글 계정으로 로그인"
          css={{ color: '#686868', background: '#FFFFFF', border: '1px solid #D1D1D1' }}
        />
      </Box>
    </Box>
  );
};

const loginWrapper = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: text;
`;

const logo = css`
  margin-top: 30%;
  margin-bottom: 80px;
`;

const oauthWrapper = css`
  width: calc(100% - 50px);
`;

const oauthButtonWrapper = css`
  width: calc(100% - 40px);
  height: 56px;
  padding: 0 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: text-500;
`;

const oauthIcon = css`
  width: 25px;
  display: flex;
  align-items: center;
`;

export default LoginScreen;
