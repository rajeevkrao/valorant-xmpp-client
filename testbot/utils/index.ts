export const getTokenFromUrl = (url) => {
  const token = url.split("id_token=")[1].split("&")[0];
  return token;
};
