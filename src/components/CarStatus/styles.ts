import styled  from 'styled-components/native'

export const Container = styled.View`
    width:100%;
    margin:32px;
    padding:22px;
    border-radius:6px;

    background-color:${({theme})=>theme.COLORS.GRAY_700};
    flex-direction:row;
    align-items:center;
`;
export const  IconBox = styled.View`
    width: 77px;
    height: 77px;
    border-radius: 6px;
    background-color: ${({theme})=>theme.COLORS.GRAY_600};
    margin-right: 12px;

    justifu-content:center;
    align-items:center;
`
export const Message = styled.Text`
    color:${({theme})=>theme.COLORS.GRAY_600};
    font-size: ${({theme})=>theme.FONTS.SIZE.SM}px;
    font-family: ${({theme})=>theme.FONTS.FAMILY.REGULAR}px
`
export const TextHighlight = styled.Text`
    color:${({theme})=>theme.COLORS.GRAY_600};
    font-size: ${({theme})=>theme.FONTS.SIZE.SM}px;
    font-family: ${({theme})=>theme.FONTS.FAMILY.REGULAR}px
    
`