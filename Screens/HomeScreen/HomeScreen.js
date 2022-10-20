import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { useState } from 'react'
import { ImageSlider } from "react-native-image-slider-banner";
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import HomeScreenFlatlist from './HomeScreenFlatlist'
import SachKinhTe from '../BookData/SachKinhTe'
import SachKyNang from '../BookData/SachKyNang'
import SachTonGiao from '../BookData/SachTonGiao'
import SachVanHoc from '../BookData/SachVanHoc'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function HomeScreen({ navigation, route }) {
  const [imgActive, setImgActive] = useState(0)

  const onchange = (onEvent) => {
    if (onEvent) {
      const slide = Math.ceil(onEvent.contentOffset.x / onEvent.layoutMeasurement.width);
      if (slide != imgActive) {
        setImgActive(slide)
      }
    }
  }

  const handleDetail = (route) => {
    navigation.navigate('DetailScreen', route)
  }

  const renderView = ({ item }) => (
    <TouchableOpacity
      onPress={() => { handleDetail(item) }}
      style={styles.renderViewStyle}
    >
      <Image style={styles.flatListImg} source={item.image} />
      <Text style={styles.flatListTitle}>{item.title}</Text>
      <Text style={styles.flatListAuthor}>{item.author}</Text>
    </TouchableOpacity>
  )

  const handleAllBook = (route) => {
    navigation.navigate('AllBooksScreen', route)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.topContent}>
          <TouchableOpacity>
            <Icon name="menu" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.topTextStyle}>Trang Chủ</Text>
          <TouchableOpacity>
            <Icon name="search" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {/* Image Slider */}
        <ImageSlider
          data={[
            {img: 'https://theme.hstatic.net/200000020612/1000524269/14/hmodule_banner_img2_1.jpg?v=768'},
            {img: 'https://bizweb.dktcdn.net/100/370/339/themes/744741/assets/slider_3_image.jpg?1632297125018'},
            {img: 'https://theme.hstatic.net/200000017360/1000763157/14/ms_banner_img5.jpg?v=112'},
            {img: 'https://theme.hstatic.net/200000510041/1000879666/14/hmodule_banner_img1_1.jpg?v=128'},
            {img: 'https://sunibooks.com/wp-content/uploads/2022/01/Banner-sach-giao-duc-2.png'},
          ]}
          autoPlay={true}
          preview={false}
          timer={4000}
          caroselImageContainerStyle={{width: windowWidth, height: windowHeight*0.25}}
          caroselImageStyle={{width: '100%', height: '100%', resizeMode: 'cover'}}
          indicatorContainerStyle={{bottom: 0}}
          closeIconColor="#fff"
        />

        {/* HomeScreen Flatlist */}
        {
          flatListData.map((item, index) => {
            return <HomeScreenFlatlist
              title={item.title}
              data={item.data}
              renderView={renderView}
              onEvent={() => handleAllBook(item)}
            />
          })
        }

      </ScrollView>
    </SafeAreaView>
  )
}

// const imagesSlider = [
//   require('../../assets/HomeScreen/imageslide1.jpg'),
//   require('../../assets/HomeScreen/imageslide2.jpg'),
//   require('../../assets/HomeScreen/imageslide3.jpg'),
//   require('../../assets/HomeScreen/imageslide4.jpg'),
//   require('../../assets/HomeScreen/imageslide5.jpg'),
// ]

const flatListData = [
  {
    title: 'Sách Kinh Tế',
    type: 'Kinh Tế',
    data: SachKinhTe.filter((item, index) => index < 5)
  },
  {
    title: 'Sách Kỹ Năng',
    type: 'Kỹ Năng',
    data: SachKyNang.filter((item, index) => index < 5)
  },
  {
    title: 'Sách Tôn Giáo',
    type: 'Tôn Giáo',
    data: SachTonGiao.filter((item, index) => index < 5)
  },
  {
    title: 'Sách Văn Học',
    type: 'Văn Học',
    data: SachVanHoc.filter((item, index) => index < 5)
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenu: {
    height: '10%',
    width: '100%',
    backgroundColor: '#FB7849',
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
