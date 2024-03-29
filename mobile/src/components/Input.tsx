import { Input as NativeBaseInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
    return (
        <NativeBaseInput
            h={52}
            size="md"
            borderWidth={1}
            fontSize="md"
            fontFamily="body"
            { ...rest }
        />
    )
}