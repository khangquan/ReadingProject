import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Navigator from '../../Navigation/Navigator'
import { colors } from '../../utils/Colors'
import { IconString } from '../../utils/Icon'
import AppIntroSlider from 'react-native-app-intro-slider'
import Icon from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native';

export default function IntroScreen() {
  const [showRealApp, setShowRealApp] = useState(false)
  const { isFirstRun } = useSelector(state => state.loginScreen)

  const renderView = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.introStyle}>
        <LottieView source={item.image} autoPlay loop />
      </View>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  )

  const renderNextButton = () => (
    <View style={styles.buttonCircle}>
      <Icon name={IconString.arrowForward} color={colors.primaryOrange} size={50} />
    </View>
  )

  const renderDoneButton = () => (
    <View style={styles.buttonCircle}>
      <Icon name={IconString.checkmarkCircle} color={colors.primaryOrange} size={50} />
    </View>
  )

  const renderSkipButton = () => (
    <View style={styles.buttonSkip}>
      <Text style={styles.skip}>Bỏ Qua</Text>
    </View>
  )

  const onDone = () => {
    setShowRealApp(true)
  }

  const onSkip = () => {
    setShowRealApp(true)
  }



  if (showRealApp || !isFirstRun) {

    return <Navigator />

  } else {
    return (

      <AppIntroSlider
        renderItem={renderView}
        data={slides}
        onDone={onDone}
        onSkip={onSkip}
        showSkipButton={true}
        renderSkipButton={renderSkipButton}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
      />
    )
  }
}

const slides = [
  {
    key: 1,
    text: 'Đọc sách mọi lúc mọi nơi',
    image: require('../../../assets/IntroScreen/intro1.json'),
  },
  {
    key: 2,
    text: 'Chia sẻ với tất cả người thân của bạn',
    image: require('../../../assets/IntroScreen/intro2.json'),
  },
  {
    key: 3,
    text: 'Kho sách với hơn 10 ngàn tựa sách chỉ với một cú click!',
    image: require('../../../assets/IntroScreen/intro3.json'),
  },
]

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: colors.introColor,
  },
  text: {
    width: '80%',
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.primaryOrange,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 100
  },
  buttonCircle: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skip: {
    color: colors.primaryOrange,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonSkip: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  }
})
