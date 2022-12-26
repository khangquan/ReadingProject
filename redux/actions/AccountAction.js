import {
  REGISTER,
  EDIT_ACCOUNT_FULLNAME,
  EDIT_ACCOUNT_EMAIL,
  EDIT_ACCOUNT_PASS,
  ADD_ACCOUNT_AVATAR,
  DEL_ACCOUNT_AVATAR,
  ADD_FAV_BOOK,
  EDIT_FAV_BOOK,
} from '../reducers/AccountReducer'

export const register = param => ({
  type: REGISTER,
  payload: param,
})

export const editFullname = param => ({
  type: EDIT_ACCOUNT_FULLNAME,
  payload: param,
})

export const editEmail = param => ({
  type: EDIT_ACCOUNT_EMAIL,
  payload: param,
})

export const editPassword = param => ({
  type: EDIT_ACCOUNT_PASS,
  payload: param,
})

export const editAvatar = param => ({
  type: ADD_ACCOUNT_AVATAR,
  payload: param,
})

export const delAvatar = param => ({
  type: DEL_ACCOUNT_AVATAR,
  payload: param,
})

export const addFavBook = param => ({
  type: ADD_FAV_BOOK,
  payload: param,
})

export const editFavBook = param => ({
  type: EDIT_FAV_BOOK,
  payload: param,
})
