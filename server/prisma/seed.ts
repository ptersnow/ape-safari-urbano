import { PrismaClient } from "@prisma/client"

import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {

    const password = await bcrypt.hash("123456", 10)

    await prisma.user.create({
        data: {
            name: "Usuário Teste",
            email: "email",
            password: password
        }
    })

    await prisma.sidewalk.create({
        data: {
            name: "Teste de segmento",
            start: "Início da via",
            end: "Fim da via"
        }
    })

    /**************************************************************************************************/
    /** Qualidade do espaço */
    /**************************************************************************************************/
    await prisma.category.create({
        data: {
            name: "Qualidade do espaço",

            questions: {
                create: [
                    {
                        text: "Segurança",

                        choices: {
                            create: [
                                {
                                    text: "Área de circulação de pedestres em nível diferente ao leito carroçável, situação sem conflitos",
                                    value: 5,
                                },
                                {
                                    text: "Área de circulação de pedestres em nível diferente ao leito carroçável, presença de guias rebaixadas para acesso de veículos em poucos pontos; número de guias rebaixadas igual ou inferior ao número de lotes da quadra, situação possivelmente conflitante",
                                    value: 4,
                                },
                                {
                                    text: "Área de circulação de pedestres em nível diferente ao leito carroçável, presença de guias rebaixadas para acesso de veículos em muitos pontos; número de guias rebaixadas superior ao número de lotes da quadra, situação possivelmente conflitante",
                                    value: 3,
                                },
                                {
                                    text: "Área de circulação de pedestres em nível diferente, ou não, ao leito carroçável, acesso de veículos em grandes extensões, situação possivelmente conflitante", 
                                    value: 2,
                                },
                                {
                                    text: "Área de circulação de pedestres bloqueada, circulação realizada no leito carroçável, situação muito conflitante", 
                                    value: 1,
                                },
                                {
                                    text: "Área de circulação de pedestres inexistente, assim os pedestres têm de disputar a faixa de rolamento com os veículos, situação muito conflitante", 
                                    value: 0,
                                }
                            ]
                        }
                    },
                    {
                        text: "Construção e manutenção",

                        choices: {
                            create: [
                                {
                                    text: "Pavimento com revestimento em material adequado, firme, antiderrapante, não trepidante, com irregularidades e defeitos recuperados, manutenção adequada", 
                                    value: 5,
                                },
                                {
                                    text: "Pavimento com revestimento em material inadequado, pouco rugoso, antiderrapante, trepidante, com irregularidades e defeitos recuperados, manutenção adequada", 
                                    value: 4,
                                },
                                {
                                    text: "Pavimento com revestimento em material inadequado, derrapante, com irregularidades e defeitos recuperados, manutenção adequada", 
                                    value: 3,
                                },
                                {
                                    text: "Pavimento com revestimento em condições inadequadas, superfície apresentando irregularidades e defeitos, dificuldade na utilização da calçada, falta de manutenção", 
                                    value: 2,
                                },
                                {
                                    text: "Pavimento sem revestimento, solo exposto ou grama, dificuldade na utilização", 
                                    value: 1,
                                },
                                {
                                    text: "Calçada inexistente ou inutilizável pela precariedade do pavimento", 
                                    value: 0,
                                }
                            ]
                        }
                    },
                    {
                        text: "Seguridade",

                        choices: {
                            create: [
                                {
                                    text: "Ambiente com presença usual de pedestres, policiamento frequente e boa iluminação", 
                                    value: 5,
                                },
                                {
                                    text: "Ambiente com presença usual de pedestres, policiamento menos frequente e boa iluminação", 
                                    value: 4,
                                },
                                {
                                    text: "Ambiente com presença de pedestres, policiamento menos frequente e iluminação aceitável", 
                                    value: 3,
                                },
                                {
                                    text: "Ambiente com presença de pedestres, policiamento esporádico e iluminação deficiente", 
                                    value: 2,
                                },
                                {
                                    text: "Ambiente com presença eventual de pedestres, policiamento esporádico e iluminação deficiente", 
                                    value: 1,
                                },
                                {
                                    text: "Ambiente sem presença de pedestres, policiamento e iluminação", 
                                    value: 0,
                                }
                            ]
                        }
                    },
                    {
                        text: "Atratividade",

                        choices: {
                            create: [
                                {
                                    text: "Calçada de acesso a espaços bem cuidados destinados à recreação e convivência coletiva ou preservação ambiental, como praças e unidades de conservação ambiental", 
                                    value: 5,
                                },
                                {
                                    text: "Calçada de acesso a espaço comercial, industrial e residencial dotado de preocupações estéticas, como fachadas permeáveis, jardins à vista e vitrines atraentes", 
                                    value: 4,
                                },
                                {
                                    text: "Calçada de acesso a espaço comercial, industrial e residencial sem preocupações estéticas, havendo muros altos e fachadas impermeáveis", 
                                    value: 3,
                                },
                                {
                                    text: "Calçada de acesso a espaço pouco atrativo, destinado a uso comercial e industrial de grande porte, havendo poucos acessos à calçada", 
                                    value: 2,
                                },
                                {
                                    text: "Calçada de acesso a espaço sem quaisquer preocupações estéticas, com construções com acesso precário ou inexistente à calçada", 
                                    value: 1,
                                },
                                {
                                    text: "Calçada inadequada à utilização, ocorrência de resíduos e vegetação alta na calçada", 
                                    value: 0,
                                }
                            ]
                        }
                    },
                    {
                        text: "Arborização da calçada",

                        choices: {
                            create: [
                                {
                                    text: "Todos os indivíduos da arborização da calçada sem restrições técnicas, legais e ambientais", 
                                    value: 5,
                                },
                                {
                                    text: "Indivíduos da arborização da calçada sem restrições técnicas, legais e ambientais com ocorrência a partir de 66% e inferior a 100%", 
                                    value: 4,
                                },
                                {
                                    text: "Indivíduos da arborização da calçada sem restrições técnicas, legais e ambientais com ocorrência a partir de 33% e inferior a 66%", 
                                    value: 3,
                                },
                                {
                                    text: "Indivíduos da arborização da calçada sem restrições técnicas, legais e ambientais com ocorrência superior a 0% e inferior a 33%", 
                                    value: 2,
                                },
                                {
                                    text: "Inexistência da arborização ao longo da calçada", 
                                    value: 1,
                                },
                                {
                                    text: "Todos os indivíduos da arborização da calçada com restrições técnicas, legais e/ou ambientais", 
                                    value: 0,
                                }
                            ]
                        }
                    }
                ]
            }
        }
    })


    /**************************************************************************************************/
    /** Acessibilidade */
    /**************************************************************************************************/

    await prisma.category.create({
        data: {
            name: "Acessibilidade",

            questions: {
                create: [
                    {
                        text: "Largura efetiva",

                        choices: {
                            create: [
                                {
                                    text: "Calçada sem barreira urbanística, sem mudança do curso do pedestre na calçada; largura igual ou superior a 1,5 m",
                                    value: 5,
                                },
                                {
                                    text: "Calçada sem barreira urbanística, sem mudança do curso do pedestre na calçada; largura igual ou superior a 1,2 m",
                                    value: 4,
                                },
                                {
                                    text: "Calçada reduzida por barreira urbanística, sem mudança do curso do pedestre na calçada; largura pouco inferior a 1,2 m em alguns pontos",
                                    value: 3,
                                },
                                {
                                    text: "Calçada reduzida por barreira urbanística, havendo mudanças de curso do pedestre na calçada; largura inferior a 1,2 m",
                                    value: 2,
                                },
                                {
                                    text: "Calçada reduzida por barreira urbanística, havendo mudanças de curso do pedestre na calçada, inclusive para o leito carroçável; largura inferior a 0,90 m",
                                    value: 1,
                                },
                                {
                                    text: "Calçada inexistente ou bloqueada por barreira urbanística, curso do pedestre realizado no leito carroçável",
                                    value: 0,
                                },
                            ]
                        }
                    },
                    {
                        text: "Sinalização e rampas",

                        choices: {
                            create: [
                                {
                                    text: "Calçada com rampas de acesso nas intersecções com inclinação de até 8,33% (1:12) e largura mínima do rebaixamento de 1,50 m; faixa de travessia de pedestres demarcada",
                                    value: 5,
                                },
                                {
                                    text: "Calçada com rampas de acesso nas intersecções com inclinação de até 8,33% (1:12) e largura mínima do rebaixamento de 1,50 m; faixa de travessia de pedestres não demarcada",
                                    value: 4,
                                },
                                {
                                    text: "Calçada com rampas de acesso nas intersecções com inclinação superior a 8,33% (1:12) e/ou largura do rebaixamento inferior a 1,50 m, porém com condição de utilização por pessoa em cadeira de rodas e PMR; faixa de travessia de pedestres demarcada",
                                    value: 3,
                                },
                                {
                                    text: "Calçada com rampas de acesso nas intersecções com inclinação superior a 8,33% (1:12) e/ou largura do rebaixamento inferior a 1,50 m, porém com condição de utilização por pessoa em cadeira de rodas e PMR; faixa de travessia de pedestres não demarcada Calçadas sem rampas de acesso nas intersecções utilizáveis; faixa de pedestres demarcada",
                                    value: 2,
                                },
                                {
                                    text: "Calçadas sem rampas de acesso nas intersecções utilizáveis; faixa de pedestres não demarcada",
                                    value: 1,
                                },
                                {
                                    text: "",
                                    value: 0,
                                },
                            ]
                        }
                    },
                    {
                        text: "Inclinação Longitudinal",

                        choices: {
                            create: [
                                {
                                    text: "Calçada com inclinação longitudinal máxima de 3%",
                                    value: 5,
                                },
                                {
                                    text: "Calçada com inclinação longitudinal máxima de 5%",
                                    value: 4,
                                },
                                {
                                    text: "Calçada com inclinação longitudinal máxima de 6,25%",
                                    value: 3,
                                },
                                {
                                    text: "Calçada com inclinação longitudinal máxima de 8,33%",
                                    value: 2,
                                },
                                {
                                    text: "Calçada com inclinação longitudinal máxima de 12,5%",
                                    value: 1,
                                },
                                {
                                    text: "Calçada com inclinação longitudinal superior a 12,5%",
                                    value: 0,
                                },
                            ]
                        }
                    },
                    {
                        text: "Inclinação Transversal",

                        choices: {
                            create: [
                                {
                                    text: "Calçada com inclinação transversal máxima de 3%",
                                    value: 5,
                                },
                                {
                                    text: "Calçada com inclinação transversal máxima de 5%",
                                    value: 4,
                                },
                                {
                                    text: "Calçada com inclinação transversal máxima de 6,25%",
                                    value: 3,
                                },
                                {
                                    text: "Calçada com inclinação transversal máxima de 8,33%",
                                    value: 2,
                                },
                                {
                                    text: "Calçada com inclinação transversal máxima de 12,5%",
                                    value: 1,
                                },
                                {
                                    text: "Calçada com inclinação transversal superior a 12,5%",
                                    value: 0,
                                },
                            ]
                        }
                    },
                    {
                        text: "Desnível",

                        choices: {
                            create: [
                                {
                                    text: "Calçada sem desnível",
                                    value: 5,
                                },
                                {
                                    text: "Calçada com desnível de até 5 mm",
                                    value: 4,
                                },
                                {
                                    text: "Calçada com desnível entre 5 mm e 20 mm",
                                    value: 3,
                                },
                                {
                                    text: "Calçada com degrau entre 20 mm e 75 mm",
                                    value: 2,
                                },
                                {
                                    text: "Calçada com degrau entre 75 mm e 180 mm",
                                    value: 1,
                                },
                                {
                                    text: "Calçada com degrau superior a 180 mm",
                                    value: 0,
                                },
                            ]
                        }
                    }
                ]
            }
        }
    })
}

main()