const isValidUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const getUrlFromString = (str) => {
  if (isValidUrl(str)) {
    return str;
  } else {
    throw new Error("Invalid URL");
  }
};