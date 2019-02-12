import moment from 'moment';
import 'moment/locale/ja';

const initialState = {
  time: moment().format("llll")
}

const timeReducer = (state = initialState, action) => {
  if (action.type === 'TIME_UPDATE') {
    // console.log(action.locale);
    let locale = action.locale || localStorage.getItem('language') || 'en';
    moment.locale(locale);
    return {
      ...state,
      time: moment().format("llll")
    }
  }
  return state;
}

export { timeReducer };
