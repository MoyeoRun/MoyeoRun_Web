/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReactComponent as LeftBackArrowIcon } from '../assets/svgs/LeftBackArrowIcon.svg';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/MakeRoomComponents/CustomInput';
import DialogSelect from '../components/MakeRoomComponents/DialogSelect';

const numberSelectItems = (numRange, increProp = 1) => {
  let { min, max } = numRange;
  const numList = [];
  let itemValue = 0;

  if (min > max) {
    [min, max] = [max, min];
  }
  const [cMin, cMax] = [Math.floor(min), Math.floor(max)];

  let steps = 0;
  if (increProp === 1) {
    steps = cMax - cMin + 1;
  } else {
    steps = Math.floor((cMax - cMin) / increProp) + 1;
  }

  for (let i = 1; i < steps; i++) {
    itemValue += increProp;
    numList.push({ label: `${itemValue}`, value: itemValue });
  }

  return numList;
};

const stringSelectItems = (strRange) => {
  const strList = [];

  let steps = strRange.length;

  for (let i = 0; i < steps; i++) {
    let itemValue = strRange[i];
    strList.push({ label: `${itemValue}`, value: itemValue });
  }

  return strList;
};

const getSelectItems = (pickOption) => {
  let selectList = [];
  if (pickOption.strRange) {
    selectList = stringSelectItems(pickOption.strRange);
  } else if (pickOption.numRange) {
    selectList = numberSelectItems(pickOption.numRange, pickOption.increProp);
  }
  return selectList;
};

const getShowingValue = (value) => {
  return value.map(
    (item) => `${item.value || ''}${item.inputLabel && item.value ? item.inputLabel : ''}`,
  );
};

//numberInputPicker 초기 state 설정

const InitValue = {
  startTime: [
    { id: 'start/slot', value: '', inputLabel: ' ' },
    { id: 'start/hour', value: '', inputLabel: ':' },
    { id: 'start/minute', value: '' },
  ],
  distance: [
    { id: 'distance/km', value: '', inputLabel: '.' },
    { id: 'distance/m', value: '', inputLabel: ' km' },
  ],
  timeLimit: [
    { id: 'limit/hour', value: '', inputLabel: '시간 ' },
    { id: 'limit/minute', value: '', inputLabel: '분' },
  ],
  participants: [{ id: 'participants/number', value: '', inputLabel: '명' }],
};

const InitpickOptions = {
  startTime: [
    { id: 'start/slot', placeholder: '', strRange: ['오전', '오후'] },
    { id: 'start/hour', placeholder: '시', numRange: { min: 0, max: 12 } },
    { id: 'start/minute', placeholder: '분', increProp: 5, numRange: { min: 0, max: 59 } },
  ],
  distance: [
    { id: 'distance/km', placeholder: '.', numRange: { min: 0, max: 50 } },
    { id: 'distance/m', placeholder: 'km', numRange: { min: 0, max: 9 } },
  ],
  timeLimit: [
    { id: 'limit/hour', placeholder: '시간', numRange: { min: 0, max: 5 } },
    { id: 'limit/minute', placeholder: '분', increProp: 5, numRange: { min: 0, max: 59 } },
  ],
  participants: [{ id: 'participants/number', placeholder: '명', numRange: { min: 0, max: 30 } }],
};

const SelectItems = {
  startTime: [],
  distance: [],
  timeLimit: [],
  participants: [],
};

