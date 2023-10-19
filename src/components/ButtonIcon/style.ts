import styled from "styled-components/native";


export const Container = styled.TouchableOpacity    `
  width: 56pc;
  height: 56px;
  border-radius: 6px; 
  align-items: center;
  padding: 12px;
  justify-content: center;  
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const LoadingIndicator= styled.ActivityIndicator.attrs(({theme})=>({
    color:theme.COLORS.WHITE
}))``;


