import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native'
import React from 'react'
import { colors } from '../../defines/Colors'
import { useDispatch } from 'react-redux'
import { getBookType } from '../../redux/actions/GetBookAction'
import HeaderBar from '../../components/HeaderBar'

const windowHeight = Dimensions.get('window').height
const windownWidth = Dimensions.get('window').width

export default function BooksTypeScreen({ navigation }) {
  const dispatch = useDispatch()

  const handleAllBook = item => {
    dispatch(getBookType(item))
    navigation.navigate('AllBooksScreen', item)
  }

  const renderView = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleAllBook(item)}
      style={styles.renderViewStyle}>
      <Image style={styles.flatListImg} source={item.image} />
      <View style={styles.flatListTextWrapper}>
        <Text style={styles.flatListTitle}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title={"Thể Loại"}/>
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
    image: require('../../../assets/BookTypeScreen/vanhoc.jpg'),
  },
  {
    type: 'Tôn Giáo',
    image: require('../../../assets/BookTypeScreen/tongiao.jpg'),
  },
  {
    type: 'Kỹ Năng',
    image: require('../../../assets/BookTypeScreen/kynang.jpg'),
  },
  {
    type: 'Kinh Tế',
    image: require('../../../assets/BookTypeScreen/kinhte.jpg'),
  },
  {
    type: 'Tất Cả',
    image: require('../../../assets/BookTypeScreen/tatca.jpg'),
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
  },
  flatListTitle: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
})
