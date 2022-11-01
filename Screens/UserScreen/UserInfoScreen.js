import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function UserInfoScreen({ navigation }) {
    const dispatch = useDispatch()
    const { email, password } = useSelector(state => state.loginScreen)

    const [showPass, setShowPass] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topMenu}>
                <View style={styles.topContent}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backStyle}>
                        <Icon name="chevron-back-outline" size={35} color={'white'} />
                    </TouchableOpacity>
                    <Text style={styles.topTextStyle}>Thông tin tài khoản</Text>
                </View>
            </View>

            <View style={styles.botContent}>
                <View>
                    <Icon name="person-circle-outline" size={150} />
                    <TouchableOpacity style={styles.editAvatar}>
                        <Icon name='create' size={25} color={'black'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}>Họ Tên: </Text>
                    <View style={styles.textBoxAndEdit}>
                        <TextInput style={styles.textBoxStyle} editable={false} />
                        <TouchableOpacity>
                            <Icon name='create' size={25} color={'black'} />
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}>Email: </Text>
                    <View style={styles.textBoxAndEdit}>
                        <TextInput style={styles.textBoxStyle} value={email} editable={false} />
                        <TouchableOpacity>
                            <Icon name='create' size={25} color={'black'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}>Password: </Text>
                    <View style={styles.textBoxAndEdit}>
                        <TextInput style={styles.textBoxStyle}
                            value={password}
                            editable={false}
                            secureTextEntry={showPass?true:false}
                        />
                        <TouchableOpacity onPress={()=>setShowPass(!showPass)}>
                            {
                                showPass?
                                <Icon name='eye' size={25} color={'black'} />
                                :
                                <Icon name='eye-off' size={25} color={'black'} />
                            }
                            
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name='create' size={25} color={'black'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
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
    botContent: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    editAvatar: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: '95%',
    },
    userInfoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    textBoxAndEdit: {
        backgroundColor: 'white',
        width: '70%',
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    textBoxStyle: {
        width: '80%',
        fontSize: 20,
        color: 'black'
    },
})