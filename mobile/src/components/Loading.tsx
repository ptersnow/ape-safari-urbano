import { Center, Spinner } from "native-base";

export function Loading() {
  return (
    <Center flex={1} bg="coolGray.300">
      <Spinner color="yellow.500" />
    </Center >
  );
}