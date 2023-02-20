import {StyleSheet, Text, View, SafeAreaView} from 'react-native'
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBookAPI, getBookType} from '../../redux/actions/GetBookAction'
import SearchBar from '../../components/SearchBar'
import SearchResult from '../../components/SearchResult'

export default function SearchScreen({navigation}) {
  const dispatch = useDispatch()
  const {allBooksData} = useSelector(state => state.bookGetData)

  useEffect(() => {
    dispatch(getBookAPI())
  }, [])

  const [searchValue, setSearchValue] = useState('')

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
      />

      <SearchResult
        bookData={allBooksData}
        selectBookEvent={item => handleDetail(item)}
        searchValue={searchValue}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
