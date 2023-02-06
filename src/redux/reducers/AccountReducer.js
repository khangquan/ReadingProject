import {
  IS_REGISTERING,
  REGISTER,
  EDIT_ACCOUNT_FULLNAME,
  EDIT_ACCOUNT_EMAIL,
  EDIT_ACCOUNT_PASS,
  ADD_ACCOUNT_AVATAR,
  DEL_ACCOUNT_AVATAR,
  ADD_FAV_BOOK,
  EDIT_FAV_BOOK,
} from '../../defines/ActionTypes'

const initialState = {
  isRegistering: false,
  userAccounts: [
    {
      id: new Date().getTime(),
      fullname: 'Khang Quân',
      email: 'quan',
      pass: '123',
      avatar:
        'https://haycafe.vn/wp-content/uploads/2022/02/Anh-Avatar-Doremon-dep-ngau-cute.jpg',
      favBookData: [],
    },
  ],
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_REGISTERING:
      return {
        ...state,
        isRegistering: true,
      }
    case REGISTER:
      return {
        ...state,
        userAccounts: [...state.userAccounts, action.payload],
        isRegistering: false,
      }

    case EDIT_ACCOUNT_FULLNAME:
      state.userAccounts.map(account => {
        if (account.id === action.payload.id) {
          account.fullname = action.payload.fullname
        }
      })
      return {
        ...state,
      }

    case EDIT_ACCOUNT_EMAIL:
      state.userAccounts.map(account => {
        if (account.id === action.payload.id) {
          account.email = action.payload.email
        }
      })
      return {
        ...state,
      }

    case EDIT_ACCOUNT_PASS:
      state.userAccounts.map(account => {
        if (account.id === action.payload.id) {
          account.pass = action.payload.pass
        }
      })
      return {
        ...state,
      }

    case ADD_ACCOUNT_AVATAR:
      state.userAccounts.map(account => {
        if (account.id === action.payload.id) {
          account.avatar = action.payload.avatar
        }
      })
      return {
        ...state,
      }

    case DEL_ACCOUNT_AVATAR:
      state.userAccounts.map(account => {
        if (account.id === action.payload.id) {
          account.avatar = null
        }
      })
      return {
        ...state,
      }

    case ADD_FAV_BOOK:
      state.userAccounts.map(account => {
        if (account.id === action.payload.userId) {
          account.favBookData.push(action.payload.favBook)
        }
      })
      return {
        ...state,
      }
    case EDIT_FAV_BOOK:
      state.userAccounts.map(account => {
        if (account.id === action.payload.userId) {
          let checkBook = account.favBookData
          for (let i = 0; i < checkBook.length; i++) {
            if (checkBook[i].title === action.payload.title) {
              checkBook.splice(i, 1)
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

export default accountReducer
