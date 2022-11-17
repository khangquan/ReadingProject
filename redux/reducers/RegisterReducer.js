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
          debugger
            return {
              
                ...state,
                userAccounts: [...state.userAccounts, action.payload],
            };
            
        case EDIT_ACCOUNT:
            return state.userAccounts.map((account, i) => {
              debugger
                if (account.id === action.payload.id) {
                    return {
                      ...state.userAccounts[i],
                      fullname: action.payload.fullname
                    };
                }
            });
        default:
        return state;
  }
};

export default registerReducer;
