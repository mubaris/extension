import moment from 'moment';

const initalState = {
  metric: localStorage.getItem('metric') || 'year',
  decimal: localStorage.getItem('decimal') || 2,
  custom_start: localStorage.getItem('custom_start'),
  custom_end: localStorage.getItem('custom_end')
};

const dateFormat = 'YYYY-MM-DD HH:mm';

const progressReducer = (state = initalState, action) => {
  switch(action.type) {
    case 'TIME_UPDATE':
      if (state.metric === 'custom') {
        const start = moment(state.custom_start, dateFormat);
        const end = moment(state.custom_end, dateFormat);
        const now = moment();
        const duration = moment.duration(now.diff(start)).asMilliseconds();
        const total = moment.duration(end.diff(start)).asMilliseconds();
        const percent = duration * 100 / total;
        const out = percent.toFixed(state.decimal);
        return {
          ...state,
          percent: out
        };
      }
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
        localStorage.setItem('metric', 'custom');
        return {
          ...state,
          metric: 'custom'
        }
      } else if (state.metric === 'custom') {
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
    case 'DECIMAL_CHANGE':
      localStorage.setItem('decimal', action.value);
      return {
        ...state,
        decimal: action.value
      }
    case 'METRIC_CHANGE':
      localStorage.setItem('metric', action.value);
      return {
        ...state,
        metric: action.value
      }
    case 'NEW_CUSTOM_PROGRESS':
      localStorage.setItem('custom_start', action.dateString[0]);
      localStorage.setItem('custom_end', action.dateString[1]);
      return {
        ...state,
        custom_start: action.dateString[0],
        custom_end: action.dateString[1]
      }
    default:
      return state;
  }
}

export { progressReducer };
