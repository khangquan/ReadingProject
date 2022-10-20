export const FAV_BOOK = 'FAV_BOOK'

const initialState = [
    {
        title: '',
        image: require(''),
        author: "",
        type: '',
        desc: '',
        status: '',
    },
]
    

const DetailScreenReducer = (state = initialState, action) => {
    switch(action.type){
        case FAV_BOOK:
            return {...state, isLogin: true, email: action.payload}
        
        default:
            return state
    }
}

export default DetailScreenReducer