import React, { useRef, useState } from 'react'
import { Container, Content } from './style'
import Header from '../../components/Header'
import {LicensePlateInput} from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'
import Button from '../../components/button'
import { Alert, ScrollView, TextInput } from 'react-native'
import { validateLicensePlate } from '../../util/licensePlateValidate'
import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/historic'
import { useUser } from '@realm/react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Departure() {

  const [description,   setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistring, setIsRegistring] = useState(false)

  const realm = useRealm()

  const {goBack} = useNavigation()

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)

  const user = useUser()


  function handleDepartureRegister() {
    try {
      if(!validateLicensePlate(licensePlate)){
        licensePlateRef.current?.focus()
        return Alert.alert('Placa inválida', 'A placa informada não é válida')
      }
      if(description.trim().length == 0){
        descriptionRef.current?.focus()
        return Alert.alert('Finalidade inválida', 'A finalidade informada não é válida')
      }
      setIsRegistring(true)

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id:user!.id,
          license_plate: licensePlate.toUpperCase(),
          description
        }))
      })
      Alert.alert('Sucesso', 'Saída registrada com sucesso')
      goBack()
    } catch (error) {
      setIsRegistring(true)

      console.log(error)
      Alert.alert('Erro', 'Não foi possível registrar a saída')
    }
    

  }

  return (
    <Container>
      <Header title='Saída' />
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
            <LicensePlateInput label='Placa do veículo'
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType='next'
              onChangeText={setLicensePlate}
              ref={licensePlateRef}
            />
            <TextAreaInput ref={descriptionRef} label='Finalidade'
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              onChangeText={setDescription}
            />
            <Button title='Registrar saída' onPress={handleDepartureRegister} isLoading={isRegistring}/>
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  )
}