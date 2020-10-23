const Cookie = {
  setCookie(key, value, t) {
    document.cookie = `${key}=${value};max-age=${t}`;
  },
  removeCookie(name) {
    this.setCookie(name, '', -1);
  },
  // eslint-disable-next-line consistent-return
  getCookie(key) {
    const arr1 = document.cookie.split('; ');
    for (let i = 0; i < arr1.length; i += 1) {
      const arr2 = arr1[i].split('=');
      if (arr2[0] === key) {
        return decodeURI(arr2[1]);
      }
    }
  },
};

export default Cookie;
