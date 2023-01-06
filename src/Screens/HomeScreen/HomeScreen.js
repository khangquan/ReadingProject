import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import { ImageSlider } from 'react-native-image-slider-banner'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useEffect } from 'react'
import { colors } from '../../defines/Colors'
import FlatlistHorizon from '../../components/FlatlistHorizon'
import { useSelector, useDispatch } from 'react-redux'
import { getBookData, getBookType } from '../../redux/actions/GetBookAction'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function HomeScreen({ navigation, route }) {
  const dispatch = useDispatch()
  const { allBooksData } = useSelector(state => state.bookGetData)

  useEffect(() => {
    dispatch(getBookData())
  }, [])

  const handleDetail = item => {
    dispatch(getBookType(item))
    navigation.navigate('DetailScreen')
  }

  const handleAllBook = item => {
    dispatch(getBookType(item))
    navigation.navigate('AllBooksScreen', item)
  }

  const renderView = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        handleDetail(item)
      }}
      style={styles.renderViewStyle}>
      <Image style={styles.flatListImg} source={item.image} />
      <Text style={styles.flatListTitle}>{item.title}</Text>
      <Text style={styles.flatListAuthor}>{item.author}</Text>
    </TouchableOpacity>
  )

  const SachKinhTe = allBooksData.filter(item => item.type === 'Kinh Tế')
  const SachKyNang = allBooksData.filter(item => item.type === 'Kỹ Năng')
  const SachTonGiao = allBooksData.filter(item => item.type === 'Tôn Giáo')
  const SachVanHoc = allBooksData.filter(item => item.type === 'Văn Học')

  const flatListData = [
    {
      title: 'Sách Kinh Tế',
      type: 'Kinh Tế',
      data: SachKinhTe.filter((item, index) => index < 5),
    },
    {
      title: 'Sách Kỹ Năng',
      type: 'Kỹ Năng',
      data: SachKyNang.filter((item, index) => index < 5),
    },
    {
      title: 'Sách Tôn Giáo',
      type: 'Tôn Giáo',
      data: SachTonGiao.filter((item, index) => index < 5),
    },
    {
      title: 'Sách Văn Học',
      type: 'Văn Học',
      data: SachVanHoc.filter((item, index) => index < 5),
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.topContent}>
          <TouchableOpacity>
            <Icon name="menu" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.topTextStyle}>Trang Chủ</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchScreen')
            }}>
            <Icon name="search" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {/* Image Slider */}
        <ImageSlider
          data={[
            {
              img: 'https://theme.hstatic.net/200000020612/1000524269/14/hmodule_banner_img2_1.jpg?v=768',
            },
            {
              img: 'https://bizweb.dktcdn.net/100/370/339/themes/744741/assets/slider_3_image.jpg?1632297125018',
            },
            {
              img: 'https://theme.hstatic.net/200000017360/1000763157/14/ms_banner_img5.jpg?v=112',
            },
            {
              img: 'https://theme.hstatic.net/200000510041/1000879666/14/hmodule_banner_img1_1.jpg?v=128',
            },
            {
              img: 'https://sunibooks.com/wp-content/uploads/2022/01/Banner-sach-giao-duc-2.png',
            },
          ]}
          autoPlay={true}
          preview={false}
          timer={4000}
          caroselImageContainerStyle={{
            width: windowWidth,
            height: windowHeight * 0.25,
          }}
          caroselImageStyle={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          indicatorContainerStyle={{ bottom: 0 }}
        />

        {/* HomeScreen Flatlist */}
        {flatListData.map((item, index) => {
          return (
            <FlatlistHorizon
              title={item.title}
              data={item.data}
              renderView={renderView}
              onEvent={() => handleAllBook(item)}
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenu: {
    height: '10%',
    width: '100%',
    backgroundColor: colors.primaryOrange,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    height: '100%',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  topTextStyle: {
    //alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  botContent: {
    flex: 2,
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
  flatListTitle: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  flatListAuthor: {
    width: '100%',
    textAlign: 'center',
  },
})
