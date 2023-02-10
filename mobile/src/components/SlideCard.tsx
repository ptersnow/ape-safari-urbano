import { Button, Image, Text, VStack } from "native-base";
import { ImageURISource, TouchableOpacityProps } from "react-native";

export interface SlideCardProps {
    key: string
    img: ImageURISource
    alt: string
    text: string
}

interface Props extends TouchableOpacityProps {
    data: SlideCardProps
}

export function SlideCard ({ data, ...rest }: Props) {
    return (
        <VStack flex={1} flexDirection="column" alignItems="center">

            <Image source={data.img} alt={data.alt} />

            <Text w={200}>{data.text}</Text>

            <Button>{ parseInt(data.key) < 3 ? "Próximo" : "Começar" }</Button>

        </VStack>
    )
}