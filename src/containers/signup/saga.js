import { call, put, take, fork } from 'redux-saga/effects';

const URL = 'https://api.eternityapp.co/v1/accounts/users/';

function checkStatus(response) {
  // if (response.status >= 200 && response.status < 300) {
  //   return response;
  // }
  // const error = new Error(response);
  // console.log("From checkStatus", response);
  // error.response = response;
  // throw error;
  return response;
}

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  // const error = new Error(response.statusText);
  // error.response = response.json();
  // throw error;
  // console.log("From parseJSON", response);
  return response.json();
}

function* signup() {
  while (true) {
    const request = yield take('SIGNUP_REQUEST');
    const data = request.data;

    yield call(authorize, data);
  }
}

function sendRequest({ username, email, password }) {
  // console.log(username, password, 'test');
  return fetch(`${URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
      }
    }),
  }).then(checkStatus).then(parseJSON).catch((response) => {
    console.log(response);
  });
    // .then((response) => response.json())
    // .then((json) => {
    //   console.log(json);
    // })
    // .catch((ex) => {
    //   console.log('failed', ex);
    // });
}

function* authorize(data) {
  try {
    const { username, email, password } = data;
    const response = yield call(sendRequest, { username, email, password });
    // console.log("From authorize", response);
    if (response.user && response.user.token) {
      localStorage.setItem('ACCOUNT', JSON.stringify(response));
      const signinSuccessResponse = yield put({ type: 'SIGNUP_SUCCESS' });
      if (signinSuccessResponse) {
        yield put({ type: 'SIGNUP_SUCCESS_GLOBAL' });
      }
    } else {
      // console.log(response.toString());
      yield put({ type: 'SIGNUP_ERROR', error: "Email Already Registered! Please Sign In" });
    }
  } catch (e) {
    yield put({ type: 'SIGNUP_ERROR', error: e.message });
  }
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield fork(signup);
}