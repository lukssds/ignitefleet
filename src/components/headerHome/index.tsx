import React, { Component } from 'react'
import { Container, Greenting, Message, Name,Picture } from './styles'
import { Power } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import theme from '../../theme'
import { useUser, useApp } from '@realm/react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HeaderHome() {

  const user = useUser()
  const app = useApp()
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 32

  function handleLogout() {
    app.currentUser?.logOut()
  }

  return (
    <Container style={{paddingTop}}>
      <Picture source={{uri: user?.profile.pictureUrl}}
        placeHolder='L184i9offQof00ayfQay~qj[fQj['
      />
      <Greenting>
        <Message>
          Olá
        </Message>
        <Name>{user?.profile.name}</Name>
      </Greenting>
      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  )

}
