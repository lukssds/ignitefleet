import React from 'react'

import { Container, Title } from './styles'
import { IconBoxProps } from '../ButtonIcon'
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    icon?: IconBoxProps;
    title: string;
}

export default function TopMessage({ icon: Icon, title }: Props) {

    const insents = useSafeAreaInsets()

    const paddingTop = insents.top + 5

    const { COLORS } = useTheme()

    return (
        <Container style={{paddingTop}}>
            {Icon && <Icon size={24} color={COLORS.BRAND_MID} />}
            <Title>{title}</Title>
        </Container>
    )

}

