import moment from 'moment';

const initalState = {
  metric: localStorage.getItem('metric') || 'year',
  decimal: localStorage.getItem('decimal') || 2,
  custom_start: localStorage.getItem('custom_start'),
  custom_end: localStorage.getItem('custom_end'),
  custom_title: localStorage.getItem('custom_title') || 'Custom',
  custom_subtitle: localStorage.getItem('custom_subtitle') || '',
  custom_weekday: localStorage.getItem('custom_weekday') || 0
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
      if (state.metric === 'week' && state.custom_weekday) {
        const neg =  state.custom_weekday + 1 - 7;
        const start = moment().startOf('week').day(neg)
        const end = moment().endOf('week').day(state.custom_weekday + 1);
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
    case 'CHANGE_TITLE_CUSTOM':
      localStorage.setItem('custom_title', action.value);
      return {
        ...state,
        custom_title: action.value
      }
    case 'CHANGE_SUBTITLE_CUSTOM':
      localStorage.setItem('custom_subtitle', action.value);
      return {
        ...state,
        custom_subtitle: action.value
      }
    case 'CHANGE_WEEKDAY':
      localStorage.setItem('custom_weekday', action.value);
      return {
        ...state,
        custom_weekday: action.value
      }
    default:
      return state;
  }
}

export { progressReducer };
