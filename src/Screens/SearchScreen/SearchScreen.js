import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBookAPI, getBookType } from '../../redux/actions/GetBookAction'
import SearchBar from '../../components/SearchBar'
import AllBookList from '../../components/AllBookList'

export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch()
  const { allBooksData, bookData } = useSelector(state => state.bookGetData)

  useEffect(() => {
    dispatch(getBookAPI())
  }, [])

  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([0])

  const handleSearch = searchValue => {
    let bookData = allBooksData.filter(item => {
      let title = item.title.toLowerCase()
      let author = item.author.toLowerCase()
      let searchData = searchValue.toLowerCase()
      if (title.includes(searchData) || author.includes(searchData)) {
        return item
      } else return 0
    })
    setSearchResult(bookData)
  }

  const handleDetail = item => {
    dispatch(getBookType(item))
    navigation.navigate('DetailScreen')
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        goBackEvent={() => navigation.goBack()}
        onChangeText={text => setSearchValue(text)}
        searchValue={searchValue}
        setSearchEvent={() => setSearchValue('')}
        searchEvent={() => handleSearch(searchValue)}
      />

      <View style={styles.botContent}>
        {searchResult.length === 0 ? (
          <View
            style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ fontSize: 20 }}>Không tìm thấy sản phẩm phù hợp</Text>
          </View>
        ) : (
          <AllBookList 
            bookData={searchResult}
            selectBookEvent={(item) => handleDetail(item)}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  botContent: {
    height: '100%',
    width: '100%',
  },
  resultStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  resultTextStyle: {
    fontSize: 20,
  },
})
