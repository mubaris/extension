import signupSaga from './containers/signup/saga';
import signinSaga from './containers/signin/saga';

export default function* IndexSaga () {
  yield [
    signupSaga(),
    signinSaga()
  ]
};
