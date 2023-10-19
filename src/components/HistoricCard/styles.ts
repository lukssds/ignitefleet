import styled  from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    width:100%;
    padding:22px;
    border-radius:6px;
    margin-bottom: 12px;
    background-color:${({theme})=>theme.COLORS.GRAY_700};
    flex-direction:row; 
    align-items:center;
    justify-content:space-between;
`;

export const Info = styled.View`
    flex:1;
`

export const LicensePlate = styled.Text`
    color:${({theme})=>theme.COLORS.WHITE};
    font-size: ${({theme})=>theme.FONT_SIZE.MD}px;
    font-family: ${({theme})=>theme.FONT_FAMILY.BOLD};
`
export const Departure = styled.Text`
    margin-top: 4px;
    color:${({theme})=>theme.COLORS.GRAY_200};
    font-size: ${({theme})=>theme.FONT_SIZE.XS}px;
    font-family: ${({theme})=>theme.FONT_FAMILY.REGULAR}px
`