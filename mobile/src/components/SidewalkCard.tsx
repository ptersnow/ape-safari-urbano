import { Heading, HStack, Text, VStack } from "native-base"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"

export interface SidewalkCardProps {
    id: string
    name: string
    start: string
    end: string
}

interface Props extends TouchableOpacityProps {
    data: SidewalkCardProps
}

export function SidewalkCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <HStack
                w="full"
                h={20}
                borderWidth={1}
                justifyContent="space-between"
                alignItems="center"
                rounded="sm"
                mb={3}
                p={4}
            >
                <VStack>
                    <Heading color="black" fontSize="md" fontFamily="heading">
                        {data.name}
                    </Heading>

                    <Text fontSize="xs">
                        Começo em: {data.start}
                    </Text>

                    <Text fontSize="xs">
                        Término em: {data.end}
                    </Text>
                </VStack>
            </HStack>
        </TouchableOpacity>
    )
}