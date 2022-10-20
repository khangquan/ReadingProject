import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  SafeAreaView
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const windowHeight = Dimensions.get('window').height
const windownWidth = Dimensions.get('window').width

export default function BooksTypeScreen({ navigation }) {
  const handleAllBook = (route) => {
    navigation.navigate('AllBooksScreen', route)
  }

  const renderView = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleAllBook(item)}
     style={styles.renderViewStyle}
     >
      <Image style={styles.flatListImg} source={item.image} />
      <View style={styles.flatListTextWrapper}>
        <Text style={styles.flatListTitle}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  )
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.topContent}>
          <TouchableOpacity>
            
          </TouchableOpacity>
          <Text style={styles.topTextStyle}>Thể Loại</Text>
          <TouchableOpacity>
            <Icon name="search" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderView}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const DATA = [
  {
    type: 'Văn Học',
    image: require('../../assets/BookTypeScreen/vanhoc.jpg')
  },
  {
    type: 'Tôn Giáo',
    image: require('../../assets/BookTypeScreen/tongiao.jpg')
  },
  {
    type: 'Kỹ Năng',
    image: require('../../assets/BookTypeScreen/kynang.jpg')
  },
  {
    type: 'Kinh Tế',
    image: require('../../assets/BookTypeScreen/kinhte.jpg')
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenu: {
    height: '10%',
    width: '100%',
    backgroundColor: '#FB7849',
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    height: '100%',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  topTextStyle: {
    //alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  renderViewStyle: {
    width: windownWidth / 2,
    height: windownWidth / 2,
    padding: 10,
  },
  flatListImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  flatListTextWrapper: {
    backgroundColor: 'gray',
    width: '80%',
    height: '20%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: '50%',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.4)'
  },
  flatListTitle: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
})