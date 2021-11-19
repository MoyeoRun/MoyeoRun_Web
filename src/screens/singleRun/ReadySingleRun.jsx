/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Dialog, IconButton, MenuItem, MenuList, Slide } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { ReactComponent as LeftIcon } from '../../assets/svgs/LeftIcon.svg';
import { ReactComponent as BottomArrowIcon } from '../../assets/svgs/BottomArrowIcon.svg';
import { ReactComponent as CheckIcon } from '../../assets/svgs/CheckIcon.svg';
import CustomButton from '../../components/CustomButton';
import Text from '../../components/Text';
import { secondToTimeString } from '../../lib/util/strFormat';
import { NaverMap } from 'react-naver-maps';
import DialogSelect from '../../components/MakeRoomComponents/DialogSelect';

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

  itemValue = min;
  for (let i = 0; i < steps; i++) {
    numList.push({ label: `${itemValue}`, value: itemValue });
    itemValue += increProp;
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

const InitValue = {
  distance: [
    { id: 'distance/km', value: '1', inputLabel: '.' },
    { id: 'distance/m', value: '0', inputLabel: ' km' },
  ],
  targetTime: [
    { id: 'limit/hour', value: '1', inputLabel: '시간 ' },
    { id: 'limit/minute', value: '30', inputLabel: '분' },
  ],
};

const InitpickOptions = {
  distance: [
    { id: 'distance/km', placeholder: '.', numRange: { min: 0, max: 50 } },
    { id: 'distance/m', placeholder: 'km', numRange: { min: 0, max: 9 } },
  ],
  targetTime: [
    { id: 'limit/hour', placeholder: '시간', numRange: { min: 0, max: 5 } },
    { id: 'limit/minute', placeholder: '분', increProp: 5, numRange: { min: 0, max: 59 } },
  ],
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReadySingleRun = () => {
  const [props, setProps] = useState(null);
  const [distance, setDistance] = useState(InitValue.distance);
  const [targetTime, setTargetTime] = useState(InitValue.targetTime);
  const [selectItem, setSelectItem] = useState({
    targetTime: [],
    distance: [],
  });
  const selectItems = {
    targetTime: [],
    distance: [],
  };

  const [select, setSelect] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState({
    targetTime: false,
    distance: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const listener = ({ data }) => {
    if (typeof data !== 'string') return;
    const propsData = JSON.parse(data);
    if (propsData.type === 'readySingleRun') {
      setProps(propsData.value);
    }
  };

  const handleStart = () => {
    switch (select) {
      case 0:
        window.ReactNativeWebView.postMessage(JSON.stringify({ key: 'startFreeRun' }));
        break;
      case 1:
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            key: 'startFreeRun',
            value: {
              key: select,
              value:
                (parseInt(targetTime[0].value) * 60 + parseInt(targetTime[1].value)) * 60 * 1000,
            },
          }),
        );
        break;
      case 2:
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            key: 'startFreeRun',
            value: {
              key: select,
              value: parseInt(distance[0].value) + parseInt(distance[1].value) * 0.1,
            },
          }),
        );
        break;
    }
  };

  const handleSelectOpen = (type) => {
    setSelectOpen({ ...selectOpen, [type]: true });
  };
  const handleSelectClose = (type) => {
    setSelectOpen({ ...selectOpen, [type]: false });
  };

  useEffect(() => {
    let temp = [];
    for (let type of Object.keys(InitpickOptions)) {
      temp = InitpickOptions[type].map((option) => ({
        id: option.id,
        ...getSelectItems(option),
      }));
      selectItems[type] = temp;
    }
    setSelectItem(selectItems);
  }, []);

  useEffect(() => {
    document.addEventListener('message', listener);
    window.addEventListener('message', listener);

    return () => {
      document.removeEventListener('message', listener);
      window.removeEventListener('message', listener);
    };
  }, []);

  return (
    <Box css={readySingleRunWrapper}>
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'}
        css={css`
          width: 100%;
          height: 100%;
          position: absolute !important;
          z-index: -1;
          &:focus-visible {
            outline: none;
          }
        `}
        mapTypes={
          new window.naver.maps.MapTypeRegistry({
            normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
          })
        }
        defaultZoom={15}
        defaultCenter={{
          lat: 37.51977586326575,
          lng: 127.06283169005788,
        }}
      ></NaverMap>
      <Box css={topWrapper}>
        <LeftIcon
          className="icon"
          onClick={() => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'goBack' }));
          }}
        />
        <Text className="text">자유 달리기</Text>
      </Box>
      {select === 0 && (
        <>
          <Text
            css={css`
              margin-top: 125px;
              margin-bottom: 75px;
              font-family: test-500;
              font-weight: 600;
              font-size: 32px;
            `}
          >
            자유롭게 달려요!
          </Text>
        </>
      )}
      {select === 1 && (
        <>
          <CustomButton
            css={inputForm}
            onClick={() => {
              handleSelectOpen('targetTime');
            }}
          >
            {getShowingValue(targetTime)}
          </CustomButton>
          {selectOpen.targetTime && (
            <DialogSelect
              type="targetTime"
              open={selectOpen.targetTime}
              value={targetTime}
              setValue={setTargetTime}
              selectItems={selectItem.targetTime}
              handleClose={handleSelectClose}
            />
          )}
          <Text css={description}>시간</Text>
        </>
      )}
      {select === 2 && (
        <>
          <CustomButton
            css={inputForm}
            onClick={() => {
              handleSelectOpen('distance');
            }}
          >
            {getShowingValue(distance)}
          </CustomButton>
          {selectOpen.distance && (
            <DialogSelect
              type="distance"
              open={selectOpen.distance}
              value={distance}
              setValue={setDistance}
              selectItems={selectItem.distance}
              handleClose={handleSelectClose}
            />
          )}
          <Text css={description}>킬로미터</Text>
        </>
      )}

      <CustomButton css={selectButton} onClick={handleClickOpen}>
        {select === 0 && '자유'}
        {select === 1 && '시간'}
        {select === 2 && '거리'}
        <BottomArrowIcon className="icon" />
      </CustomButton>
      <Dialog TransitionComponent={Transition} open={open} onClose={handleClose}>
        <MenuList css={makeRoomWrapper}>
          <MenuItem
            className="item"
            onClick={() => {
              setSelect(0);
              handleClose();
            }}
          >
            <Text className="title">자유</Text>
            {select === 0 && <CheckIcon className="icon" />}
          </MenuItem>
          <MenuItem
            className="item"
            onClick={() => {
              setSelect(1);
              handleClose();
            }}
          >
            <Text className="title">시간</Text>
            {select === 1 && <CheckIcon className="icon" />}
          </MenuItem>
          <MenuItem
            className="item"
            onClick={() => {
              setSelect(2);
              handleClose();
            }}
          >
            <Text className="title">거리</Text>
            {select === 2 && <CheckIcon className="icon" />}
          </MenuItem>
        </MenuList>
      </Dialog>
      <Box css={{ flex: 1 }}></Box>
      <IconButton css={operationButton} onClick={handleStart}>
        시작
      </IconButton>
      <Box css={{ flex: 1 }}></Box>
    </Box>
  );
};

