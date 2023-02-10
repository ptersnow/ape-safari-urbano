import { useNavigation, useRoute } from "@react-navigation/native";
import { Checkbox, FlatList, HStack, Radio, ScrollView, Text, useToast, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";

import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { QuestionCard } from "../components/QuestionCard";

import { api } from "../services/api";

import { QuestionProps } from "./Details";

interface RouteParams {
    sidewalkId: string
    sidewalkName: string
    questions: QuestionProps[]
}

interface AnswerProps {
    questionId: string
    value: number
}

export function Form() {
    const route = useRoute()
    const toast = useToast()
    const navigation = useNavigation()
    
    const [choice, setChoice] = useState("")
    const [answers, setAnswers] = useState<AnswerProps[]>([])
    const [currentPage, setCurrentPage] = useState(0)

    const { sidewalkId, sidewalkName, questions } = route.params as RouteParams

    async function handleSubmitForm() {

        try {
            answers.push({
                questionId: questions[currentPage].id,
                value: parseInt(choice)
            })

            if (currentPage == 4) {
                console.log(answers)
                await api.post(`/sidewalks/${sidewalkId}/answers`, answers)

                toast.show({
                    title: 'Respostas salvas',
                    placement: 'top',
                    bgColor: 'green.500'
                })

                navigation.navigate('Details', {sidewalkId, sidewalkName})
            }
            else {
                setChoice("")
                setCurrentPage(currentPage + 1)
            }
            
        } catch (error) {
            console.log(error)

            toast.show({
                title: 'Não foi possível salvar a resposta da questão',
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    return (
        <VStack 
            flex={1}
            px={4}
            pt={12}
            bg="#D2D2D2"
            rounded="2xl"
            space={4}
            w="full"
            alignItems="center"
            justifyContent="center"
        >

            

                <Text fontSize="3xl" mb={2}>
                    {sidewalkName}
                </Text>

                
                <ScrollView ml={-2} w="full">
                    <Radio.Group
                        mb={4}
                        name="questao"
                        alignItems="center"
                        justifyItems="center"
                        value={choice}
                        onChange={value => {
                            setChoice(value);
                        }}
                    >
                        {
                            questions[currentPage].choices.map((choice, key) => {
                                return (
                                    <Radio
                                        key={key}
                                        value={choice.value}
                                    >
                                        <Text
                                            w="80"
                                            mb={3}
                                            pb={1}
                                            borderBottomWidth={1}
                                        >
                                            {choice.text}
                                        </Text>
                                    </Radio>
                                )
                            })
                        }
                    </Radio.Group>
                </ScrollView>

                <Button 
                    bg="black"
                    title={currentPage == 4 ? "Finalizar" : "Próximo"}
                    headingColor="white"
                    w="full"
                    mb={2}
                    onPress={handleSubmitForm}
                />
            
        </VStack>
    )
}