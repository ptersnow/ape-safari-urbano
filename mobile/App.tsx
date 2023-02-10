import { NativeBaseProvider, StatusBar } from 'native-base';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';

export default function App() {
    return (
        <NativeBaseProvider>
            <AuthContextProvider>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent
                />
                <Routes />
            </AuthContextProvider>
        </NativeBaseProvider>
    );
}
