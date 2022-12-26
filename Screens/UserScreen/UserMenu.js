import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'

export default function UserMenu({title, iconName, onEvent}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onEvent} style={styles.content}>
        <View style={styles.circle}>
          <Icon name={iconName} size={20} color="white" />
        </View>

        <Text style={styles.contentText}>{title}</Text>

        <Icon name="chevron-forward-outline" size={20} color="#FB7849" />
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
    borderBottomColor: 'lightgray',
    backgroundColor: 'white',
  },
  circle: {
    height: 35,
    width: 35,
    backgroundColor: '#FB7849',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    width: '70%',
    fontSize: 20,
  },
})
