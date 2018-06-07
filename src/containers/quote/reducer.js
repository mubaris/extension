import quote from './constants';

const initialState = {
  ...quote
}

const quoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'COLLECT_QUOTE':
      const data = action.data;
      return {
        ...state,
        ...data
      }
    default:
      return state;
  }
}

export { quoteReducer };
