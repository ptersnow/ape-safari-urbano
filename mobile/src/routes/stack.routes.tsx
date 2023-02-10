import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Details } from "../screens/Details";
import { Form } from "../screens/Form";
import { Home } from "../screens/Home";
import { Introduction } from "../screens/Introduction";
import { Login } from "../screens/Login";
import { Map } from "../screens/Map";
import { Sidewalk } from "../screens/Sidewalk";
import { Signup } from "../screens/Signup";

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen 
                name="Home"
                component={Home}
            />

            <Screen 
                name="Login"
                component={Login}
            />

            <Screen 
                name="Signup"
                component={Signup}
            />

            <Screen
                name="Map"
                component={Map}
            />

            <Screen
                name="Sidewalk"
                component={Sidewalk}
            />

            <Screen
                name="Details"
                component={Details}
            />

            <Screen
                name="Form"
                component={Form}
            />

        </Navigator>
    )
}