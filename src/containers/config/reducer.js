
const initialState = {
  visible: false
}

const configReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SETTINGS_TOGGLE':
      // console.log(state);
      return {
        ...state,
        visible: !state.visible
      }
    default:
      return state;
  }
}

export { configReducer };
