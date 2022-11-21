export const REGISTER = 'REGISTER';
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT';
export const ADD_FAV_BOOK = 'ADD_FAV_BOOK';
export const EDIT_FAV_BOOK = 'EDIT_FAV_BOOK';

const initialState = {
  userAccounts: [
    {
      id: new Date().getTime(),
      fullname: 'Khang Quân',
      email: 'quan',
      pass: '123456',
      favBookData: [
        {
          id: new Date().getTime(),
          title: 'Dạy Con Làm Giàu',
          image: require('../../assets/Books/KinhTe/dayconlamgiau.jpg'),
          author: 'Robert T. Kiyosaki',
          type: 'Kinh Tế',
          desc:
            'Nếu bạn đã từng cảm thấy thất vọng vì việc làm công lãnh lương hay làm tư không cho bạn sự an toàn tài chính mà bạn khao khát , còn có cách thay thế. Nếu những đầu tư của bạn thất bại, bạn mệt mỏi vì những lời khuyên tài chính cũ xì, bạn lo lắng về việc nghỉ hưu, hay bạn chỉ dành nhiều thời gian hơn cho gia đình, bạn có thể tìm thấy con đường đến sự tự do về tài chính trong quyển sách này. Quyển sách gồm các câu chuyện thành công của những người đã đón nhận lời khuyên của người bố giàu và sau đó tìm thấy con đường đi đến sự thành công về tài chính của riêng mình. Và bạn cũng có thể tạo ra những câu chuyện thành công từ tập sách này',
          status: 'Hoàn Thành',
        },
      ],
    },
  ],
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        userAccounts: [...state.userAccounts, action.payload],
      };

    case EDIT_ACCOUNT:
      state.userAccounts.map(account => {
        if (account.id === action.payload.id) {
          account.fullname = action.payload.fullname;
        }
      });
      return {
        ...state,
      };

    case ADD_FAV_BOOK:
      return {
        ...state.userAccounts,
        favBookData: [...userAccounts.favBookData, action.payload],
      };

    default:
      return state;
  }
};

export default accountReducer;
