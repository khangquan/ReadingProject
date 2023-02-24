import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import { colors } from '../utils/Colors'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

export default function HeaderBar({
    leftItem,
    title,
    rightItem,
    onLeftEvent,
    onRightEvent,
    isLeftBlank,
    isRightBlank,
}) {
    return (
        <View style={styles.topMenu}>
            <View style={styles.topContent}>
                <TouchableOpacity onPress={onLeftEvent}>
                    <Icon name={leftItem} size={30} 
                    color={isLeftBlank?colors.primaryOrange:colors.white} 
                    />
                </TouchableOpacity>

                <Text style={styles.topTextStyle}>{title}</Text>
                
                <TouchableOpacity onPress={onRightEvent}>
                    <Icon name={rightItem} size={30}
                     color={isRightBlank?colors.primaryOrange:colors.white} 
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topMenu: {
        height: '10%',
        width: '100%',
        backgroundColor: colors.primaryOrange
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    topTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
    },
})