import { Button as NativeBaseButton, Heading, IButtonProps } from "native-base";

interface Props extends IButtonProps {
    title: string,
    headingColor: string
}

export function Button({ title, headingColor, ...rest }: Props) {
    return(
        <NativeBaseButton
            h={52}
            w={167}
            fontSize="sm"
            rounded="full"
            {...rest}
        >
            <Heading color={headingColor} fontSize="sm">
                {title}
            </Heading>
        </NativeBaseButton>
    )
}