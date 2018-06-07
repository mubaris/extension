import { combineReducers } from 'redux';
import imageReducer from './image-reducer';
import { progressReducer } from './containers/progress/reducer';

const IndexReducer = combineReducers({
  imageUrl: imageReducer,
  progress: progressReducer
});

export default IndexReducer;