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
import { useEffect, useState } from 'react'
import { colors } from '../../defines/Colors'
import { useSelector, useDispatch } from 'react-redux'
import { getBookData, getBookType, increaseBookView } from '../../redux/actions/GetBookAction'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import MenuIconBar from './MenuIconBar'
import ViewMoreText from 'react-native-view-more-text'
import FlatlistHorizon from '../../components/FlatlistHorizon'
import { addFavBook, editFavBook } from '../../redux/actions/AccountAction'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function DetailScreen({ navigation }) {
  const { allBooksData, bookData } = useSelector(state => state.bookGetData)
  const bookYouMayLike = allBooksData.filter(
    (item, index) => item.type === bookData.type,
  )
  const dispatch = useDispatch()
  const [isLike, setIsLike] = useState(false)

  const [userInfo, setUserInfo] = useState([])
  const { currentUser } = useSelector(state => state.loginScreen)
  const { userAccounts } = useSelector(state => state.register)

  useEffect(() => {
    dispatch(getBookData())
    let check = false
    userAccounts.forEach(user => {
      if (user.email === currentUser) setUserInfo(user)
      user.favBookData.forEach(book => {
        if (book.title === bookData.title) {
          check = true
        } else {
          setIsLike(false)
        }
      })
      setIsLike(check)
    })
  }, [bookData])

  const renderView = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        dispatch(getBookType(item))
      }}
      style={styles.renderViewStyle}>
      <Image style={styles.flatListImg} source={{uri:item.image}} />
      <Text style={styles.flatListTitle}>{item.title}</Text>
      <Text style={styles.flatListAuthor}>{item.author}</Text>
    </TouchableOpacity>
  )

  const renderViewMore = onPress => {
    return (
      <Text style={{ fontSize: 17, fontWeight: '500' }} onPress={onPress}>
        Xem th??m
      </Text>
    )
  }

  const renderViewLess = onPress => {
    return (
      <Text style={{ fontSize: 17, fontWeight: '500' }} onPress={onPress}>
        Thu g???n
      </Text>
    )
  }

  const handleAllBook = item => {
    dispatch(getBookType(item))
    navigation.navigate('AllBooksScreen', item)
  }

  const handleReadingScreen = item => {
    dispatch(increaseBookView(item))
    navigation.navigate('ReadingScreen')
  }

  const handleLikeBook = bookData => {
    if (isLike === true) {
      Alert.alert('Th??ng b??o', 'B???n c?? mu???n x??a kh???i danh s??ch y??u th??ch?', [
        {
          text: 'Yes',
          onPress: () => {
            setIsLike(false)
            dispatch(editFavBook({ title: bookData.title }))
          },
        },
        {
          text: 'No',
          onPress: () => { },
        },
      ])
    } else {
      setIsLike(true)
      dispatch(
        addFavBook({
          userId: userInfo.id,
          favBook: {
            title: bookData.title,
            image: bookData.image,
            author: bookData.author,
            type: bookData.type,
            desc: bookData.desc,
            status: bookData.status,
          },
        }),
      )
      Alert.alert('Th??nh c??ng', '???? th??m v??o danh s??ch y??u th??ch!')
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image style={styles.imageBG} blurRadius={10} source={{uri:bookData.image}} />
      <View style={styles.topContent}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={styles.backStyle}>
          <Icon name="chevron-back-outline" size={35} color={colors.primaryOrange} />
        </TouchableOpacity>

        <View style={styles.bookContent}>
          <Image style={styles.bookImage} source={{uri:bookData.image}} />
          <View style={styles.titleButtonStyle}>
            <Text style={styles.titleText}>{bookData.title}</Text>
            <Text style={styles.authorText}>{bookData.author}</Text>
            <TouchableOpacity
              onPress={() => {
                handleReadingScreen(bookData.title)
              }}
              style={styles.readButton}>
              <Text style={styles.buttonText}>?????C NGAY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.botContent}>
        <View style={styles.iconMenuBar}>
          <MenuIconBar />
          <MenuIconBar
            color={isLike ? 'red' : null}
            title={'heart'}
            textTitle={'Th??ch'}
            onEvent={() => handleLikeBook(bookData)}
          />
          <MenuIconBar
            title={'chatbubble-ellipses-outline'}
            textTitle={'B??nh lu???n'}
            onEvent={() => console.log(userInfo)}
          />
          <MenuIconBar title={'share-outline'} textTitle={'Chia s???'} />
          <MenuIconBar />
        </View>

        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Gi???i Thi???u</Text>
          <ViewMoreText
            numberOfLines={2}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}>
            <Text style={{ fontSize: 18 }}>{bookData.desc}</Text>
          </ViewMoreText>
        </View>

        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Th??ng Tin</Text>
          <Text style={{ fontSize: 18 }}>Th??? lo???i: {bookData.type}</Text>
          <Text style={{ fontSize: 18 }}>L?????t Xem: {bookData.views}</Text>
          <Text style={{ fontSize: 18 }}>Tr???ng Th??i: {bookData.status}</Text>
        </View>

        <FlatlistHorizon
          title={'C?? th??? b???n quan t??m'}
          data={bookYouMayLike.filter((item, index) => index < 5)}
          renderView={renderView}
          onEvent={() => handleAllBook(bookData)}
        />
      </ScrollView>
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
    resizeMode: 'cover'
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
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  titleText: {
    color: colors.primaryOrange,
    fontWeight: 'bold',
    fontSize: 20,
    borderColor: 'white',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  authorText: {
    color: colors.primaryOrange,
    fontSize: 18,
    textShadowColor: 'black',
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
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: 'white',
    borderWidth: 0.6,
    borderColor: 'gray',
  },
  renderViewStyle: {
    width: windowWidth / 3,
    height: windowHeight / 4,
    marginTop: 20,
    marginBottom: 50,
    marginHorizontal: 10,
  },
  flatListImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})
