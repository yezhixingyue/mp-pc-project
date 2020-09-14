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

export default {
  isNumber,
  getUnit,
  handleSelect,
  delay,
};
