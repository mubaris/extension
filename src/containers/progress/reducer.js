import moment from 'moment';

const initalState = {
  metric: localStorage.getItem('metric') || 'year',
  decimal: localStorage.getItem('decimal') || 2,
  custom_start: localStorage.getItem('custom_start'),
  custom_end: localStorage.getItem('custom_end'),
  custom_title: localStorage.getItem('custom_title') || 'Custom',
  custom_subtitle: localStorage.getItem('custom_subtitle') || '',
  custom_weekday: localStorage.getItem('custom_weekday') || 0,
  custom_hour: localStorage.getItem('custom_hour') || 0
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
        const neg =  state.custom_weekday - 7;
        let start = moment().day(neg).startOf('day');
        let end = moment().day(state.custom_weekday).startOf('day');
        if (state.custom_hour) {
          const addit = moment.duration(state.custom_hour);
          start = moment().day(neg).startOf('day').add(addit);
          end = moment().day(state.custom_weekday).startOf('day').add(addit);
        }
        const now = moment();
        // console.log(start, end);
        const duration = moment.duration(now.diff(start)).asMilliseconds();
        const total = moment.duration(end.diff(start)).asMilliseconds();
        let percent = duration * 100 / total;
        if (percent > 100) {
          percent = percent - 100;
        }
        const out = percent.toFixed(state.decimal);
        return {
          ...state,
          percent: out
        };
      }
      if (state.metric === 'day' && state.custom_hour) {
        const addit = moment.duration(state.custom_hour);
        const start = moment().startOf('day').add(addit);
        const end = moment().endOf('day').add(addit);
        const now = moment();
        // console.log(start, end);
        const duration = moment.duration(now.diff(start)).asMilliseconds();
        const total = moment.duration(end.diff(start)).asMilliseconds();
        let percent = duration * 100 / total;
        if (percent < 0) {
          percent = percent + 100;
        }
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
    case 'CHANGE_DAYSTART':
      localStorage.setItem('custom_hour', action.timeString);
      return {
        ...state,
        custom_hour: action.timeString
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
