import { StatusBar } from "expo-status-bar";
import { Alert, Text, View } from "react-native";
import { Container, Title, Slogan } from "./style";
import backGroundIMG from '../../assets/background.png';
import HeaderHome from "../../components/headerHome";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  return (
    <Container >
      <HeaderHome />
    </Container>
  );
}