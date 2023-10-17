import { Text, View } from 'react-native'
import {Container, Title} from './style'
import {TouchableOpacityProps} from 'react-native'
import { isLoading } from 'expo-font'
import Loading from '../Loading'

type Props = TouchableOpacityProps & {
    title: string;
    isLoading?:boolean;
 }

export default function Button({title, isLoading, ...rest}: Props) {

    return (
      <Container
        activeOpacity={0.7}
        disabled={isLoading}
        {...rest}
       > 
       {isLoading ? (
        <Loading/>  ) : (
          <Title>{title}</Title>)
        }
      </Container>
    )

}