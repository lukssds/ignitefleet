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
import { RealmProvider } from './src/libs/realm';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style='light' translucent={true} backgroundColor='transparent' ></StatusBar>
        <UserProvider fallback={Signin}>
          <RealmProvider>
          <Routes />
          </RealmProvider>
        </UserProvider>
      </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
