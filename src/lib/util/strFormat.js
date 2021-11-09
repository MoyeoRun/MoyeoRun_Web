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
  const hour = parseInt(secondNumber / 60 / 60 + '', 10)
    .toString()
    .padStart(2, '0');
  const minute = parseInt(((secondNumber / 60) % 60) + '', 10)
    .toString()
    .padStart(2, '0');
  const second = parseInt((secondNumber % 60) + '', 10)
    .toString()
    .padStart(2, '0');
  return hour + ':' + minute + ':' + second;
};

export const recordTimeString = (secondNumber) => {
  const minute = parseInt(((secondNumber / 60) % 60) + '', 10)
    .toString()
    .padStart(2, '0');
  const second = parseInt((secondNumber % 60) + '', 10)
    .toString()
    .padStart(2, '0');
  return minute + ':' + second;
};
