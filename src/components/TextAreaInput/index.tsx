import { useTheme } from "styled-components/native";
import { Container, Input, Label } from "./style"
import { TextInput, TextInputProps } from "react-native";
import { forwardRef } from "react";

type Props= TextInputProps &{
    label: string;
}

const TextAreaInput =  forwardRef<TextInput, Props> (({label, ...rest}, ref) =>{

    const {COLORS} = useTheme()
    return(
        <Container>
            <Label>
                {label}
            </Label>
            <Input
                ref={ref}
                autoCapitalize='sentences'
                placeHolderTextColor={COLORS.GRAY_400}
                multiline
                {...rest}
            />
        </Container>
    )
})
 export {TextAreaInput}