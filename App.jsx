/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  useColorScheme,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {BannerAd, AppOpenAdProvider, TestIds} from '@react-native-admob/admob';
import HomePage from './src/screen/HomePage';
import NavigationMenu from './src/navigation';

function App() {
  return (
    <AppOpenAdProvider
      unitId={'ca-app-pub-8389654504160551/3430791500'}
      options={{
        showOnColdStart: true,
        loadOnDismissed: true,
      }}>
      <NavigationContainer>
        <NavigationMenu />
      </NavigationContainer>
    </AppOpenAdProvider>
  );
}

export default App;
