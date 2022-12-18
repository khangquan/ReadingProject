import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import Pdf from 'react-native-pdf'
import { useState } from 'react'

export default function ReadingScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [textSize, setTextSize] = useState(20)
    const [darkScreen, setDarkScreen] = useState(false)

    return (
        <View style={[styles.container, { backgroundColor: darkScreen ? 'black' : 'white' }]}>
            <View style={styles.topMenu}>
                <View style={styles.topContent}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Icon name="chevron-back-outline" size={35} color={darkScreen ? 'white' : '#FB7849'} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                    >
                        <Icon name='menu-outline' size={35} color={darkScreen ? 'white' : '#FB7849'} />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableWithoutFeedback onPressOut={() => { setModalVisible(!modalVisible) }}>

                    <View style={styles.rightView}>
                        <View style={styles.modalView}>

                            {/* Chỉnh tăng giảm font chữ */}
                            <Text style={styles.modalItemTitle}>Kích cỡ chữ:</Text>
                            <View style={styles.modalItemStyle}>
                                <TouchableOpacity onPress={() => setTextSize(textSize - 2)}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>A</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setTextSize(textSize + 3)}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>A</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Chỉnh dark/white mode */}
                            <Text style={styles.modalItemTitle}>Màu nền:</Text>
                            <View style={styles.modalItemStyle}>
                                <TouchableOpacity
                                    style={styles.bgclButton}
                                    onPress={() => setDarkScreen(false)}>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.bgclButton,{backgroundColor:'black'}]}
                                    onPress={() => setDarkScreen(true)}>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>


            <View style={styles.bookContentStyle}>
                <Text style={{ fontSize: textSize, color: darkScreen ? 'white' : 'black' }}>
                    Thực tập hạnh phúc
                    Theo tôi, hạnh phúc có nghĩa là ít đau khổ.Nếu không chuyển hóa
                    được đau khổ thì không thể nào có hạnh phúc.
                    Rất nhiều người đã đi tìm hạnh phúc từ bên ngoài, nhưng hạnh phúc
                    thật sự chỉ có thể có được tự bên trong.Theo lối sống bây giờ, người
                    ta cho rằng hạnh phúc là có thật nhiều tiền bạc, nhiều quyền lực và có
                    địa vị cao sang trong xã hội.Nhưng nếu nhìn cho kỹ thì sẽ thấy có rất
                    nhiều người giàu sang hay nổi tiếng mà vẫn đau khổ, mà vẫn tự tử.
                    Vào thời Bụt, Bụt và Tăng đoàn của Ngài, mỗi vị chẳng có gì ngoài ba
                    chiếc áo và một bình bát thế mà quý Ngài rất mực hạnh phúc bởi vì
                    quý Ngài đã đạt được một điều vô cùng quý báu, đó là tự do.
                </Text>
            </View>
        </View >


        /* <Pdf
            enablePaging={true}
            trustAllCerts={false}
            source={require('../../srcBooks/TonGiao/gian.pdf')}
            horizontal={true}
            onError={(error) => {
                console.log(error);
            }}
            onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf} />  */
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdf: {
        width: '100%',
        height: '100%'
    },
    topMenu: {
        height: '10%',
        width: '100%',
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: '100%',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    bookContentStyle: {
        alignItems: 'center',
        flex: 1,
        margin: 20
    },

    modalView: {
        height: 350,
        width: 250,
        marginTop: 20,
        marginRight: 10,
        backgroundColor: "#FCFAED",
        borderRadius: 20,
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    rightView: {
        flex: 1,
        alignItems: 'flex-end',
        margin: 20
    },

    modalItemTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    modalItemStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        marginBottom: 20
    },
    bgclButton: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1,
        marginVertical: 10,
    },
})