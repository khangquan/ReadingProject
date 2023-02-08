import {
  DELETE_COMMENT,
  GET_BOOK_DATA,
  GET_BOOK_TYPE,
  INCREASE_BOOK_VIEW,
  POST_COMMENT,
} from "../../defines/ActionTypes"

const initialState = {
  allBooksData: [],
  bookData: [],
}

const getBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOK_DATA:
      return { ...state, allBooksData: action.payload }
    case GET_BOOK_TYPE:
      return { ...state, bookData: action.payload }
    case INCREASE_BOOK_VIEW:
      state.allBooksData.map(book => {
        if (book.title === action.payload) {
          book.views++
        }
      })
      return {
        ...state,
      }
    case POST_COMMENT:
      state.allBooksData.map(book => {
        if (book.title === action.payload.title) {
          book.comments.push(action.payload)
        }
      })
      return {
        ...state,
      }
    case DELETE_COMMENT: 
      state.allBooksData.map(book => {
        if(book.title === action.payload.bookTitle) {
          let bookComment = book.comments
          for(let i=0; i<bookComment.length;i++) {
            if(bookComment[i].id === action.payload.commentId) {
              bookComment.splice(i,1)
            }
          }
        }
      })
      return {
        ...state,
      }
    default:
      return state
  }
}

export default getBookReducer
