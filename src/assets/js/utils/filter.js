import Vue from 'vue';

Vue.filter('format2MiddleLangTypeDate', date => {
  if (!date) return '';
  const _arr = date.split('T');
  const [t1, t2s] = _arr;
  const t2 = t2s.split('.')[0].slice(0, -3);
  return `${t1}  ${t2}`;
});

Vue.filter('numToFixed2', num => {
  console.log(num);
  if (!num && num !== 0) return '';
  return num.toFixed(2);
});
