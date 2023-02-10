import { useNavigation } from "@react-navigation/native"
import { HStack, Image, VStack } from "native-base"

import { Button } from "../components/Button"
import { useAuth } from "../hooks/useAuth"

export function Home() {
    const { signIn, isUserLoading } = useAuth()

    const navigation = useNavigation()
    const img = require("../../assets/background.png")

    function login () {
        navigation.navigate("Login")
    }

    function signup() {
        navigation.navigate("Signup")
    }

    return (
        <VStack flex={1} backgroundColor="white">
            <Image source={img} alt="" resizeMode="cover" h="5/6" w="full" />
            
            <HStack
                mx={4}
                px={4}
                py={4}
                space={2}
                alignItems="center"
                borderWidth={1}
                borderRadius="full"
            >
                <Button
                    bg="black"
                    title="Entrar"
                    headingColor="white"
                    onPress={login}
                />
                <Button
                    bg="black"
                    title="Registrar"
                    headingColor="white"
                    onPress={signup}
                />
            </HStack>
        </VStack>
    )
}