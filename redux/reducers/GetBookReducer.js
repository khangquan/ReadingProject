export const GET_BOOK_DATA = 'GET_BOOK_DATA'
export const GET_BOOK_TYPE = 'GET_BOOK_TYPE'
export const INCREASE_BOOK_VIEW = 'INCREASE_BOOK_VIEW'

const initialState = {
    allBooksData: [],
    bookData: []
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
            });
            return {
                ...state,
            };
        default:
            return state

    }

}


export default getBookReducer