export function isEmail(asValue) {
  var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(asValue);
}

export function isNickName(asValue) {
  var regExp = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,10}$/;
  return regExp.test(asValue);
}
