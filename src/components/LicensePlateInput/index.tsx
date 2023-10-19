import { useTheme } from "styled-components/native";
import { Container, Input, Label } from "./style"
import { TextInputProps } from "react-native";

type Props= TextInputProps &{
    label: string;
}

export default function LicensePlateInput({label, ...rest}: Props){

    const {COLORS} = useTheme()
    return(
        <Container>
            <Label>
                {label}
            </Label>
            <Input
                maxLength={7}
                autoCapitalize='characters'
                placeHolderTextColor={COLORS.GRAY_400}
                {...rest}
            />
        </Container>
    )
}