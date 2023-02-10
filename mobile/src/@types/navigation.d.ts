export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined
            Login: undefined
            Signup: undefined
            Map: undefined
            Introduction: undefined
            Sidewalk: undefined

            Details: {
                sidewalkId: string
                sidewalkName: string
            }

            Form: {
                sidewalkId: string
                sidewalkName: string
                questions: {
                    id: string
                    name: string
                    categoryId: string

                    choices: {
                        id: string
                        text: string
                        value: string
                        questionId: string
                    }[]
                }[]
            }
        }
    }
}