export const REGISTER = 'REGISTER';
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT';

const initialState = {
  userAccounts: [
    {
      id: new Date().getTime(),
      fullname: 'Khang Quân',
      email: 'quan',
      pass: '123456',
    },
  ],
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        userAccounts: [...state.userAccounts, action.payload],
      };

    case EDIT_ACCOUNT:
      state.userAccounts.map(account => {
        if (account.id === action.payload.id) {
          account.fullname = action.payload.fullname
        }
      });
      return {
        ...state
      }
    default:
      return state;
  }
};

export default registerReducer;
