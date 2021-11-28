/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { ReactComponent as DefaultImage } from '../../assets/svgs/DefaultImage.svg';
import CustomButton from '../../components/CustomButton';
import Text from '../../components/Text';
import { useLocation } from 'react-router';

const UploadProfile = () => {
  const [props, setProps] = useState({
    user: {
      name: null,
    },
    nickName: null,
    weight: null,
    height: null,
    accessToken: null,
    image: '',
  });
  const { pathname } = useLocation();

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'uploadProfile') {
      setProps(propsData.value);
    }
  };

  useEffect(() => {
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

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

  return (
    <>
      <Box css={title}>
        <Box>
          <IconButton onClick={handlePrevStep}>
            <LeftBackArrowIcon className="icon" />
          </IconButton>
        </Box>
        <Box>
          <Text className="title">내 정보</Text>
        </Box>
        <Box>
          <CustomButton className="uploadButton" onClick={onUpLoadProfile}>
            완료
          </CustomButton>
        </Box>
      </Box>
      <Box css={uploadProfileWrapper}>
        <Box css={imageWrapper}>
          {!props.image ? (
            <Box css={imageBox}>
              <DefaultImage css={currentImage} />
              <CameraIcon css={cancelImage} onClick={getProfileImage} />
            </Box>
          ) : (
            <Box css={imageBox}>
              <img src={props.image} alt="" css={currentImage} />
              <CameraIcon css={cancelImage} onClick={getProfileImage} />
            </Box>
          )}
        </Box>
        <Box css={item}>
          <Text css={type}>이름</Text>
          <Text css={value}>{props.user.name}</Text>
        </Box>
        <Box css={item}>
          <Text css={type}>닉네임</Text>
          <Text css={value}>{props.nickName}</Text>
        </Box>

        <Text css={bototmTitle}>신체 정보</Text>
        <Box css={item}>
          <Text css={type}>키</Text>
          <Text css={value}>{props.height}</Text>
        </Box>
        <Box css={item}>
          <Text css={type}>몸무게</Text>
          <Text css={value}>{props.weight}</Text>
        </Box>
      </Box>
    </>
  );
};

const title = css`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f5f5f5;
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
    font-size: 18px;
    &:first-child {
      justify-content: flex-start;
    }
    &:last-child {
      color: #bcbcbc;
      font-family: text-500;
      font-weight: 500;
      font-size: 16px;
      justify-content: flex-end;
    }
  }
`;

const uploadProfileWrapper = css`
  padding: 0 20px;
  height: calc(100% - 57px);
`;

const imageWrapper = css`
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const item = css`
  height: 35px;
  width: 100%;
  display: flex;
  border-bottom: 0.6px solid #d4d4d4;
  margin-top: 14px;
  padding-bottom: 8px;
`;

const type = css`
  width: 86px;
  height: 100%;
  display: flex;
  align-items: center;
  color: #82837e;
  font-family: text-500;
  font-weight: 400;
  font-size: 16px;
`;

const value = css`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  color: #333333;
  font-family: text-500;
  font-size: 19px;
`;

const bototmTitle = css`
  color: black;
  font-family: text-500;
  font-size: 16px;
  margin-top: 28px;
  margin-bottom: 30px;
`;

const imageBox = css`
  width: 130px;
  height: 130px;
`;

const currentImage = css`
  width: 130px;
  height: 130px;
  border-radius: 50%;
`;

const cancelImage = css`
  width: 40px;
  height: 40px;
  position: relative;
  top: -45px;
  left: 85px;
  cursor: pointer;
  z-index: 1000;
`;

export default UploadProfile;
