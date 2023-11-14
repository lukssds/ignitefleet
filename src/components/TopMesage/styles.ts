import styled from 'styled-components/native';
import theme from '../../theme';
import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

export const Container= styled.View`
    flex-direction:row;
    z-index:1;
    width: ${dimensions.width}px;
    padding-bottom:5px;
    position: absolute;
    align-items:center;
    justify-content:center;
    background-color: ${theme.COLORS.GRAY_500};
`;

export const Title = styled.Text`
    color:${({theme})=>theme.COLORS.GRAY_100};
    font-size: ${({theme})=>theme.FONT_SIZE.SM}px;
    font-family: ${({theme})=>theme.FONT_FAMILY.REGULAR};
    margin-left:4px;

`
