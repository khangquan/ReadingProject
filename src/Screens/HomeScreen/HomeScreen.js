import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { getBookType, getBookAPI } from '../../redux/actions/GetBookAction'

import BannerSlider from '../../components/BannerSlider'
import HeaderBar from '../../components/HeaderBar'
import BookListHorizon from '../../components/BookListHorizon'

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const { allBooksData } = useSelector(state => state.bookGetData)

  useEffect(() => {
    dispatch(getBookAPI())
  }, [])

  const handleDetail = item => {
    dispatch(getBookType(item))
    navigation.navigate('DetailScreen', item)
  }

  const handleAllBook = item => {
    dispatch(getBookType(item))
    navigation.navigate('AllBooksScreen', item)
  }

  const SachKinhTe = allBooksData.filter(item => item.type === "Kinh Tế")
  const SachKyNang = allBooksData.filter(item => item.type === "Kỹ Năng")
  const SachTonGiao = allBooksData.filter(item => item.type === "Tôn Giáo")
  const SachVanHoc = allBooksData.filter(item => item.type === "Văn Học")

  const flatListData = [
    {
      id: 1,
      title: "Sách Kinh Tế",
      type: "Kinh Tế",
      data: SachKinhTe.filter((item, index) => index < 5),
    },
    {
      id: 2,
      title: "Sách Kỹ Năng",
      type: "Kỹ Năng",
      data: SachKyNang.filter((item, index) => index < 5),
    },
    {
      id: 3,
      title: "Sách Tôn Giáo",
      type: "Tôn Giáo",
      data: SachTonGiao.filter((item, index) => index < 5),
    },
    {
      id: 4,
      title: "Sách Văn Học",
      type: "Văn Học",
      data: SachVanHoc.filter((item, index) => index < 5),
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title={'Trang Chủ'}
        rightItem={'search'}
        onRightEvent={() => navigation.navigate('SearchScreen')}
      />

      <ScrollView>
        <BannerSlider />
        {flatListData.map((item, index) => {
          return (
            <BookListHorizon
              title={item.title}
              data={item.data}
              allBookEvent={() => handleAllBook(item)}
              selectBookEvent={(item) => handleDetail(item)}
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
})
