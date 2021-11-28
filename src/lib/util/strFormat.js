export const getDistanceString = (distanceNumber) => {
  const distance = Math.floor(distanceNumber * 10) / 10;
  return distance + 'Km';
};

export const getPaceString = (pace) => {
  const first = Math.floor(pace);
  const second = Math.floor((pace - first) * 100);
  return Math.floor(first + second / 60) + "' " + (second % 60) + '"';
};

export const secondToTimeString = (secondNumber) => {
  const minute = parseInt(((secondNumber / 60) % 60) + '', 10)
    .toString()
    .padStart(2, '0');
  const second = parseInt((secondNumber % 60) + '', 10)
    .toString()
    .padStart(2, '0');
  return minute + ':' + second;
};

export const recordTimeString = (secondNumber) => {
  const hour = parseInt(secondNumber / 60 / 60 + '', 10)
    .toString()
    .padStart(2, '0');
  const minute = parseInt(((secondNumber / 60) % 60) + '', 10)
    .toString()
    .padStart(2, '0');
  const second = parseInt((secondNumber % 60) + '', 10)
    .toString()
    .padStart(2, '0');
  if (secondNumber > 60 * 60) return hour + ':' + minute;
  else return minute + ':' + second;
};

export const getModifiedDateString = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const beforeHour = date.getHours();
  const AMorPM = beforeHour < 12 ? '오전' : '오후';
  var hour = beforeHour < 12 ? beforeHour.toString() : (beforeHour - 12).toString();
  if (AMorPM === '오후' && hour === '0') hour = '12';
  const minute = date.getMinutes();
  return year + '. ' + month + '. ' + day + ' - ' + AMorPM + ' ' + hour + ':' + minute;
};

export const getSelectedWeekNumber = (date) => {
  const getNumberOfWeek = (selected) => {
    const selectedDate = new Date(selected);
    const firstDayOfYear = new Date(selectedDate.getFullYear(), 0, 1);
    const pastDaysOfYear = (selectedDate - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };
  const translateToDate = new Date(date);
  const firstDayOfmonth = new Date(translateToDate.getFullYear(), translateToDate.getMonth(), 1);
  return getNumberOfWeek(date) - getNumberOfWeek(firstDayOfmonth) + 1;
};
