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

export const getModifiedDateString = (date) => {
  const dateToArr = date.toString().split('-');
  const year = dateToArr[0];
  const month = dateToArr[1];
  const day = dateToArr[2].slice(0, 2);
  const beforeHour = parseInt(dateToArr[2].slice(3, 5));
  const AMorPM = beforeHour <= 12 ? '오전' : '오후';
  const hour = beforeHour <= 12 ? beforeHour.toString() : (beforeHour - 12).toString();
  const minute = dateToArr[2].slice(6, 8);
  return year + '. ' + month + '. ' + day + ' - ' + AMorPM + ' ' + hour + ':' + minute;
};
