import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import Pdf from 'react-native-pdf'

export default function ReadingScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backStyle}>
                <Icon name="chevron-back-outline" size={35} color={'#FB7849'} />
            </TouchableOpacity>
            <Pdf
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
                style={styles.pdf} />

        </View>
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
    backStyle: {
        marginTop: 20,
        marginLeft: 20,
      },

})