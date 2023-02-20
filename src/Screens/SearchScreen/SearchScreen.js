import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBookAPI, getBookType } from '../../redux/actions/GetBookAction'
import SearchBar from '../../components/SearchBar'
import AllBookList from '../../components/AllBookList'

export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch()
  const { allBooksData } = useSelector(state => state.bookGetData)

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

      <View style={styles.botContent}>
        <AllBookList
          bookData={allBooksData}
          isSearchScreen={true}
          searchValue={searchValue}
          selectBookEvent={item => handleDetail(item)}
        />
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
