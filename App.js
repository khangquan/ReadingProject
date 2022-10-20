import { LogBox, Platform, StatusBar } from 'react-native'

import { Provider } from 'react-redux'
import store from './redux/store/Store'

import IntroScreen from './Screens/IntroScreen/IntroScreen'

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
