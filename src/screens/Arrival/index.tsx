import { useNavigation, useRoute } from "@react-navigation/native";
import { Container, Content, Description, Footer, Label, LicensePlate } from "./style";
import Header from "../../components/Header";
import Button from "../../components/button";
import ButtonIcon from "../../components/ButtonIcon";
import { X } from "phosphor-react-native";
import { Historic } from "../../libs/realm/schemas/historic";
import { BSON } from "realm";
import { useObject, useRealm } from "../../libs/realm";
import { Alert } from "react-native";


type RouteParamsProps ={ 
    id: string;
}
export default function Arrival() {
    const realm = useRealm()
    const route = useRoute()
    const {id} = route.params as RouteParamsProps
    const {goBack} = useNavigation()

    const historic = useObject(Historic, new BSON.UUID(id) as unknown as string) 

    function handleRemoveVehicleUsage(){
        Alert.alert(
            'Cancelar',
            'Cancelar a utilização do veiculo?',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: () => removeVehicleUsage()}
            ]
        )
    }

    function removeVehicleUsage(){
        realm.write(() => { 
            realm.delete(historic)
        })

        goBack()
    }

    function handleArrivalRegister(){
        try {
            if(!historic){
                return Alert.alert("Erro", "Não foi possivel obter os dados para registrar a chegada do veiculo")
            }
            
            realm.write(() => {
                historic.status = 'arrival' 
                historic.updated_at = new Date()
            })

            Alert.alert('Chegada', 'Chegada Registrada com sucesso !')
            goBack()
            
        } catch (error) {
            console.log(error)
            Alert.alert('Erro', 'Não foi possível registrar a chegada do veiculo')
            
        }
    }
    return (
        <Container>
            <Header title="Placa do veículo"/>
            <Content>
                <Label>Placa do veiculo</Label>
                <LicensePlate>
                     {historic?.license_plate}
                </LicensePlate>
                <Label>Finalidade</Label>
                <Description>
                    {historic?.description}
                </Description>
                <Footer>
                    <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage}/>
                    <Button  title="Registrar chegada" onPress={handleArrivalRegister}/>
                </Footer>
            </Content>

        </Container>
    )

}
