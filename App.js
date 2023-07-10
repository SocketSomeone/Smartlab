import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import Onboarding from "./screens/Onboarding";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
    const colors = {
        background: '#fff',
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1}}>

            <NavigationContainer theme={{colors}}>
                <Stack.Navigator initialRouteName={"Home"}
                                 screenOptions={{statusBarColor: '#fff'}}>

                    <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}}/>
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>

                </Stack.Navigator>
            </NavigationContainer>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
