
const initialState = {
  error: '',
  userType: localStorage.getItem('USERTYPE') || 'GUEST'
}

const signinReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SIGNIN_REQUEST':
      // console.log(action);
      return {
        ...state,
        error: ''
      };
    case 'SIGNIN_SUCCESS':
      localStorage.setItem('USERTYPE', 'LOGGEDIN');
      return {
        ...state,
        userType: 'LOGGEDIN'
      };
    case 'SIGNIN_ERROR':
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

export { signinReducer };
