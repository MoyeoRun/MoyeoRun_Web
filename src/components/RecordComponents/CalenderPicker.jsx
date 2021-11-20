/** @jsxImportSource @emotion/react */
import { Dialog } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import PickersDay, { pickersDayClasses } from '@mui/lab/PickersDay';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import { add, sub } from 'date-fns';

const CustomCalendar = ({ getSelectedWeekRecords }) => {
  const [value, setValue] = useState(new Date());
  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    // const start = value || new Date();
    // const end = add(new Date(value), {
    //   days: 6,
    // });
    const start = sub(new Date(value), { days: 6 });
    const end = value || new Date();

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        sx={{
          [`&&.${pickersDayClasses.selected}`]: {
            borderRadius: `0 50% 50% 0`,
            backgroundColor: '#0047D0',
            color: 'white',
          },
          [`&&.${pickersDayClasses.isFirstDay}`]: {
            borderRadius: `0 50% 50% 0`,
            backgroundColor: '#0047D0',
            color: 'white',
          },
        }}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        label="Week picker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          getSelectedWeekRecords(newValue);
          console.log(value, newValue);
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="'Week of' MMM d"
      />
    </LocalizationProvider>
  );
};

const CalenderPicker = ({ open, handleClose, getSelectedWeekRecords }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <CustomCalendar getSelectedWeekRecords={getSelectedWeekRecords} />
    </Dialog>
  );
};

export default CalenderPicker;

//styled(Component, [options])(styles) => Component
const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ dayIsBetween, isFirstDay, isLastDay, selected }) => ({
  // ...(selected && {
  //   borderTopRightRadius: '50%',
  //   borderBottomRightRadius: '50%',
  //   backgroundColor: '#0047D0',
  //   color: 'white',
  // }),
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: `rgba(17, 98, 255, 0.1)`,
    color: '#1162FF',
    '&:hover, &:focus': {
      backgroundColor: '#0047D0',
      color: 'white',
    },
  }),
  // ...(isLastDay && {
  //   borderTopRightRadius: '50%',
  //   borderBottomRightRadius: '50%',
  //   backgroundColor: '#0047D0',
  //   color: 'white',
  // }),
  ...(isFirstDay && {
    borderRadius: 0,
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    backgroundColor: '#0047D0',
    color: 'white',
  }),
}));
