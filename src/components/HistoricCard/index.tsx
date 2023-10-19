import { Key, Car, Check, ClockClockwise } from 'phosphor-react-native'
import React from 'react'
import { Container,Departure, LicensePlate, Info } from './styles'
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';

export type HistoricCardProps = TouchableOpacityProps & {
    id: string;
    licensePlate: string | null;
    created: string;
    isSync: boolean;
}

type Props = TouchableOpacityProps & {
    data: HistoricCardProps;

}

export default function HistoricCard({ data,...rest}: Props) {

   const {COLORS} = useTheme()

   
    return (
        <Container {...rest}>
            <Info>
                <LicensePlate>
                    {data.licensePlate}
                </LicensePlate>
                <Departure>
                    {data.created}
                </Departure>
            </Info>
          {data.isSync ?
          <Check size={24} color={COLORS.BRAND_LIGHT}/>
          :
          <ClockClockwise size={24} color={COLORS.GRAY_400}/>
        }
        </Container>
    )

}