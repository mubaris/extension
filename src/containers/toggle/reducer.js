const initialState = {
  status: localStorage.getItem('distractionFreeStatus') === "true" || false
}

const toggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_DISTRACTION_FREE_MODE':
      localStorage.setItem('distractionFreeStatus', action.value);
      return {
        ...state,
        status: action.value
      }
    default:
      return state;
  }
}

export { toggleReducer };
