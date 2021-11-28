/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, IconButton, Skeleton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { ReactComponent as LeftBackArrowIcon } from '../../assets/svgs/LeftBackArrowIcon.svg';
import { ReactComponent as CameraGrayIcon } from '../../assets/svgs/CameraGrayIcon.svg';
import { ReactComponent as DefaultImage } from '../../assets/svgs/DefaultImage.svg';
import CustomButton from '../../components/CustomButton';
import Text from '../../components/Text';
import editMyPageProps from '../../testData/editMyPageProps';
import { useLocation } from 'react-router';

const EditMyPage = () => {
  const [props, setProps] = useState(null);
  const { pathname } = useLocation();

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'editMyPage') {
      setProps(propsData.value);
    }
  };

  const handlePrevStep = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'handlePrevStep' }));
  };

  const onUpLoadProfile = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'uploadProfile' }));
  };

  const getProfileImage = async () => {
    if (pathname === '/test/uploadProfile') {
      setProps({
        ...props,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/200px-React-icon.svg.png',
      });
      return;
    }
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'getProfileImage' }));
  };

  useEffect(() => {
    if (pathname === '/test/editMyPage') setProps(editMyPageProps);
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  return (
    <Box css={EditMyPageWrapper}>
      <Box css={title}>
        <Box>
          <IconButton
            onClick={() => {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'goMyPage' }));
            }}
          >
            <LeftBackArrowIcon className="icon" />
          </IconButton>
        </Box>
        <Box>
          <Text className="title">프로필</Text>
        </Box>
        <Box></Box>
      </Box>
      <Box css={imageWrapper}>
        {props && props.user.image ? (
          <Box css={imageBox}>
            <img src={props.user.image} alt="" css={currentImage} />
            <CameraGrayIcon css={cancelImage} onClick={getProfileImage} />
          </Box>
        ) : (
          <Box css={imageBox}>
            <DefaultImage css={currentImage} />
            <CameraGrayIcon css={cancelImage} onClick={getProfileImage} />
          </Box>
        )}
      </Box>
      <Box css={item}>
        <Text css={type}>이름</Text>
        {props ? (
          <TextField size="small" css={value} value={props.user.name} />
        ) : (
          <Skeleton variant="text" />
        )}
      </Box>
      <Box css={item}>
        <Text css={type}>닉네임</Text>
        {props ? (
          <TextField size="small" css={value} value={props.user.nickName} />
        ) : (
          <Skeleton variant="text" />
        )}
      </Box>

      <Text css={bototmTitle}>신체 정보</Text>
      <Box css={item}>
        <Text css={type}>키</Text>
        {props ? (
          <TextField size="small" css={value} value={props.user.height} />
        ) : (
          <Skeleton variant="text" />
        )}
      </Box>
      <Box css={item}>
        <Text css={type}>몸무게</Text>
        {props ? (
          <TextField size="small" css={value} value={props.user.weight} />
        ) : (
          <Skeleton variant="text" />
        )}
      </Box>

      <Box css={{ flex: 1 }} />

      <CustomButton
        css={confirmButton}
        onClick={() => {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: 'editMyPage', value: props.user }),
          );
        }}
      >
        완료
      </CustomButton>
    </Box>
  );
};

export default EditMyPage;

const EditMyPageWrapper = css`
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

const title = css`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  .uploadButton {
    background: white;
    color: #1162ff;
  }
  & .MuiBox-root {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: black;
    font-family: text-500;
    font-weight: 600;
    font-size: 22px;
    &:first-child {
      justify-content: flex-start;
    }
  }
`;

const imageWrapper = css`
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const item = css`
  width: 100%;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
`;

const type = css`
  color: #000000;
  font-family: text-500;
  font-size: 16px;
`;

const value = css`
  width: 100%;
  margin-top: 9px;
  background: #ffffff;
  border-radius: 4px;
  border: none;
  outline: none;
  & input {
    color: #333333;
    font-family: text-500;
    font-size: 18px;
  }
  & label.Mui-focused {
    color: transparent !important;
  }
  & .MuiInput-underline:after {
    border-bottom-color: transparent !important;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: transparent !important;
    }
    &:hover fieldset {
      border-color: transparent !important;
    }
    &.Mui-focused fieldset {
      border-color: #1162ff !important;
    }
  }
`;

const bototmTitle = css`
  font-family: text-500;
  font-size: 16px;
  margin-top: 26px;
  margin-bottom: 8px;
`;

const imageBox = css`
  width: 72px;
  height: 72px;
`;

const currentImage = css`
  width: 72px;
  height: 72px;
  border-radius: 50%;
`;

const cancelImage = css`
  width: 23px;
  height: 23px;
  position: relative;
  top: -26px;
  left: 48px;
  cursor: pointer;
  z-index: 1000;
`;

const confirmButton = css`
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
