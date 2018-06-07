import moment from 'moment';

const initialState = {
  time: moment().format("dddd, MMMM Do YYYY, HH:mm:ss")
}

const timeReducer = (state = initialState, action) => {
  if (action.type === 'TIME_UPDATE') {
    return {
      ...state,
      time: moment().format("dddd, MMMM Do YYYY, HH:mm:ss")
    }
  }
  return state;
}

export { timeReducer };
