import { StatusBar } from "expo-status-bar";
import { Alert, Text, View } from "react-native";
import { Container, Title, Slogan } from "./style";
import backGroundIMG from '../../assets/background.png';
import Button from "../../components/button";
import * as webBrowser from 'expo-web-browser'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { useEffect, useState } from "react";

import { Realm, useApp } from '@realm/react';

GoogleSignin.configure();

webBrowser.maybeCompleteAuthSession();

interface UserInfo {
  idToken: string | null;
  scopes?: string[] | undefined | null;
  user:{
    id: string ;
    name: string | null;
    email: string | null;
    photo: string | null;
    [Symbol.iterator]?: () => IterableIterator<any>;
  }

}


export default function Signin() {


const [isAuthenticating, setIsAuthenticating] = useState(false);
const [userInfo, setUserInfo] = useState<UserInfo>({ idToken: '', scopes: [], user: { id: '', name: '', email: '', photo: '' } });
const app = useApp();

async function googleSignin(){
  try {
    await GoogleSignin.hasPlayServices();
    const user= await GoogleSignin.signIn()

    setUserInfo(user)
    console.log('USERINFO')
    

  } catch (error) {
     console.log("ERRO AO LOGAR NO GOOGLE",error)
  }
}


useEffect(() => {
  GoogleSignin.configure({ 
    webClientId: EXPO_CLIENT_ID,
    offlineAccess: true,  });
  
}, [])
 
useEffect(() => {
  if(userInfo?.idToken !== '' && userInfo?.idToken !== null){
    const credentials = Realm.Credentials.jwt(userInfo.idToken);
  
    app.logIn(credentials).catch((error) => {
      console.log("🚀 ~ file: index.tsx:84 ~ useEffect ~ error:", error)
      Alert.alert(`erro ao logar ${error}`)
    })
  }
}, [userInfo])


  return (
    <Container source={backGroundIMG}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veiculos</Slogan>
      <Button title="Entrar com google" isLoading={isAuthenticating} onPress={googleSignin}/>
    </Container>
  );
}