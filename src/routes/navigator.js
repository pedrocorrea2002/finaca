import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Incomings } from '../pages/incomings';
import { Outcomings } from '../pages/outcomings';
import { Main } from '../pages/main';
import { Extract } from '../pages/extract_geral';

function Navigator() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Main'
            >
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Incomings"
                    component={Incomings}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Outcomings"
                    component={Outcomings}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Extract"
                    component={Extract}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator