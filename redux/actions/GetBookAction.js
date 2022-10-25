import { GET_BOOK_DATA, GET_BOOK_TYPE } from "../reducers/GetBookReducer"
import TongHopSach from "../../Screens/BookData/TongHopSach"

export const getBookData = () => (
    {
        type: GET_BOOK_DATA,
        payload: TongHopSach
    }
)

export const getBookType = (param) => (
    {
        type: GET_BOOK_TYPE,
        payload: param
    }
)

// export const getBookDataAPI = () => (
//     async (dispatch, getState) => {
//         fetch('https://cattechsolutions.com/TongHopSach.json')
//             .then((response) => response.json())
//             .then((json) => {
//                 dispatch(getBookData(json))
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }
// )