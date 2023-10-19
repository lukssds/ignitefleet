import { TouchableOpacity } from "react-native";
import { Container, Title } from "./style";
import { ArrowLeft } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

type Props={
    title: string;
}

export default function Header({title}: Props){ 

    const insets = useSafeAreaInsets()
    const {COLORS } = useTheme()
    const {goBack} = useNavigation()

    const paddingTop = insets.top + 42
    return(
        <Container style={{paddingTop}}>
            <TouchableOpacity activeOpacity={0.7} onPress={goBack}>  
                <ArrowLeft
                    size={24} 
                    weight="bold"
                    color={COLORS.BRAND_LIGHT}
                />
            </TouchableOpacity>
            <Title>
                {title}
            </Title>
        </Container>
    ) 
}