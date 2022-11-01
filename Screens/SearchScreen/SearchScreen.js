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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBookData, getBookType } from '../../redux/actions/GetBookAction';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch();
  const { allBooksData, bookData } = useSelector(state => state.bookGetData);

  useEffect(() => {
    dispatch(getBookData());
  }, []);

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([0]);

  const handleSearch = searchValue => {
    let bookData = allBooksData.filter(item => {
      let title = item.title.toLowerCase()
      let author = item.author.toLowerCase()
      let data = searchValue.toLowerCase()
      if (title.includes(data) || author.includes(data)) {
        return item;
      } else return 0
    });
    setSearchResult(bookData);
  };

  const handleDetail = (item) => {
    dispatch(getBookType(item))
    navigation.navigate('DetailScreen')
  }

  const renderView = ({ item }) => (
    <TouchableOpacity onPress={() => handleDetail(item)} style={styles.renderViewStyle}>
      <Image style={styles.flatListImg} source={item.image} />
      <Text style={styles.flatListTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.topContent}>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="chevron-back-outline" size={30} color="white" />
          </TouchableOpacity>

          <View style={styles.textInputWrapper}>
            <TextInput
              value={searchValue}

              onChangeText={text => setSearchValue(text)}
              style={styles.searchBoxStyle}
              placeholder="Tên sách, tác giả,... cần tìm"
            />

            {
              searchValue
                ?
                (
                  <TouchableOpacity
                    style={styles.clearInputStyle}
                    onPress={() => {
                      setSearchValue('');
                    }}
                  >
                    <Icon name="close-outline" size={30} />
                  </TouchableOpacity>
                ) : null
            }

            <TouchableOpacity
              style={styles.searchIconStyle}
              onPress={() => handleSearch(searchValue)}
            >
              <Icon name="search" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.botContent}>
        {
          searchResult.length === 0 ?
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={{ fontSize: 20 }}>Không tìm thấy sản phẩm phù hợp</Text>
            </View>
            :
            <FlatList
              data={searchResult}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderView}
              numColumns={3}
              showsVerticalScrollIndicator={false}
            />
        }


      </View>
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
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    //marginHorizontal: 10
  },
  topTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  searchBoxStyle: {
    padding: 10,
    width: '75%',
    borderRadius: 10,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '80%',
    marginRight: 20,
    borderRadius: 10,
  },
  clearInputStyle: {
    width: '10%',
  },
  searchIconStyle: {
    position: 'absolute',
    right: 0,
    width: '15%',
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
});
