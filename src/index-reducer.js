import { combineReducers } from 'redux';
import imageReducer from './image-reducer';
import { progressReducer } from './containers/progress/reducer';
import { quoteReducer } from './containers/quote/reducer';
import { timeReducer } from './containers/time/reducer';
import { configReducer } from './containers/config/reducer';

const IndexReducer = combineReducers({
  imageUrl: imageReducer,
  progress: progressReducer,
  quote: quoteReducer,
  time: timeReducer,
  settings: configReducer
});

export default IndexReducer;