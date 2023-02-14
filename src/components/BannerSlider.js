import { View, Dimensions } from 'react-native'
import React from 'react'
import { ImageSlider } from 'react-native-image-slider-banner'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function BannerSlider() {
  return (
    <View>
      <ImageSlider
        localImg={true}
        data={[
          {
            img: require('../../assets/HomeScreen/imageslide1.jpg')
          },
          {
            img: require('../../assets/HomeScreen/imageslide2.jpg')
          },
          {
            img: require('../../assets/HomeScreen/imageslide3.jpg')
          },
          {
            img: require('../../assets/HomeScreen/imageslide4.jpg')
          },
          {
            img: require('../../assets/HomeScreen/imageslide5.jpg')
          },
        ]}
        autoPlay={true}
        preview={false}
        timer={4000}
        caroselImageContainerStyle={{
          width: windowWidth,
          height: windowHeight * 0.25,
        }}
        caroselImageStyle={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
        indicatorContainerStyle={{ bottom: 0 }}
      />
    </View>
  )
}