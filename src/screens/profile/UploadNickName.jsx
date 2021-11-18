/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, TextField, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { ReactComponent as LeftBackArrowIcon } from '../../assets/svgs/LeftBackArrowIcon.svg';
import CustomButton from '../../components/CustomButton';
import { useLocation } from 'react-router';
import { isNickName } from '../../lib/util/validate';
import ReactLoading from 'react-loading';

const UploadNickName = () => {
  const [nickName, setNickName] = useState('');
  const [props, setProps] = useState({ isUniqueNickName: false });
  const [nickNameError, setNickNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'uploadNickName') {
      setProps(propsData.value);
      setLoading(false);
    }
  };

  const onUploadNickName = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: 'uploadNickName', value: nickName }),
    );
  };

  const onCheckNickName = async () => {
    setLoading(true);
    if (pathname === '/test/uploadNickName') {
      setProps({ isUniqueNickName: isNickName(nickName) });
      setLoading(false);
    } else
      await window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'checkNickName', value: nickName }),
      );
  };

  const handlePrevStep = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'handlePrevStep' }));
  };

  const handleNextStep = () => {
    onUploadNickName();
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'handleNextStep' }));
  };

  const handleChange = (e) => {
    setProps({ isUniqueNickName: false });
    if (e.target.value.length === 0) {
      setNickNameError(true);
      setNickName('');
      return;
    }
    if (!isNickName(e.target.value)) {
      setNickNameError(true);
    } else {
      setNickNameError(false);
    }
    setNickName(e.target.value);
  };

  useEffect(() => {
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  return (
    <>
      <Box css={title}>
        <IconButton onClick={handlePrevStep}>
          <LeftBackArrowIcon />
        </IconButton>
      </Box>
      <Box css={uploadNickNameWrapper}>
        <Box css={discription}>
          <Box>모여런에서 사용할 </Box>
          <Box>닉네임을 등록해주세요.</Box>
        </Box>

        <Box>
          <Box css={typeTypo}>닉네임</Box>
          <TextField
            label={nickNameError && '2~10자리 공백제외 한글 영어를 섞어서 작성해주세요'}
            error={nickNameError}
            css={inputForm}
            value={nickName}
            onChange={handleChange}
          />
        </Box>
        <CustomButton
          css={button}
          disabled={props.isUniqueNickName || loading || nickNameError}
          onClick={onCheckNickName}
        >
          {loading ? (
            <ReactLoading type="spinningBubbles" color="white" width="20px" height="20px" />
          ) : (
            '닉네임 중복 확인'
          )}
        </CustomButton>
        <CustomButton css={button} disabled={!props.isUniqueNickName} onClick={handleNextStep}>
          다음
        </CustomButton>
      </Box>
    </>
  );
};

export default UploadNickName;

const title = css`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f5f5f5;
  &.MuiBox-root {
    flex: 1;
  }
`;

const uploadNickNameWrapper = css`
  padding: 0 20px;
  height: calc(100% - 57px);
`;

const discription = css`
  font-family: text-500;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  padding: 22px 0px 22px 0px;
`;
const typeTypo = css`
  font-family: text-500;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: #c4c4c4;
  margin-top: 17px;
`;

const inputForm = css`
  border: 1px solid #d4d4d4;
  box-sizing: border-box;
  border-radius: 2px;
  width: 100%;
  font-family: text-500;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  border-radius: 2px;
  color: #333333;
  margin-top: 10px;
  min-height: 48px;
  display: flex;
  justify-content: start;
`;

const button = css`
  width: 100%;
  padding: 16px;
  font-family: text-500;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  background-color: #1162ff;
  margin-top: 40px;
  &:hover {
    background-color: #1162ff;
  }
  &:disabled {
    background-color: #c4c4c4;
    color: white;
  }
`;