export default ReadySingleRun;

const readySingleRunWrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: radial-gradient(
    78.92% 37.59% at 50.13% 40.86%,
    rgba(255, 255, 255, 0) 26.75%,
    #ffffff 89.49%
  );
`;

const topWrapper = css`
  width: calc(100% - 23px);
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 23px;
  .icon {
    height: 32px;
  }
  .text {
    font-family: text-500;
    font-weight: 600;
    font-size: 24px;
    letter-spacing: -0.045em;
    color: #333333;
    margin-left: 15px;
  }
`;

const inputForm = css`
  margin-top: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 2px;
  width: 100%;
  font-family: text-500;
  font-size: 69px;
  color: #111111;
`;

const description = css`
  margin-top: 18px;
  font-family: text-500;
  font-size: 20px;
  color: rgba(85, 85, 85, 0.8);
`;

const selectButton = css`
  width: 100px;
  height: 40px;
  margin-top: 70px;
  background: white;
  border-radius: 32px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  &:hover {
    background: white;
  }
  .icon {
    margin-left: 9px;
  }
`;

const makeRoomWrapper = css`
  position: fixed;
  width: calc(100% - 54px);
  height: 317px;
  bottom: 0px;
  left: 0;
  background: white;
  border-radius: 12px 12px 0 0;
  padding: 40px 27px;
  display: flex;
  flex-direction: column;

  .item + .item {
    border-top: 1px solid #d1d1d6;
  }

  .item {
    width: 100%;
    height: 82px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & + & {
      border-top: 1px solid #d1d1d6;
    }
    .title {
      font-family: text-500;
      font-size: 24px;
      color: #505050;
    }
    .icon {
    }
  }
`;

const operationButton = css`
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background-color: #1162ff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: text-500;
  font-size: 30px;
  &:hover {
    background-color: #1162ff;
  }
`;
