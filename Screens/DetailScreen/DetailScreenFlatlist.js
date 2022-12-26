import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
const windowHeight = Dimensions.get('window').height
const windownWidth = Dimensions.get('window').width

export default function DetailScreenFlatlist({
  data,
  renderView,
  title,
  onEvent,
}) {
  return (
    <View style={styles.Content}>
      <View style={styles.titleStyle}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onEvent}>
          <Text style={styles.showAll}>Tất cả {'>'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderView}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Content: {
    width: windownWidth,
    height: windowHeight / 2 - 40,
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
  },
  titleStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'gray',
  },
  showAll: {
    fontSize: 15,
    color: 'gray',
  },
})
