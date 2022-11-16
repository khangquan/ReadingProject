export const REGISTER = 'REGISTER';
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT';

const initialState = {
  userAccounts: [
    {
      id: new Date().getTime(),
      fullname: 'Khang Quân',
      email: 'khangquan',
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
            return state.map(account => {
                
                if (account.id === action.payload.id) {
                    return {...state, fullname: action.payload.fullname};
                }
                return state
            });
            debugger;
        default:
        return state;
  }
};

export default registerReducer;
