import store from '../../../store';

export function isNumber(val) {
  return /^[0-9]+.?[0-9]*$/.test(val);
}

const { UnitTypeList } = store.state.common;
export function getUnit(unitID) {
  const _target = UnitTypeList.find(it => it.value === unitID);
  if (!_target) return '';
  return _target.label;
}

export function handleSelect(e) {
  e.target.select();
}

export function delay(duration) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export function animateScroll(start, end, callback) {
  let num = start;
  const tick = 16; // 每隔16毫秒完成一次变化
  const total = 300;
  const times = Math.ceil(total / tick); // 变化的次数
  let curTimes = 0;
  const dis = (end - start) / times; // 总距离/次数，每次运动的距离
  const timer = setInterval(() => {
    curTimes += 1;
    num += dis;
    if (curTimes === times) {
      num = end;
      clearInterval(timer);
    }
    callback(num);
  }, tick);
  return timer;
}

export function extname(filename) {
  if (!filename || typeof filename !== 'string') {
    return '未知类型';
  }
  const a = filename.split('').reverse().join('');
  const b = a.substring(0, a.search(/\./)).split('').reverse().join('');
  return b;
}

export default {
  isNumber,
  getUnit,
  handleSelect,
  delay,
  animateScroll,
  extname,
};
