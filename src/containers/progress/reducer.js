import moment from 'moment';

const initalState = {
  metric: localStorage.getItem('metric') || 'year',
  decimal: localStorage.getItem('decimal') || 2
};

const progressReducer = (state = initalState, action) => {
  switch(action.type) {
    case 'TIME_UPDATE':
      const start = moment().startOf(state.metric);
      const end = moment().endOf(state.metric);
      const now = moment();
      const duration = moment.duration(now.diff(start)).asMilliseconds();
      const total = moment.duration(end.diff(start)).asMilliseconds();
      const percent = duration * 100 / total;
      const out = percent.toFixed(state.decimal);
      return {
        ...state,
        percent: out
      };
    case 'CLICK_METRIC':
      if (state.metric === 'year') {
        localStorage.setItem('metric', 'day');
        return {
          ...state,
          metric: 'day'
        }
      } else if (state.metric === 'day') {
        localStorage.setItem('metric', 'week');
        return {
          ...state,
          metric: 'week'
        }
      } else if (state.metric === 'week') {
        localStorage.setItem('metric', 'month');
        return {
          ...state,
          metric: 'month'
        }
      } else if (state.metric === 'month') {
        localStorage.setItem('metric', 'year');
        return {
          ...state,
          metric: 'year'
        }
      }
      return {
        ...state
      }
    default:
      return state;
  }
}

export { progressReducer };
