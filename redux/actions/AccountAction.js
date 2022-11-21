import { REGISTER, EDIT_ACCOUNT, ADD_FAV_BOOK, EDIT_FAV_BOOK } from "../reducers/AccountReducer";

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

export const addFavBook = (param) => (
    {
        type: ADD_FAV_BOOK,
        payload: param
    }
)

export const editFavBook = (param) => (
    {
        type: EDIT_FAV_BOOK,
        payload: param
    }
)