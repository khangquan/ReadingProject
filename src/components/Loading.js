import { View, ActivityIndicator, Dimensions } from 'react-native'
import { colors } from '../defines/Colors'
import { useState } from 'react'

import React from 'react'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function Loading() {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ActivityIndicator
                size="large"
                color={colors.primaryOrange}
                animating={true}
            />
        </View>
    )
}