import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function FavBooksScreen({navigation}) {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);
  const {currentUser} = useSelector(state => state.loginScreen);
  const {userAccounts} = useSelector(state => state.register);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    userAccounts.map(user => {
      if (user.email === currentUser) setUserInfo(user);
    });
  };

  const favBookData = userInfo.favBookData

  const renderView = ({item}) => (
    <TouchableOpacity onPress={() => {}} style={styles.renderViewStyle}>
      <Image style={styles.flatListImg} source={item.image} />
      <Text style={styles.flatListTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.topContent}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="chevron-back-outline" size={35} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.topTextStyle}>Danh sách yêu thích</Text>
        </View>
      </View>
      <FlatList
        data={favBookData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderView}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

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
    justifyContent: 'space-around',
    width: '80%',
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
});
