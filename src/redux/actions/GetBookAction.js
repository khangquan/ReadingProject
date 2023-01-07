import { 
  GET_BOOK_DATA, 
  GET_BOOK_TYPE, 
  INCREASE_BOOK_VIEW 
} from "../../defines/ActionTypes"
import TongHopSach from '../../books/TongHopSach'

export const getBookData = () => ({
  type: GET_BOOK_DATA,
  payload: TongHopSach,
})

export const getBookType = param => ({
  type: GET_BOOK_TYPE,
  payload: param,
})

export const increaseBookView = param => ({
  type: INCREASE_BOOK_VIEW,
  payload: param,
})

// export const getBookDataAPI = () => (
//     async (dispatch) => {
//         fetch('https://mocki.io/v1/39c3d3e1-e607-4814-82c8-4f1f404a5fc7')
//             .then((response) => response.json())
//             .then((json) => {
//                 dispatch(getBookData(json))
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }
// )
