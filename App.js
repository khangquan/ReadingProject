import { LogBox, Platform, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './src/redux/store/Store'
import IntroScreen from './src/Screens/IntroScreen/IntroScreen';
import Navigator from './src/Navigation/Navigator';
import { createChannel } from './src/services/LocalNotification';
import { RemoteNotification } from './src/services/RemoteNotification';
import { useEffect } from 'react';

LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

export default function App() {
  useEffect(() => {
    createChannel()
    RemoteNotification()
  }, [])

  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          />
          {/* <Navigator /> */}
          <IntroScreen/>
        </PersistGate>
      </Provider>
    </PaperProvider>
  )
}
