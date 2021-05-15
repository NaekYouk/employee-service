const SESSION_DATA_KEY = "session_data";

export const deleteSessionData = () => {
  localStorage.removeItem(SESSION_DATA_KEY);
};

export const setSessionData = (value) => {
  localStorage.setItem(SESSION_DATA_KEY, JSON.stringify(value));
};

export const getSessionData = () => {
  return JSON.parse(localStorage.getItem(SESSION_DATA_KEY));
};
