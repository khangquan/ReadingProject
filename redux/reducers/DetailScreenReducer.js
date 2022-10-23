export const GET_BOOK_DATA = 'GET_BOOK_DATA'

const initialState = {
    bookData: []
}

const detailScreenReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_BOOK_DATA:
            return {...state, bookData: action.payload} 
        default:
            return state
            
    } 

}


export default detailScreenReducer