const MakeRoom = () => {
  const [props, setProps] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [discription, setDiscription] = useState('');
  const [timeLimit, setTimeLimit] = useState(InitValue.timeLimit);
  const [distance, setDistance] = useState(InitValue.distance);
  const [startTime, setStartTime] = useState(InitValue.startTime);
  const [participants, setParticipants] = useState(InitValue.participants);
  const [open, setOpen] = useState({
    startTime: false,
    distance: false,
    timeLimit: false,
    participants: false,
  });
  const [selectItem, setSelectItem] = useState({
    startTime: [],
    distance: [],
    timeLimit: [],
    participants: [],
  });
  const placeholder = {
    name: `방 이름을 입력해주세요.\n(ex. 자유롭게 5km 뛰어요)`,
    disc: `방을 설명할 정보를 입력해주세요.\n(ex. 30분 안에 5km 뛰기)`,
  };
  const listener = (data) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'makeRoom') {
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

  useEffect(() => {
    //셀렉트창에 옵션 정보를 보내주기 위해 위에 함수들을 거쳐 선택 옵션들을 만들어주고 상태값으로 저장
    let temp = [];
    for (let type of Object.keys(InitpickOptions)) {
      temp = InitpickOptions[type].map((option) => ({
        id: option.id,
        ...getSelectItems(option),
      }));
      SelectItems[type] = temp;
    }
    setSelectItem(SelectItems);
  }),
    [];

  const handleClickOpen = (type) => {
    setOpen({ ...open, [type]: true });
  };
  const handleClose = (type) => {
    setOpen({ ...open, [type]: false });
  };

  return (
    <>
      <Box css={makeRoomWrapper}>
        <Box css={backButton}>
          <LeftBackArrowIcon />
        </Box>

        <Box>
          <Box css={typeTypo}>방이름</Box>
          <CustomInput value={roomName} setValue={setRoomName} placeholder={placeholder.name} />
        </Box>

        <Box>
          <Box css={typeTypo}>설명(선택)</Box>
          <CustomInput
            value={discription}
            setValue={setDiscription}
            placeholder={placeholder.disc}
          />
        </Box>
        <Box>
          <Box css={typeTypo}>시작시간</Box>
          <CustomButton css={inputForm} onClick={() => handleClickOpen('startTime')}>
            {getShowingValue(startTime)}
          </CustomButton>
          {open.startTime && (
            <DialogSelect
              type="startTime"
              open={open.startTime}
              value={startTime}
              setValue={setStartTime}
              selectItems={selectItem.startTime}
              handleClose={handleClose}
            />
          )}
        </Box>
        <Box>
          <Box css={typeTypo}>목표거리</Box>
          <CustomButton css={inputForm} onClick={() => handleClickOpen('distance')}>
            {getShowingValue(distance)}
          </CustomButton>
          {open.distance && (
            <DialogSelect
              type="distance"
              open={open.distance}
              value={distance}
              setValue={setDistance}
              selectItems={selectItem.distance}
              handleClose={handleClose}
            />
          )}
        </Box>
        <Box>
          <Box css={typeTypo}>제한시간</Box>
          <CustomButton css={inputForm} onClick={() => handleClickOpen('timeLimit')}>
            {getShowingValue(timeLimit)}
          </CustomButton>
          {open.timeLimit && (
            <DialogSelect
              type="timeLimit"
              open={open.timeLimit}
              value={timeLimit}
              setValue={setTimeLimit}
              selectItems={selectItem.timeLimit}
              handleClose={handleClose}
            />
          )}
        </Box>
        <Box>
          <Box css={typeTypo}>제한인원</Box>
          <CustomButton css={inputForm} onClick={() => handleClickOpen('participants')}>
            {getShowingValue(participants)}
          </CustomButton>
          {open.participants && (
            <DialogSelect
              type="participants"
              open={open.participants}
              value={participants}
              setValue={setParticipants}
              selectItems={selectItem.participants}
              handleClose={handleClose}
            />
          )}
        </Box>
        <CustomButton
          css={button}
          disabled={
            !roomName ||
            !!startTime.filter((item) => !item.value).length ||
            !!distance.filter((item) => !item.value).length ||
            !!timeLimit.filter((item) => !item.value).length ||
            !!participants.filter((item) => !item.value).length
          }
        >
          방만들기
        </CustomButton>
      </Box>
    </>
  );
};
export default MakeRoom;

const makeRoomWrapper = css`
  padding: 20px 20px 88px 20px;
`;
const backButton = css`
  margin-top: 60px;
`;

const typeTypo = css`
  font-family: Apple SD Gothic Neo;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.04em;
  text-align: left;
  margin-top: 25px;
`;
const inputForm = css`
  border: 1px solid #d4d4d4;
  box-sizing: border-box;
  border-radius: 2px;
  width: 100%;
  font-family: Apple SD Gothic Neo;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  padding: 15px;
  border-radius: 2px;
  color: #333333;
  margin-top: 10px;
  min-height: 48px;
  display: flex;
  justify-content: start;
`;

const button = css`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 88px;
  padding: 16px;
  font-family: Apple SD Gothic Neo;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  background-color: #1162ff;
  margin-top: 40px;
  border-radius: 0;
  &:hover {
    background-color: #1162ff;
  }

  &:disabled {
    background-color: #c4c4c4;
    &:hover {
      background-color: #c4c4c4;
    }
  }
`;
