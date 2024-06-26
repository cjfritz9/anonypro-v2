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
  const diff = 10 - Math.ceil(currentTime / 1000 - lastReqTime / 1000);

  if (diff <= 0) {
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
    return { isLimited: false, remainder: 0 };
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

export const toDisplayCategory = (category: string) => {
  return '#' + category.replaceAll('-', ' ').toUpperCase();
};

export const validateContactForm = ({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { isValid: boolean; message: string } => {
  if (name.length === 0) {
    return {
      isValid: false,
      message: 'Please enter your name',
    };
  }

  if (email.length === 0) {
    return {
      isValid: false,
      message: 'Please enter your Email',
    };
  }

  if (message.length === 0) {
    return {
      isValid: false,
      message: 'Please enter a message',
    };
  }

  return {
    isValid: true,
    message: 'Your message has been sent',
  };
};

export const slugToMetaTitle = (slug: string) => {
  return slug
    .split('-')
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(' ');
};

export const titlesToMetaTitle = (title: string[]) => {
  return title.join(', ');
};

export const toShortenedName = (name: string) => {
  if (name.length > 15) {
    return name.replace(name.slice(name.indexOf(' ') + 2), '.');
  } else {
    return name;
  }
};

export const getFavorites = () => {
  const savedFavorites = localStorage.getItem('favorites');

  if (savedFavorites) {
    const favorites = JSON.parse(savedFavorites) as string[];
    if (Array.isArray(favorites)) {
      return favorites;
    }
  }
  return null;
};

export const addToFavorites = (username: string) => {
  const savedFavorites = localStorage.getItem('favorites');
  if (savedFavorites) {
    const favorites = JSON.parse(savedFavorites) as string[];
    if (!favorites.includes(username)) {
      localStorage.setItem(
        'favorites',
        JSON.stringify([username, ...favorites])
      );
    }
  } else {
    localStorage.setItem('favorites', JSON.stringify([username]));
  }
};

export const removeFavorite = (username: string) => {
  const favorites = getFavorites();

  if (favorites) {
    localStorage.setItem(
      'favorites',
      JSON.stringify(
        favorites.filter((savedUsername) => savedUsername !== username)
      )
    );
  }
};
