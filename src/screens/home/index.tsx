import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, Text, View } from "react-native";
import { Container, Content, Label, Title } from "./style";
import backGroundIMG from '../../assets/background.png';
import HeaderHome from "../../components/headerHome";
import { useNavigation } from "@react-navigation/native";
import CarStatus from "../../components/CarStatus";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/historic";
import { useEffect, useState } from "react";
import HistoricCard, { HistoricCardProps } from "../../components/HistoricCard";
import dayjs from "dayjs";
import { useUser } from "@realm/react";
import { getLastSyncTimeStamp, saveLastSyncTimeStamp } from "../../libs/asyncStorage/syncStorage";

export default function Home() {

  const realm = useRealm()
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([])
  const { navigate } = useNavigation()

  const historic = useQuery(Historic)
  const user = useUser()

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível carregar os dados')
    }
  }

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate('arrival', { id: vehicleInUse?._id.toString() })
    }
    navigate('departure')
  }

  async function fetchHistoric() {
    try {
      const arrival = historic.filtered("status = 'arrival' SORT(created_at DESC)")
      const lastSync = await getLastSyncTimeStamp()
      const formatedHistoric = arrival.map((item) => {
        return ({
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: false,
          created: dayjs(item.created_at).format('[saida em] DD/MM/YYYY [as] HH:mm')
        })
      })
      setVehicleHistoric(formatedHistoric)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível carregar o historico')
    }

  }

  function handleHistoricDetails(id: string) {
    navigate('arrival', { id })

  }

 async function addProgressNotification(tranferred:number, tranferable: number) {
    const percentege = (tranferred / tranferable) * 100

    if(percentege === 100) {
      await saveLastSyncTimeStamp()
      fetchHistoric()
    }

  }
  useEffect(() => {
    fetchVehicleInUse()
  }, [])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())
    return () => {
      if (!realm.isClosed && realm) {
        realm.removeListener('change', () => fetchVehicleInUse())
      }

    }
  }, [])

  useEffect(() => {
    fetchHistoric()
  }, [historic])

  useEffect(() => {
    const syncSession =  realm.syncSession
    if(syncSession) {
      syncSession.addProgressNotification(Realm.ProgressDirection.Upload, Realm.ProgressMode.ReportIndefinitely,addProgressNotification  )
    }
    return () => { syncSession?.removeProgressNotification(addProgressNotification) }
   }, [vehicleHistoric])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm.objects('Historic').filtered(`user_id = '${user!.id}'`)
      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user' })
    })
  }, [])
  return (
    <Container >
      <HeaderHome />
      <Content>
        <CarStatus liscensePlate={vehicleInUse?.license_plate} onPress={handleRegisterMovement} />
        <Title> Histórico</Title>
        <FlatList
          data={vehicleHistoric}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <HistoricCard data={item} onPress={() => handleHistoricDetails(item.id)} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={(
            <Label>
              Não há registros de saída
            </Label>
          )}
        />

      </Content>
    </Container>
  );
}