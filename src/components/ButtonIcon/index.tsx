import { Text, View } from 'react-native'
import {Container, Title} from './style'
import {TouchableOpacityProps} from 'react-native'
import { IconProps } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native';

export type IconBoxProps = (props: IconProps) => JSX.Element;

type Props = TouchableOpacityProps & {
  icon: IconBoxProps;
}

export default function ButtonIcon({icon:Icon, ...rest}: Props) {
  const {COLORS} = useTheme()
    return (
      <Container
        activeOpacity={0.7}
        {...rest}
       > 
       <Icon size={32}  color={COLORS.BRAND_MID}/>
      </Container>
    )

}