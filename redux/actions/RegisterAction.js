import { REGISTER } from "../reducers/RegisterReducer";

export const register = (fullname,email,pass) => (
    {
        type: REGISTER,
        payload: {
            id: (new Date).getTime(),
            fullname, email, pass
        }
    }
)