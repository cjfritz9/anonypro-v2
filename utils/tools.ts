export const formatNumber = (baseNumber: number) => {
  const stringNum = baseNumber.toString();

  if (stringNum.length < 4) {
    return baseNumber.toLocaleString();
  } else if (stringNum.length < 7) {
    return stringNum.slice(0, stringNum.length - 3) + 'k';
  } else if (stringNum.length < 10) {
    return (
      stringNum.slice(0, stringNum.length - 6) +
      '.' +
      stringNum.charAt(1) +
      'M'
    );
  } else if (stringNum.length < 13) {
    return (
      stringNum.slice(0, stringNum.length - 9) +
      '.' +
      stringNum.charAt(1) +
      'B'
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