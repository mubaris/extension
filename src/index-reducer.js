import { combineReducers } from 'redux';
import imageReducer from './image-reducer';
import { progressReducer } from './containers/progress/reducer';
import { quoteReducer } from './containers/quote/reducer';
import { timeReducer } from './containers/time/reducer';
import { configReducer } from './containers/config/reducer';
import { accountReducer } from './containers/accounts/reducer';
import { signupReducer } from './containers/signup/reducer';
import { signinReducer } from './containers/signin/reducer';

const IndexReducer = combineReducers({
  imageUrl: imageReducer,
  progress: progressReducer,
  quote: quoteReducer,
  time: timeReducer,
  settings: configReducer,
  accounts: accountReducer,
  signup: signupReducer,
  signin: signinReducer,
});

export default IndexReducer;