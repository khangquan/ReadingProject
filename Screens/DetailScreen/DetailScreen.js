import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  StatusBar
} from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBookData, getBookType } from '../../redux/actions/GetBookAction'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import MenuIconBar from './MenuIconBar'
import ViewMoreText from 'react-native-view-more-text'
import DetailScreenFlatlist from './DetailScreenFlatlist'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function DetailScreen({ navigation }) {
  const { allBooksData, bookData } = useSelector(state => state.bookGetData)
  const dispatch = useDispatch()

  const [isLike, setIsLike] = useState(false)

  useEffect(() => {
    dispatch(getBookData())
  }, [])

  const renderView = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        dispatch(getBookType(item))
        navigation.navigate('DetailScreen')
      }}
      style={styles.renderViewStyle}
    >
      <Image style={styles.flatListImg} source={item.image} />
      <Text style={styles.flatListTitle}>{item.title}</Text>
      <Text style={styles.flatListAuthor}>{item.author}</Text>
    </TouchableOpacity>
  )

  const renderViewMore = (onPress) => {
    return (
      <Text style={{ fontSize: 17, fontWeight: '500' }} onPress={onPress}>Xem thêm</Text>
    )
  }

  const renderViewLess = (onPress) => {
    return (
      <Text style={{ fontSize: 17, fontWeight: '500' }} onPress={onPress}>Thu gọn</Text>
    )
  }

  const handleAllBook = (item) => {
    dispatch(getBookType(item))
    navigation.navigate('AllBooksScreen')
  }

  const handleReadingScreen = () => {
    navigation.navigate('ReadingScreen')
  }

  const handleLikeBook = () => {
    setIsLike(!isLike)
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <Image
        style={styles.imageBG}
        blurRadius={10}
        source={bookData.image}
      />
      <View style={styles.topContent}>

        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backStyle}>
          <Icon name="chevron-back-outline" size={35} color={'#FB7849'} />
        </TouchableOpacity>

        <View style={styles.bookContent}>
          <Image style={styles.bookImage} source={bookData.image} />
          <View style={styles.titleButtonStyle}>
            <Text style={styles.titleText}>{bookData.title}</Text>
            <Text style={styles.authorText}>{bookData.author}</Text>
            <TouchableOpacity onPress={handleReadingScreen} style={styles.readButton}>
              <Text style={styles.buttonText}>ĐỌC NGAY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.botContent} >
        <View style={styles.iconMenuBar}>
          <MenuIconBar />
          <MenuIconBar
            color={isLike ? 'red' : null}
            title={'heart'} textTitle={'Thích'} onEvent={handleLikeBook}
          />
          <MenuIconBar
            title={'chatbubble-ellipses-outline'}
            textTitle={'Bình luận'}
          />
          <MenuIconBar
            title={'share-outline'}
            textTitle={'Chia sẻ'}
          />
          <MenuIconBar />
        </View>

        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Giới Thiệu</Text>
          <ViewMoreText
            numberOfLines={2}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}
          >
            <Text style={{ fontSize: 18 }}>{bookData.desc}</Text>
          </ViewMoreText>
        </View>

        <View style={{ margin: 20, }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thông Tin</Text>
          <Text style={{ fontSize: 18 }}>Thể loại: {bookData.type}</Text>
          <Text style={{ fontSize: 18 }}>Lượt Xem: 0</Text>
          <Text style={{ fontSize: 18 }}>Trạng Thái: {bookData.status}</Text>
        </View>

        <DetailScreenFlatlist
          title={'Có thể bạn quan tâm'}
          data={allBooksData.filter((item, index) =>
            item.type === bookData.type
          )}
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
    borderColor: '#FB7849'
  },
  titleButtonStyle: {
    marginLeft: 10,
    width: windowWidth / 2,
  },
  readButton: {
    width: '50%',
    height: '25%',
    backgroundColor: '#FB7849',
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
    color: '#FB7849',
    fontWeight: 'bold',
    fontSize: 20,
    borderColor: 'white',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: {
      width: 2,
      height: 2,
    }
  },
  authorText: {
    color: '#FB7849',
    fontSize: 18,
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: {
      width: 2,
      height: 2,
    }
  },
  iconMenuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.6,
    marginTop: 10,
    borderColor: '#FB7849',
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
