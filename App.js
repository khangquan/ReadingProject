import { LogBox, Platform, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './redux/store/Store'
import IntroScreen from './Screens/IntroScreen/IntroScreen'
import Navigator from './Navigation/Navigator'
import CreateNewPassScreen from './Screens/ForgotPassScreen/CreateNewPassScreen'

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
      </PersistGate>
    </Provider>
  )
}
