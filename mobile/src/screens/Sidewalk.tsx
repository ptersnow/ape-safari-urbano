import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, Heading, useToast, VStack } from "native-base";
import { useCallback, useState } from "react";

import { Button } from "../components/Button";
import { EmptySidewalkList } from "../components/EmptySidewalkList";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { SidewalkCard, SidewalkCardProps } from "../components/SidewalkCard";

import { api } from "../services/api";


export function Sidewalk() {

    const [isLoading, setIsLoading] = useState(true)
    const [sidewalks, setSidewalks]= useState<SidewalkCardProps[]>([])
    const [sidewalkName, setSidewalkName] = useState("")

    const toast = useToast()

    const navigation = useNavigation()

    async function handleSidewalkNameSubmit() {
        try {
            setIsLoading(true)
            const response = await api.post('/sidewalks', {
                name: sidewalkName,
                start: "",
                end: ""
            })

            toast.show({
                title: 'Segmento de calçada criado com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            })
            
            setSidewalkName("")
            fetchSidewalks()
        } catch (error) {
            console.log(error)

            toast.show({
                title: 'Não foi possível cadastrar o segmento de calçada',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function fetchSidewalks() {
        try {
            setIsLoading(true)
            const response = await api.get('/sidewalks')
            setSidewalks(response.data.sidewalks)

        } catch (error) {
            console.log(error)

            toast.show({
                title: 'Não foi possível carregar os segmentos de calçada',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchSidewalks()
    }, []))

    return (
        <VStack flex={1} px={8} pt={10}>

            <Heading color="black" fontSize="xl" mt={10} mb={6}>
                Cadastro de segmento de calçada
            </Heading>

            <Input 
                placeholder="Nome do segmento de calçada"
                mb={2}
                onChangeText={setSidewalkName}
                value={sidewalkName}
            />

            <Button 
                bg="black"
                title="Adicionar segmento"
                headingColor="white"
                w="full"
                mb={4}
                onPress={handleSidewalkNameSubmit}
            />

            {
                isLoading ? <Loading /> :
                <FlatList 
                    data={sidewalks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <SidewalkCard
                            data={item}
                            onPress={() => navigation.navigate('Details', {
                                sidewalkId: item.id,
                                sidewalkName: item.name
                            })}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: 10 }}
                    ListEmptyComponent={() => <EmptySidewalkList />}
                />
            }            

        </VStack>
    )
}