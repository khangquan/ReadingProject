import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { colors } from '../utils/Colors'
import { IconString } from '../utils/Icon'

export default function UserMenu({title, iconName, onEvent}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onEvent} style={styles.content}>
        <View style={styles.circle}>
          <Icon name={iconName} size={20} color={colors.white} />
        </View>

        <Text style={styles.contentText}>{title}</Text>

        <Icon name={IconString.goForward} size={20} color={colors.primaryOrange} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  circle: {
    height: 35,
    width: 35,
    backgroundColor: colors.primaryOrange,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    width: '70%',
    fontSize: 20,
  },
})
