import { CREATE_ACCOUNT } from "../reducers/CreateAccountReducer";

export const createAccount = (fullname,email,pass) => (
    {
        type: CREATE_ACCOUNT,
        fullname: fullname,
        email: email,
        pass: pass
    }
)