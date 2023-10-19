import { Key, Car } from 'phosphor-react-native'
import React from 'react'
import { Container, IconBox, Message, TextHighlight } from './styles'
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
    liscensePlate?: string | null;
}

export default function CarStatus({ liscensePlate = null, ...rest}: Props) {

    const theme = useTheme()

    const Icon = liscensePlate ? Key : Car
    const message = liscensePlate ? `Veiculo ${liscensePlate} em uso.` : `Nenhum veiculo em uso.`
    const status = liscensePlate ? 'Chegada':'Saida'
    return (
        <Container {...rest}>
            <IconBox>
                <Icon size={32}
                    color={theme.COLORS.BRAND_LIGHT} />
            </IconBox>
            <Message>
                {message}
                <TextHighlight>
                    Clique aqui para registrar a {status}
                </TextHighlight>
            </Message>
        </Container>
    )

}