import moment from 'moment';

import image from './constants/images';

const initialState = {
  image: JSON.parse(localStorage.getItem('image')) || image,
  type: localStorage.getItem('background') || 'image'
}

const imageReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'BG_IMAGE_FETCH':
      const data = action.data;
      data.image = data.image + `&w=${window.screen.width + 500}`;
      localStorage.setItem('image', JSON.stringify(data));
      localStorage.setItem('date', moment().format("YYYYMMDD"));
      if (state.type === 'image') {
        /* eslint-disable */
        location.reload(false);
      }
      return {
        ...state,
        ...data
      }
    case 'BG_TYPE_CHANGE':
      localStorage.setItem('background', action.value);
      return {
        ...state,
        type: action.value
      }
    default:
      return state;
  }
};

export default imageReducer;
