import image from './constants/images';

const imageReducer = (state = { imageUrl: image }, action) => {
  if (action.type === 'BG_IMAGE_FETCH') {
    return {
      ...state,
      imageUrl: action.url
    }
  } else {
    return state;
  }
};

export default imageReducer;
