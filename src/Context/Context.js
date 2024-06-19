const isLocal = false;

const Context = isLocal
  ? ""
  : "https://groomerapp-e1f70ad38863.herokuapp.com";

const SALON_TOKEN = "salon_token";

export const setToken = (token) => {
  sessionStorage.setItem(SALON_TOKEN, token);
};

export const removeToken = () => {
  sessionStorage.removeItem(SALON_TOKEN);
};

export const getToken = () => {
  let token = sessionStorage.getItem(SALON_TOKEN);
  return token;
};
export default Context;
