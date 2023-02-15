import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native'
import React from 'react'
import BookCard from './BookCard'
import {colors} from '../utils/Colors'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function BookListHorizon({
  data,
  title,
  allBookEvent,
  selectBookEvent,
}) {
  return (
    <View style={styles.Content}>
      <View style={styles.titleStyle}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={allBookEvent}>
          <Text style={styles.showAll}>Tất cả {'>'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={({item}) => (
          <BookCard
            bookData={item}
            selectBookEvent={() => selectBookEvent(item)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Content: {
    width: windowWidth,
    height: windowHeight / 2,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.gray,
  },
  titleStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: colors.gray,
  },
  showAll: {
    fontSize: 15,
    color: colors.gray,
  },
})
