import React, { useRef } from 'react'
import { Container, Content } from './style'
import Header from '../../components/Header'
import LicensePlateInput from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'
import Button from '../../components/button'
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native'

const KeyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position'  
export default function Departure() {
  const descriptionRef = useRef<TextInput>(null)

  function handleDepartureRegister() {
    console.log('Registrar saída')
  }

  return (
    <Container>
      <Header title='Saída' />
      <KeyboardAvoidingView style={{flex:1}}behavior={KeyboardAvoidingViewBehavior}>
        <ScrollView>
          <Content>
            <LicensePlateInput label='Placa do veículo'
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType='next'
            />
            <TextAreaInput ref={descriptionRef} label='Finalidade'
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
            />
            <Button title='Registrar saída' onPress={handleDepartureRegister} />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  )
}