import ga from '../../analytics';

const initialState = {
  visible: false,
  userType: localStorage.getItem('USERTYPE') || 'GUEST',
  package: localStorage.getItem('PACKAGE') || 'FREE',
}

const accountReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ACCOUNTS_TOGGLE':
      // console.log(state);
      return {
        ...state,
        visible: !state.visible
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        visible: false,
        userType: 'LOGGEDIN'
      }
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        visible: false,
        userType: 'LOGGEDIN'
      }
    case 'LOGOUT':
      const user = JSON.parse(localStorage.getItem('ACCOUNT'));
      ga.set({ userId: user.user.email });
      ga.event({
        category: 'Accounts',
        action: 'Open Pricing',
        label: `${localStorage.getItem('PACKAGE')} - User`
      });
      localStorage.removeItem('ACCOUNT');
      localStorage.removeItem('PACKAGE');
      localStorage.setItem('USERTYPE', 'GUEST');
      return {
        ...state,
        visible: false,
        userType: 'GUEST',
        package: 'FREE',
      }
    case 'SUBSCRIPTION_STATUS':
      localStorage.setItem('PACKAGE', action.data.package);
      return {
        ...state,
        package: action.data.package
      }
    default:
      return state;
  }
}

export { accountReducer };
