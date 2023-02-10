import { FlatList, Heading, VStack } from "native-base"
import { ImageBackground, SafeAreaView } from "react-native"
import { SlideCard, SlideCardProps } from "../components/SlideCard"

import backgroundImg from "../assets/background.png"

import inicioImg from "../assets/img-inicio.png"
import eficienciaImg from "../assets/img-eficiencia.png"
import organizacaoImg from "../assets/img-organizacao.png"
import acuraciaImg from "../assets/img-acuracia.png"

export function Introduction () {

    const data = [
        {
            key: "0",
            img: inicioImg,
            alt: "Imagem de uma família",
            text: "Seu aplicativo para avaliar calçadas baseado na metodologia Safári Urbano."
        },
        {
            key: "1",
            img: eficienciaImg,
            alt: "Imagem de uma mulher fotografando",
            text: "Eficiência\nao coletar dados."
        },
        {
            key: "2",
            img: organizacaoImg,
            alt: "Imagem de um homem sentado na frente do notebook",
            text: "Organização\nao armazenar dados."
        },
        {
            key: "3",
            img: acuraciaImg,
            alt: "Imagem de um homem em pé lendo um livro",
            text: "Acurácia\nao analisar dados."
        },
     ] as SlideCardProps[]

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <ImageBackground
                source={backgroundImg}
                defaultSource={backgroundImg}
            >
                <VStack flex={1}>

                    <Heading size="xl" p={16}>
                        apé
                    </Heading>

                    <FlatList
                        px={5}
                        data={data}
                        keyExtractor={item => item.key}
                        renderItem={({ item }) => (
                            <SlideCard data={item} />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                    />
                    
                </VStack>
            </ImageBackground>
        </SafeAreaView>
    )
}