import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width
const placeHolderImg = require('../../assets/Books/placeHolderImg.jpg')

export default function AllBookList({
  bookData,
  selectBookEvent,
}) {
  const renderAll = ({item}) => (
    <TouchableOpacity
      onPress={() => selectBookEvent(item)}
      style={styles.renderViewStyle}
    >
      <Image
        style={styles.flatListImg}
        source={!item.img ? {uri: item.image} : placeHolderImg}
      />
      <Text style={styles.flatListTitle}>{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.Content}>
      <FlatList
        data={bookData}
        renderItem={renderAll}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
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
    textAlign: 'center',
  },
})
