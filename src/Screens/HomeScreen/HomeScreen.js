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
import React, { useEffect } from 'react'
import FlatlistHorizon from '../../components/FlatlistHorizon'
import { useSelector, useDispatch } from 'react-redux'
import { getBookData, getBookType, getBookDataAPI } from '../../redux/actions/GetBookAction'
import BannerSlider from '../../components/BannerSlider'
import HeaderBar from '../../components/HeaderBar'
import Icon from 'react-native-vector-icons/Ionicons'

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
      onPress={() => handleDetail(item)}
      style={styles.renderViewStyle}>
      <Image style={styles.flatListImg} source={{ uri: item.image }} />
      <Text style={styles.flatListTitle}>{item.title}</Text>
      <Text style={styles.flatListAuthor}>{item.author}</Text>
    </TouchableOpacity>
  )

  const SachKinhTe = allBooksData.filter(item => item.type === "Kinh Tế")
  const SachKyNang = allBooksData.filter(item => item.type === "Kỹ Năng")
  const SachTonGiao = allBooksData.filter(item => item.type === "Tôn Giáo")
  const SachVanHoc = allBooksData.filter(item => item.type === "Văn Học")

  const flatListData = [
    {
      title: "Sách Kinh Tế",
      type: "Kinh Tế",
      data: SachKinhTe.filter((item, index) => index < 5),
    },
    {
      title: "Sách Kỹ Năng",
      type: "Kỹ Năng",
      data: SachKyNang.filter((item, index) => index < 5),
    },
    {
      title: "Sách Tôn Giáo",
      type: "Tôn Giáo",
      data: SachTonGiao.filter((item, index) => index < 5),
    },
    {
      title: "Sách Văn Học",
      type: "Văn Học",
      data: SachVanHoc.filter((item, index) => index < 5),
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar 
      title = {'Trang Chủ'}
      leftItem = {'menu'}
      rightItem = {'search'}
      onRightEvent = {() => navigation.navigate('SearchScreen')}
      />

      <ScrollView>
        <BannerSlider />
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
    resizeMode: 'cover'
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
