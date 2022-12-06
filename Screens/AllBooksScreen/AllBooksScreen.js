import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    SafeAreaView,
    Modal
} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBookData, getBookType } from '../../redux/actions/GetBookAction'
import Icon from 'react-native-vector-icons/Ionicons'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function AllBooksScreen({ navigation, route }) {
    const { params } = route
    const [modalVisible, setModalVisible] = useState(false);
    const [isAllBook, setIsAllBook] = useState(false)
    const dispatch = useDispatch()
    const { allBooksData, bookData } = useSelector(state => state.bookGetData)

    useEffect(() => {
        dispatch(getBookData())
        checkIfAllBook()
    }, [])

    const checkIfAllBook = () => {
        if (params.type === 'Tất Cả') {
            setIsAllBook(true)
        } else setIsAllBook(false)
    }

    const handleDetail = (item) => {
        dispatch(getBookType(item))
        navigation.navigate('DetailScreen')
    }

    const renderView = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleDetail(item)}
            style={styles.renderViewStyle}
        >
            <Image style={styles.flatListImg} source={item.image} />
            <Text style={styles.flatListTitle}>{item.title}</Text>
        </TouchableOpacity>
    )

    const handleFilterItem = () => {

    }

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            ></Modal>
            <View style={styles.topMenu}>
                <View style={styles.topContent}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Icon name="chevron-back-outline" size={35} color={'white'} />
                    </TouchableOpacity>
                    <Text style={styles.topTextStyle}>{bookData.type}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Icon name="filter-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={isAllBook ? allBooksData : allBooksData.filter(item => item.type === bookData.type)}
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
        fontWeight: '500'
    },
})