import { Checkbox, HStack, Text } from "native-base"

interface QuestionCardProps {
    text: string
    number: string
    handleChange: () => void
}


export function QuestionCard({ text, number, handleChange }: QuestionCardProps) {
    return (
            <Checkbox
                value={number}
                onChange={handleChange}

                borderBottomWidth={1}
                w="full"
                justifyContent="space-evenly"
                alignItems="center"
                mb={2}
                pb={1}
                mx={1}
            >
                {text}
            </Checkbox>
    )
}