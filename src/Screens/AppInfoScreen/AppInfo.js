import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import HeaderBar from '../../components/HeaderBar'

export default function AppInfo({ navigation }) {
    return (
        <View style={styles.container}>
            <HeaderBar
                title={'Thông Tin Ứng Dụng'}
                leftItem={'chevron-back-outline'}
                onLeftEvent={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <Text style={styles.text}>Reading App là ứng dụng mang đến trải nghiệm đọc sách tuyệt vời.</Text>
                <Text style={styles.text}>- Đọc sách miễn phí không giới hạn</Text>
                <Text style={styles.text}>- Sách, truyện update từng ngày</Text>
                <Text style={styles.text}>- Giao diện thân thiện, dễ sử dụng</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content : {
        flex: 1,
        padding: 10
    },
    text: {
        fontSize: 20,

    }
})