import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native'
import React from 'react'
import {useEffect, useState} from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {getBookType, increaseBookView} from '../../redux/actions/GetBookAction'
import {addFavBook, editFavBook} from '../../redux/actions/AccountAction'
import Icon from 'react-native-vector-icons/Ionicons'
import {IconString} from '../../utils/Icon'
import {colors} from '../../utils/Colors'
import {shareOnFacebook} from 'react-native-social-share'

import MenuIconBar from '../../components/MenuIconBar'
import MoreText from '../../components/MoreText'
import BookListHorizon from '../../components/BookListHorizon'
import Comments from '../../components/Comments'
import BookLoading from '../../components/BookLoading'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function DetailScreen({navigation}) {
  const dispatch = useDispatch()
  const [isLike, setIsLike] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [userInfo, setUserInfo] = useState([])
  const [bookLoading, setBookLoading] = useState(false)

  const {currentUser} = useSelector(state => state.loginScreen)
  const {userAccounts} = useSelector(state => state.register)
  const {allBooksData, bookData} = useSelector(state => state.bookGetData)

  const bookYouMayLike = allBooksData.filter(
    (item, index) => item.type === bookData.type,
  )

  useEffect(() => {
    let check = false
    userAccounts.forEach(user => {
      if (user.email === currentUser) {
        setUserInfo(user)
        user.favBookData.forEach(book => {
          if (book.title === bookData.title) {
            check = true
          } else {
            setIsLike(false)
          }
        })
      }
      setIsLike(check)
    })
  }, [bookData])

  const handleAllBook = item => {
    dispatch(getBookType(item))
    navigation.navigate('AllBooksScreen', item)
  }

  const handleReadingScreen = item => {
    setBookLoading(true)
    setTimeout(() => {
      dispatch(increaseBookView(item))
      navigation.navigate('ReadingScreen')
      setBookLoading(false)
    }, 1000)
  }

  const handleLikeBook = bookData => {
    if (isLike === true) {
      Alert.alert('Thông báo', 'Bạn có muốn xóa khỏi danh sách yêu thích?', [
        {
          text: 'Yes',
          onPress: () => {
            setIsLike(false)
            dispatch(editFavBook({userInfo, bookData}))
          },
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ])
    } else {
      setIsLike(true)
      dispatch(addFavBook({userInfo, bookData}))
      Alert.alert('Thành công', 'Đã thêm vào danh sách yêu thích!')
    }
  }

  const handeFBShare = () => {
    shareOnFacebook(
      {
        text: 'Thư Viện Sách Hay',
        link: 'https://facebook.com/',
        image: require('../../../assets/BookTypeScreen/kynang.jpg'),
      },
      results => {
        console.log(results)
      },
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        style={styles.imageBG}
        blurRadius={10}
        source={{uri: bookData.image}}
      />
      <View style={styles.topContent}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={styles.backStyle}
        >
          <Icon
            name={IconString.goBack}
            size={35}
            color={colors.primaryOrange}
          />
        </TouchableOpacity>

        <View style={styles.bookContent}>
          <Image style={styles.bookImage} source={{uri: bookData.image}} />
          <View style={styles.titleButtonStyle}>
            <Text style={styles.titleText}>{bookData.title}</Text>
            <Text style={styles.authorText}>{bookData.author}</Text>

            <TouchableOpacity
              onPress={() => {
                handleReadingScreen(bookData.title)
              }}
              style={styles.readButton}
            >
              <Text style={styles.buttonText}>ĐỌC NGAY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.botContent}>
        <ScrollView>
          <View style={styles.iconMenuBar}>
            <MenuIconBar
              isLike={isLike}
              isAnimation={true}
              color={isLike ? colors.red : null}
              title={IconString.heart}
              textTitle={'Thích'}
              onEvent={() => handleLikeBook(bookData)}
            />
            <MenuIconBar
              title={IconString.comment}
              textTitle={'Bình luận'}
              onEvent={() => setModalVisible(true)}
            />
            <MenuIconBar
              title={IconString.share}
              textTitle={'Chia sẻ'}
              onEvent={handeFBShare}
            />
          </View>

          <View style={{margin: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Giới Thiệu</Text>
            <MoreText content={bookData.desc} />
          </View>

          <View style={{margin: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Thông Tin</Text>
            <Text style={{fontSize: 18}}>Thể loại: {bookData.type}</Text>
            <Text style={{fontSize: 18}}>Lượt Xem: {bookData.views}</Text>
            <Text style={{fontSize: 18}}>Trạng Thái: {bookData.status}</Text>
          </View>

          <BookListHorizon
            title={'Có thể bạn quan tâm'}
            data={bookYouMayLike.filter((item, index) => index < 5)}
            allBookEvent={() => handleAllBook(bookData)}
            selectBookEvent={item => dispatch(getBookType(item))}
          />
        </ScrollView>
      </View>

      {modalVisible && (
        <Comments
          userInfo={userInfo}
          visible={modalVisible}
          onEvent={() => setModalVisible(false)}
        />
      )}

      {bookLoading ? <BookLoading /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
  },
  topContent: {
    height: windowHeight / 3,
    width: windowWidth,
  },
  imageBG: {
    position: 'absolute',
    height: '100%',
    width: windowWidth,
  },
  backStyle: {
    position: 'absolute',
    marginTop: 15,
    marginLeft: 10,
  },
  bookContent: {
    position: 'absolute',
    height: '65%',
    width: '30%',
    bottom: 20,
    left: 30,
    flexDirection: 'row',
  },
  bookImage: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.primaryOrange,
    resizeMode: 'cover',
  },
  titleButtonStyle: {
    marginLeft: 10,
    width: windowWidth / 2,
  },
  readButton: {
    width: '50%',
    height: '25%',
    backgroundColor: colors.primaryOrange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  titleText: {
    color: colors.primaryOrange,
    fontWeight: 'bold',
    fontSize: 20,
    borderColor: colors.white,
    textShadowColor: colors.black,
    textShadowRadius: 3,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  authorText: {
    color: colors.primaryOrange,
    fontSize: 18,
    textShadowColor: colors.black,
    textShadowRadius: 3,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  iconMenuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.6,
    marginTop: 10,
    borderColor: colors.primaryOrange,
    height: '10%',
    width: '90%',
    alignSelf: 'center',
  },
  botContent: {
    flex: 1,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: colors.white,
    borderWidth: 0.6,
    borderColor: colors.gray,
    overflow: 'hidden',
  },
})
