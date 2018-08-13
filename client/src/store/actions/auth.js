import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCmck9Wti6UuM_5zuj1uTc1vKUMS7Wq9ak';
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCmck9Wti6UuM_5zuj1uTc1vKUMS7Wq9ak';
    }
    axios.post(url, authData)
    .then(response => {
      console.log(response);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error));
    });
  };
};