import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ViewMoreText from 'react-native-view-more-text'

export default function MoreText({ content }) {

    const renderViewMore = onPress => {
        return (
            <Text style={styles.moreLessStyle} onPress={onPress}>
                Xem thêm
            </Text>
        )
    }

    const renderViewLess = onPress => {
        return (
            <Text style={styles.moreLessStyle} onPress={onPress}>
                Thu gọn
            </Text>
        )
    }

    return (
        <ViewMoreText
            numberOfLines={2}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}>
            <Text style={{ fontSize: 18 }}>{content}</Text>
        </ViewMoreText>
    )
}

const styles = StyleSheet.create({
    moreLessStyle: {
        fontSize: 17,
        fontWeight: '500'
    }
})