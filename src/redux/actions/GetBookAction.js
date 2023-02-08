import { 
  GET_BOOK_DATA, 
  GET_BOOK_TYPE, 
  INCREASE_BOOK_VIEW, 
  POST_COMMENT,
} from "../../defines/ActionTypes"
import TongHopSach from '../../books/TongHopSach'
import { getAPI } from "../../services/API"
import { APIuri } from "../../utils/APIuri"

export const getBookData = param => ({
  type: GET_BOOK_DATA,
  payload: param,
})

export const getBookType = param => ({
  type: GET_BOOK_TYPE,
  payload: param,
})

export const increaseBookView = param => ({
  type: INCREASE_BOOK_VIEW,
  payload: param,
})

export const postComment = param => ({
  type: POST_COMMENT,
  payload: param
})

export const getBookAPI = () => (
  getAPI({
    uri: APIuri.bookData,
    success: (json) => getBookData(json),
    fail: (error) => console.log(error)
  })
)
