import { LogBox, Platform, StatusBar } from 'react-native'
import Navigator from './Navigation/Navigator'

import { Provider } from 'react-redux'
import store from './redux/store/Store'

import DetailScreen from './Screens/DetailScreen/DetailScreen'
import IntroScreen from './Screens/IntroScreen/IntroScreen'
import ReadingScreen from './Screens/ReadingScreen/ReadingScreen'

LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

export default function App() {
  // let configureStore = store()
  return (
    <Provider store={store}>
      <StatusBar
        barStyle={Platform.OS === 'ios'?'dark-content':'light-content'}
      />
      <IntroScreen />
      {/* <ReadingScreen/> */}
    </Provider>
  )
}
