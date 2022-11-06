import { REGISTER } from "../reducers/RegisterReducer";

export const register = (fullname,email,pass) => (
    {
        type: REGISTER,
        payload: {
            fullname, email, pass
        }
    }
)