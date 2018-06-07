import { combineReducers } from 'redux';
import imageReducer from './image-reducer';

const IndexReducer = combineReducers({
  imageUrl: imageReducer
});

export default IndexReducer;