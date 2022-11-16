import { REGISTER, EDIT_ACCOUNT } from "../reducers/RegisterReducer";

export const register = (param) => (
    {
        type: REGISTER,
        payload: param
    }
)

export const editAccount = (param) => (
    {
        type: EDIT_ACCOUNT,
        payload: param
    }
)