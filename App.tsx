  import 'react-native-get-random-values'

import { AppProvider, UserProvider } from '@realm/react'
import Signin from './src/screens/signin';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme/index';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Loading from './src/components/Loading';
import { REALM_APP_ID } from '@env';
import Home from './src/screens/home';
import { Routes } from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RealmProvider, syncConfig } from './src/libs/realm';
import  './src/libs/dayjs'
import TopMessage from './src/components/TopMesage';
import { WifiSlash } from 'phosphor-react-native';
import { useNetInfo } from '@react-native-community/netinfo';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const netInfo = useNetInfo()

  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
       
      <SafeAreaProvider style={{flex:1, backgroundColor:theme.COLORS.GRAY_800}}>
        <StatusBar style='light' translucent={true} backgroundColor='transparent' ></StatusBar>
        { !netInfo.isConnected &&
          <TopMessage title='Voce está offLine'
                      icon={WifiSlash}
          />
        }
        <UserProvider fallback={Signin}>
          <RealmProvider sync={syncConfig} fallback={Loading}>
          <Routes />
          </RealmProvider>
        </UserProvider>
      </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
