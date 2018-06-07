import moment from 'moment';

import image from './constants/images';

const initialState = {
  image: JSON.parse(localStorage.getItem('image')) || image
}

const imageReducer = (state = initialState, action) => {
  if (action.type === 'BG_IMAGE_FETCH') {
    // console.log(action)
    const data = action.data;
    data.image = data.image + `&w=${window.screen.width + 500}`;
    localStorage.setItem('image', JSON.stringify(data));
    localStorage.setItem('date', moment().format("YYYYMMDD"));
    return {
      ...state,
      ...data
    }
  } else {
    return state;
  }
};

export default imageReducer;
