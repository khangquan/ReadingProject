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
      onPress={() => navigation.navigate('DetailScreen', bookData)}
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
    <ScrollView style={styles.container}>
      <StatusBar
        hidden={true}
      />
      <View style={styles.topContent}>
        <Image
          style={styles.imageBG}
          blurRadius={10}
          source={bookData.image}
        />
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backStyle}>
          <Icon name="chevron-back-outline" size={35} color={'#FB7849'} />
        </TouchableOpacity>

        <View style={styles.bookContent}>
          <Image
            style={styles.bookImage}
            source={bookData.image}
          />
          <View style={styles.titleButtonStyle}>
            <Text style={styles.titleText}>{bookData.title}</Text>
            <Text style={styles.authorText}>{bookData.author}</Text>
            <TouchableOpacity onPress={handleReadingScreen} style={styles.readButton}>
              <Text style={styles.buttonText}>ĐỌC NGAY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.botContent}>
        <View style={styles.iconMenuBar}>
          <MenuIconBar color={isLike ? 'red' : null} title={'heart'} textTitle={'Thích'} onEvent={handleLikeBook} />
          <MenuIconBar
            title={'chatbubble-ellipses-outline'}
            textTitle={'Bình luận'}
          />
          <MenuIconBar title={'share-outline'} textTitle={'Chia sẻ'} />
          <MenuIconBar title={'bookmark-outline'} textTitle={'Đánh dấu'} />
          <MenuIconBar title={'alert-circle-outline'} textTitle={'Báo lỗi'} />
        </View>

        <View style={styles.introStyle}>
          <Text style={styles.botTitleText}>Giới Thiệu</Text>
          <ViewMoreText
            numberOfLines={2}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}
          >
            <Text style={{ fontSize: 18 }}>{bookData.desc}</Text>
          </ViewMoreText>
        </View>

        <View style={styles.detailStyle}>
          <Text style={styles.botTitleText}>Thông Tin</Text>
          <Text style={styles.infoText}>Thể loại: {bookData.type}</Text>
          <Text style={styles.infoText}>Lượt Xem: 0</Text>
          <Text style={styles.infoText}>Trạng Thái: {bookData.status}</Text>
        </View>

        <DetailScreenFlatlist
          title={'Có thể bạn quan tâm'}
          data={allBooksData.filter((item, index) => 
            item.type === bookData.type
          )}
          renderView={renderView}
          onEvent={() => handleAllBook(bookData)}
        />
      </View>
    </ScrollView>
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
    height: '100%',
    width: windowWidth,
    resizeMode: 'cover',
  },
  backStyle: {
    position: 'absolute',
    marginTop: 20,
    marginLeft: 10,
  },
  bookContent: {
    position: 'absolute',
    height: '60%',
    width: '30%',
    bottom: 20,
    left: 10,
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
    fontWeight: 'bold',
    fontSize: 20,
    borderColor: 'white',
  },
  authorText: {
    fontSize: 18,
  },
  iconMenuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0.5,
    borderColor: 'gray',
    height: '10%',
  },
  botContent: {
    // height: '70%'
  },
  botTitleText: {
    fontSize: 20,
    fontWeight: '500',
  },
  introStyle: {
    margin: 20,
    borderColor: 'gray',
  },
  detailStyle: {
    margin: 20,
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
  infoText: {
    fontSize: 18
  },
})
