import { StatusBar } from "expo-status-bar";
import { Alert, Text, View } from "react-native";
import { Container, Content } from "./style";
import backGroundIMG from '../../assets/background.png';
import HeaderHome from "../../components/headerHome";
import { useNavigation } from "@react-navigation/native";
import CarStatus from "../../components/CarStatus";

export default function Home() {
  
  const  {navigate} = useNavigation()

  function handleRegisterMovement() {
    navigate('departure')
  }
  return (
    <Container >
      <HeaderHome />
      <Content>
        <CarStatus onPress={handleRegisterMovement} />
      </Content>
    </Container>
  );
}