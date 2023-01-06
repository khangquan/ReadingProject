import { LogBox, Platform, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './src/redux/store/Store'
import IntroScreen from './src/Screens/IntroScreen/IntroScreen';
import Navigator from './src/Navigation/Navigator';
import Loading from './src/components/Loading';
import CreateNewPassScreen from './src/Screens/ForgotPassScreen/CreateNewPassScreen'

LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <Navigator />
        {/* <Loading/> */}
      </PersistGate>
    </Provider>
  )
}
