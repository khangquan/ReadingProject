import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import {colors} from '../utils/Colors'

const windowWidth = Dimensions.get('window').width

export default function SearchResult({bookData, selectBookEvent, searchValue}) {
  const renderSearch = ({item}) => {
    let lowerCaseValue = searchValue.toLowerCase()

    let title = item.title.toLowerCase()
    let removeTitleAccents = title
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
    let author = item.author.toLowerCase()
    let removeAuthorAccents = author
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')

    if (lowerCaseValue === '') {
      return null
    } else if (
      removeTitleAccents.includes(lowerCaseValue) ||
      removeAuthorAccents.includes(lowerCaseValue)
    ) {
      return (
        <TouchableOpacity
          onPress={() => selectBookEvent(item)}
          style={styles.renderViewStyle}
        >
          <Text style={styles.Title}>{item.title}</Text>
          <Text style={styles.Author}>{item.author}</Text>
        </TouchableOpacity>
      )
    }
  }

  return (
    <View style={styles.Content}>
      <FlatList
        data={bookData}
        keyExtractor={(item,index) => index.toString()}
        renderItem={renderSearch}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
  },
  renderViewStyle: {
    width: windowWidth - 30,
    alignSelf: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  Title: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '600',
    width: '100%',
  },
})
