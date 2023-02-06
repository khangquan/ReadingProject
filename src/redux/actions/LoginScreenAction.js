import { IS_LOGGING, APP_LOGIN, APP_LOGOUT } from "../../defines/ActionTypes"

export const appLogin = param => {
  return (dispatch) => {
    dispatch({ type: IS_LOGGING });

    setTimeout(() => {
      dispatch({
        type: APP_LOGIN,
        payload: param
      });
    }, 1000);
  };
};

export const appLogout = () => ({
  type: APP_LOGOUT,
})
