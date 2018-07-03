
const initialState = {
  error: '',
  userType: localStorage.getItem('USERTYPE') || 'GUEST'
}

const signupReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SIGNUP_REQUEST':
      // console.log(action);
      return {
        ...state,
        error: ''
      };
    case 'SIGNUP_SUCCESS':
      localStorage.setItem('USERTYPE', 'LOGGEDIN');
      return {
        ...state,
        userType: 'LOGGEDIN'
      };
    case 'SIGNUP_ERROR':
      // console.log(action);
      return {
        ...state,
        error: action.error
      };
    case 'RESET_ERROR':
      return {
        ...state,
        error: ''
      };
    default:
      return state;
  }
}

export { signupReducer };
