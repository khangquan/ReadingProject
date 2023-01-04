import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  Alert,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../src/defines/Colors'
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import {getBookType} from '../../redux/actions/GetBookAction'
import {editFavBook} from '../../redux/actions/AccountAction'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function FavBooksScreen({navigation}) {
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState([])
  const [edit, setEdit] = useState(false)
  const {currentUser} = useSelector(state => state.loginScreen)
  const {userAccounts} = useSelector(state => state.register)

  useEffect(() => {
    getCurrentUser()
  }, [])

  const getCurrentUser = () => {
    userAccounts.map(user => {
      if (user.email === currentUser) setUserInfo(user)
    })
  }

  const handleDetail = item => {
    dispatch(getBookType(item))
    navigation.navigate('DetailScreen')
  }

  const handleDeleteFavBook = item => {
    Alert.alert('Thông báo!', 'Bạn có muốn xóa khỏi danh sách yêu thích?', [
      {
        text: 'Yes',
        onPress: () => {
          dispatch(editFavBook({title: item.title}))
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ])
  }

  const renderView = ({item}) => (
    <>
      <TouchableOpacity
        disabled={edit ? true : false}
        onPress={() => handleDetail(item)}
        style={styles.renderViewStyle}>
        <Image
          blurRadius={edit ? 30 : 0}
          style={styles.flatListImg}
          source={item.image}
        />
        <Text style={styles.flatListTitle}>{item.title}</Text>

        {edit ? (
          <TouchableOpacity
            style={styles.iconDeleteStyle}
            onPress={() => handleDeleteFavBook(item)}>
            <Icon name="trash-outline" size={50} color="white" />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    </>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.topContent}>
          {edit ? (
            <TouchableOpacity onPress={() => setEdit(!edit)}>
              <Icon name="checkmark-outline" size={35} color={'white'} />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack()
                }}>
                <Icon name="chevron-back-outline" size={35} color={'white'} />
              </TouchableOpacity>
              <Text style={styles.topTextStyle}>Danh sách yêu thích</Text>

              <TouchableOpacity onPress={() => setEdit(!edit)}>
                <Icon name="create-outline" size={35} color={'white'} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <FlatList
        data={userInfo.favBookData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderView}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenu: {
    height: '10%',
    width: '100%',
    backgroundColor: colors.primaryOrange,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  topTextStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFF',
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
  iconDeleteStyle: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
  },
})
