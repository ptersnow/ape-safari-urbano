import { Row, Text } from 'native-base';

export function EmptySidewalkList() {
    return (
        <Row flexWrap="wrap" justifyContent="center">
            <Text color="white" fontSize="sm" textAlign="center">
                Nenhum segmento de calçada cadastrado.
            </Text>
        </Row>
    );
}