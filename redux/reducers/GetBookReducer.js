export const GET_BOOK_DATA = 'GET_BOOK_DATA'
export const GET_BOOK_TYPE = 'GET_BOOK_TYPE'

const initialState = {
    allBooksData: [],
    bookData: []
}

const getBookReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_BOOK_DATA:
            return {...state, allBooksData: action.payload} 
        case GET_BOOK_TYPE:
            return {...state, bookData: action.payload}
        default:
            return state
            
    } 

}


export default getBookReducer