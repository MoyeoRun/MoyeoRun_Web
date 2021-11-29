/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, IconButton, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { ReactComponent as LeftBackArrowIcon } from '../../assets/svgs/LeftBackArrowIcon.svg';
import { ReactComponent as DefaultImage } from '../../assets/svgs/DefaultImage.svg';
import { ReactComponent as CameraIcon } from '../../assets/svgs/CameraIcon.svg';
import { ReactComponent as RunningIconBlue } from '../../assets/svgs/RunningIconBlue.svg';
import { ReactComponent as BadgeIcon } from '../../assets/svgs/BadgeIcon.svg';
import CustomButton from '../../components/CustomButton';
import Text from '../../components/Text';
import { useLocation } from 'react-router';
import myPageProps from '../../testData/myPageProps';

/**
 * @props
 *  user: User;
 */

const MyPage = () => {
  const [props, setProps] = useState(null);
  const { pathname } = useLocation();

  const listener = ({ data }) => {
    const propsData = JSON.parse(data);
    if (propsData.type === 'myPage') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    if (pathname === '/test/myPage') setProps(myPageProps);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  return (
    <Box css={myPageWrapper}>
      <Box css={imageWrapper}>
        {props && props.user.image ? (
          <img src={props.user.image} alt="" css={profileImage} />
        ) : (
          <DefaultImage css={profileImage} />
        )}
      </Box>
      {props ? (
        <Box css={nameWrapper}>
          <Text className="nickname">{props.user.nickName}</Text>
          <Text className="name">{props.user.name}</Text>
        </Box>
      ) : (
        <>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </>
      )}
      <CustomButton
        css={editButton}
        onClick={() => {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'goEditMyPage' }));
        }}
      >
        프로필 편집
      </CustomButton>

      <Box css={buttonWrapper}>
        <CustomButton>
          <BadgeIcon className="icon" />
          <Text>배지</Text>
        </CustomButton>
        <CustomButton>
          <RunningIconBlue className="icon" />
          <Text>활동</Text>
        </CustomButton>
      </Box>

      <Box css={{ flex: 1 }} />

      <CustomButton
        css={logoutButton}
        onClick={() => {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'logout' }));
        }}
      >
        로그아웃
      </CustomButton>
    </Box>
  );
};

export default MyPage;

const myPageWrapper = css`
  width: calc(100% - 40px);
  height: 100%;
  padding: 0 20px;
  background-image: url('/img/MyPageBackground.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
`;

const imageWrapper = css`
  width: 100%;
  margin-top: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const nameWrapper = css`
  width: 100%;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: text-500;

  .nickname {
    font-weight: 600;
    font-size: 22px;
  }
  .name {
    margin-top: 6px;
    font-size: 18px;
  }
`;

const editButton = css`
  width: 100%;
  height: 48px;
  margin-top: 24px;
  border-radius: 4px;
  background-color: white;
  border: 1px solid #dee9ff;
  color: #1162ff;
  font-size: 18px;
  font-family: text-500;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: white;
  }
`;

const buttonWrapper = css`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  & .MuiButton-root {
    width: 49%;
    height: 111px;
    padding-top: 10px;
    border-radius: 4px;
    background-color: white;
    border: 1px solid #dee9ff;
    color: #1162ff;
    font-size: 18px;
    font-family: text-500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(192, 202, 219, 0.25);
    &:hover {
      background-color: white;
    }
    & p {
      margin-top: 11px;
    }
  }
`;

const logoutButton = css`
  margin-bottom: 58px;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  background-color: #1162ff;
  color: white;
  font-size: 18px;
  font-family: text-500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #1162ff;
  }
`;

const profileImage = css`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
