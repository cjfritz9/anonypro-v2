export const formatNumber = (baseNumber: number) => {
  const stringNum = baseNumber.toString();

  if (stringNum.length < 4) {
    return baseNumber.toLocaleString();
  } else if (stringNum.length < 7) {
    return stringNum.slice(0, stringNum.length - 3) + 'k';
  } else if (stringNum.length < 10) {
    return (
      stringNum.slice(0, stringNum.length - 6) + '.' + stringNum.charAt(1) + 'M'
    );
  } else if (stringNum.length < 13) {
    return (
      stringNum.slice(0, stringNum.length - 9) + '.' + stringNum.charAt(1) + 'B'
    );
  } else {
    return (
      stringNum.slice(0, stringNum.length - 12) +
      '.' +
      stringNum.charAt(1) +
      'T'
    );
  }
};

export const isRateLimited = () => {
  const key = 'last-req';
  const lastReq = localStorage.getItem(key);

  if (!lastReq) {
    localStorage.setItem(key, JSON.stringify(new Date()));
    return { isLimited: false, remainder: 0 };
  }

  const currentTime = new Date().getTime();
  const lastReqTime = new Date(JSON.parse(lastReq)).getTime();
  const diff = 60 - Math.ceil(currentTime / 1000 - lastReqTime / 1000);

  if (currentTime - 60000 >= lastReqTime) {
    localStorage.setItem(key, JSON.stringify(new Date()));
    return { isLimited: false, remainder: 0 };
  }

  return { isLimited: true, remainder: diff };
};

export const isBoostLimited = () => {
  const key = 'last-req-boost';
  const lastReq = localStorage.getItem(key);

  if (!lastReq) {
    localStorage.setItem(key, JSON.stringify(new Date()));
    return { isLimited: false, remainder: 0 }
  }

  const currentTime = new Date().getTime();
  const lastReqTime = new Date(JSON.parse(lastReq)).getTime();
  const diff = 86400 - Math.ceil(currentTime / 1000 - lastReqTime / 1000);

  if (currentTime - 86400000 >= lastReqTime) {
    localStorage.setItem(key, JSON.stringify(new Date()));
    return { isLimited: false, remainder: 0 };
  }

  return { isLimited: true, remainder: diff };
};
