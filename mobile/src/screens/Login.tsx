import { useState } from "react"
import { Heading, useToast, VStack } from "native-base"
import { useNavigation } from "@react-navigation/native"

import { Input } from "../components/Input"
import { Button } from "../components/Button"

import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signIn, isUserLoading } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()
    const navigation = useNavigation()

    async function handleUserLogin() {
        if(!email.trim()) {
            return toast.show({
                title: 'Informe o seu e-mail',
                placement: 'top',
                bgColor: 'red.500'
            })
        }

        if(!password.trim()) {
            return toast.show({
                title: 'Informe a sua senha',
                placement: 'top',
                bgColor: 'red.500'
            })
        }

        try {
            setIsLoading(true)
            signIn(email, password)
            
            toast.show({
                title: 'Usuário logado com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            })

            setEmail('')
            setPassword('')

            navigation.navigate('Sidewalk')

        } catch (error) {
            console.log(error)
            toast.show({
                title: 'Não foi possível encontrar o usuário',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <VStack flex={1} px={8} pt={24}>

            <Heading color="black" fontSize="xl" mt={20} mb={6}>
                Entrar
            </Heading>

            <VStack
                bg="#D2D2D2"
                rounded="2xl"
                space={4}
                w="full"
                h="1/3"
                pt={4}
                px={2}
            >
                <Input 
                    bg="white"
                    placeholder="E-mail"
                    borderWidth={1}
                    borderColor="black"
                    borderRadius="2xl"
                    onChangeText={setEmail}
                    value={email}
                />

                <Input 
                    bg="white"
                    placeholder="Senha"
                    borderWidth={1}
                    borderColor="black"
                    borderRadius="2xl"
                    secureTextEntry
                    mb={3}
                    onChangeText={setPassword}
                    value={password}
                />

                <Button 
                    bg="black"
                    title="Entrar"
                    headingColor="white"
                    w="full"
                    onPress={handleUserLogin}
                    isLoading={isLoading}
                />
            </VStack>

        </VStack>
    )
}