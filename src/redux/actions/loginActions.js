// loginActions.js
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actionTypes';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch(loginRequest());

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    };

    fetch('http://127.0.0.1:8000/api/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        dispatch(loginSuccess(data));
        // Assuming you have React Navigation set up, navigate to the Home screen
        navigation.navigate('Home', {userdata: data});
      })
      .catch(error => {
        dispatch(loginFailure('Login failed'));
        console.log(error);
      });
  };
};
