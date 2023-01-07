import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Modal,
} from 'react-native'
import React from 'react'
import { colors } from '../../defines/Colors'
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBookData, getBookType} from '../../redux/actions/GetBookAction'
import HeaderBar from '../../components/HeaderBar'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function AllBooksScreen({navigation, route}) {
  const {params} = route
  const [modalVisible, setModalVisible] = useState(false)
  const [isAllBook, setIsAllBook] = useState(false)
  const dispatch = useDispatch()
  const {allBooksData, bookData} = useSelector(state => state.bookGetData)

  useEffect(() => {
    dispatch(getBookData())
    checkIfAllBook()
  }, [])

  const checkIfAllBook = () => {
    if (params.type === 'Tất Cả') {
      setIsAllBook(true)
    } else setIsAllBook(false)
  }

  const handleDetail = item => {
    dispatch(getBookType(item))
    navigation.navigate('DetailScreen')
  }

  const renderView = ({item}) => (
    <TouchableOpacity
      onPress={() => handleDetail(item)}
      style={styles.renderViewStyle}>
      <Image style={styles.flatListImg} source={{uri:item.image}} />
      <Text style={styles.flatListTitle}>{item.title}</Text>
    </TouchableOpacity>
  )

  const handleFilterItem = item => {
    if (item === 'viewDecrease') {
      allBooksData.sort((a, b) => (a.views < b.views ? 1 : -1))
    } else if (item === 'viewIncrease') {
      allBooksData.sort((a, b) => (a.views > b.views ? 1 : -1))
    } else if (item === 'a-z') {
      allBooksData.sort((a, b) => (a.title > b.title ? 1 : -1))
    } else {
      allBooksData.sort((a, b) => (a.title < b.title ? 1 : -1))
    }

    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Hiển thị cửa sổ lọc danh mục sách */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.filterModal}>
          <View style={styles.modalStyle}>
            {filterData.map(item => (
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => handleFilterItem(item.value)}>
                <Text style={styles.filterText}>{item.title}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <HeaderBar 
        title={bookData.type}
        leftItem={'chevron-back-outline'}
        onLeftEvent={() => navigation.goBack()}
        rightItem={'filter-outline'}
        onRightEvent={() => setModalVisible(!modalVisible)}
      />

      <FlatList
        data={
          isAllBook
            ? allBooksData
            : allBooksData.filter(item => item.type === bookData.type)
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderView}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const filterData = [
  {
    title: 'Lượt xem giảm dần',
    value: 'viewDecrease',
  },
  {
    title: 'Lượt xem tăng dần',
    value: 'viewIncrease',
  },
  {
    title: 'Tên sách A - Z',
    value: 'a-z',
  },
  {
    title: 'Tên sách Z - A',
    value: 'z-a',
  },
]

const styles = StyleSheet.create({
  container: {
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
  },
  filterModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalStyle: {
    margin: 20,
    backgroundColor: colors.primaryOrange,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  filterButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
  },
  filterText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeModal: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: 'white',
    height: 30,
    width: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModalText: {
    color: colors.primaryOrange,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
