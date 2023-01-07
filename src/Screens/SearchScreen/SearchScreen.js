import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { colors } from '../../defines/Colors'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBookData, getBookType } from '../../redux/actions/GetBookAction'
import SearchBar from '../../components/SearchBar'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch()
  const { allBooksData, bookData } = useSelector(state => state.bookGetData)

  useEffect(() => {
    dispatch(getBookData())
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

  const renderView = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleDetail(item)}
      style={styles.renderViewStyle}>
      <Image style={styles.flatListImg} source={{ uri: item.image }} />
      <Text style={styles.flatListTitle}>{item.title}</Text>
    </TouchableOpacity>
  )

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
          <FlatList
            data={searchResult}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderView}
            numColumns={3}
            showsVerticalScrollIndicator={false}
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
  renderViewStyle: {
    width: windowWidth / 3,
    height: windowWidth / 2,
    marginBottom: 60,
    padding: 10,
  },
  flatListImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  flatListTitle: {
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: '500',
  },
})
