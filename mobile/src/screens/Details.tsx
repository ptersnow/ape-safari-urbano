import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Text, VStack } from "native-base";

import { Button } from "../components/Button";
import { api } from "../services/api";

export interface QuestionProps {
    id: string
    name: string
    categoryId: string

    choices: {
        id: string
        text: string
        value: string
        questionId: string
    }[]

    answers: {
        id: string
        userId: string
        choice: string
        questionId: string
        sidewalkId: string
    }[]
}

interface CategoryProps {
    id: string
    name: string
    questions: QuestionProps[]
}

interface RouteParams {
    sidewalkId: string
    sidewalkName: string
}

export function Details() {
    const route = useRoute()
    const navigation = useNavigation()

    const [acAmount, setAcAmount] = useState(-1)
    const [qaAmount, setQaAmount] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)
    const [serviceLevel, setServiceLevel] = useState("")

    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [acQuestions, setAcQuestions] = useState<QuestionProps[]>([])
    const [qaQuestions, setQaQuestions] = useState<QuestionProps[]>([])

    const { sidewalkId, sidewalkName } = route.params as RouteParams

    function handleQualityForm() {        
        navigation.navigate('Form', {sidewalkId, sidewalkName, questions: qaQuestions})
    }
    
    function handleAcessibilityForm() {
        navigation.navigate('Form', {sidewalkId, sidewalkName, questions: acQuestions})
    }

    async function fetchCategories() {
        try {
            setIsLoading(true)

            let avgQuality = -1
            let avgAccessibility = -1
            const response = await api.get(`/sidewalks/${sidewalkId}/categories`)

            setCategories(response.data.categories)
            
            const qaCategory = response.data.categories.filter((e) => {
                return e.name === "Qualidade do espaço"
            })

            if (qaCategory[0]._count?.questions > 0) {
                const qAmount = await api.get(`/sidewalks/${sidewalkId}/categories/${qaCategory[0].id}/answers`)
                setQaAmount(qAmount.data.avg)
                avgQuality = qAmount.data.avg
            }
            
            setQaQuestions(qaCategory[0].questions)

            const acCategory = response.data.categories.filter((e) => {
                return e.name === "Acessibilidade"
            })

            if (acCategory[0]._count?.questions > 0) {
                const aAmount = await api.get(`/sidewalks/${sidewalkId}/categories/${acCategory[0].id}/answers`)
                setAcAmount(aAmount.data.avg)
                avgAccessibility = aAmount.data.avg
            }

            setAcQuestions(acCategory[0].questions)
            
            if (avgQuality >= 0 && avgAccessibility >= 0) {
                const total = (avgQuality + avgAccessibility) / 2

                if (total < 0.99) {
                    setServiceLevel("F")
                } 
                else if (total < 1.99) {
                    setServiceLevel("E")
                }
                else if (total < 2.99) {
                    setServiceLevel("D")
                }
                else if (total < 3.99) {
                    setServiceLevel("C")
                }
                else if (total < 4.99) {
                    setServiceLevel("B")
                }
                else {
                    setServiceLevel("A")
                }
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchCategories()
    }, []))

    return (
        <VStack flex={1} px={4} pt={10} alignItems="center" justifyContent="center">

            <VStack
                bg="#D2D2D2"
                rounded="2xl"
                space={4}
                w="full"
                py={4}
                px={2}
                alignItems="center"
                justifyContent="center"
            >

                <Text fontSize="3xl" fontWeight="bold" mb={6}>
                    {sidewalkName}
                </Text>

                <Button 
                    bg="#519657"
                    title="Qualidade do espaço"
                    headingColor="white"
                    w="full"
                    isLoading={isLoading}
                    disabled={qaAmount >= 0}
                    onPress={handleQualityForm}
                />
                {
                    qaAmount >= 0 &&

                    <Text fontSize="xl" fontWeight="bold">
                        {qaAmount}
                    </Text>
                }
                
                <Button 
                    bg="#26418F"
                    title="Acessibilidade"
                    headingColor="white"
                    w="full"
                    mt={4}
                    isLoading={isLoading}
                    disabled={acAmount >= 0}
                    onPress={handleAcessibilityForm}
                />
                {
                    acAmount >= 0 &&
                    <Text fontSize="xl" fontWeight="bold">
                        {acAmount}
                    </Text>
                }

                {
                    serviceLevel != "" &&

                    <VStack w="full" alignItems="center" mb={6}>
                        <Button 
                            bg="#E99D09"
                            title="Nível do serviço"
                            headingColor="black"
                            w="full"
                            mt={4}
                            disabled={true}
                        />
                        <Text fontSize="xl" fontWeight="bold">
                            {serviceLevel}
                        </Text>
                    </VStack>
                }
            </VStack>
        </VStack>
    )
}