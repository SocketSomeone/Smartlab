import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import Onboarding from "./screens/Onboarding";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./screens/Login";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Colors} from "./colors";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import Cart from "./screens/Cart";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function App({navigation}) {
    const colors = {
        background: '#fff',
    }


    const HomeTabs = () => (
        <Tab.Navigator initialRouteName={"Анализы"} screenOptions={({route}) => ({
            headerShown: false,
            tabBarStyle: {
                paddingVertical: 5,
                height: 60,
                backgroundColor: '#fff',
                borderTopWidth: 0,
                paddingBottom: 5,
            },
            tabBarIcon: ({focused, color, size}) => {

                let iconName;

                if (route.name === 'Анализы') {
                    iconName = focused
                        ? 'home'
                        : 'home-outline';
                } else if (route.name === 'Результаты') {
                    iconName = focused
                        ? 'search'
                        : 'search-outline';
                } else if (route.name === 'Корзина') {
                    iconName = focused
                        ? 'cart'
                        : 'cart-outline';
                } else if (route.name === 'Поддержка') {
                    iconName = focused
                        ? 'help-circle'
                        : 'help-circle-outline';
                }

                return <Ionicons name={iconName} size={size} color={color}/>;
            },
            tabBarActiveTintColor: Colors.Accent,
            tabBarInactiveTintColor: Colors.Caption,
        })}>

            <Tab.Screen name="Анализы" component={Home} options={{headerShown: false}}/>
            <Tab.Screen name="Результаты" component={Home}
                        listeners={{focus: () => alert("Вы ещё не прошли обследование")}}
                        options={{headerShown: false}}/>
            <Tab.Screen name="Корзина" component={Cart} options={{headerShown: false}}/>
            <Tab.Screen name="Поддержка" component={Home} listeners={{focus: () => alert("Мы ещё не работаем")}}
                        options={{headerShown: false}}/>
        </Tab.Navigator>
    )

    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{flex: 1}}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>

                    <BottomSheetModalProvider>

                        <NavigationContainer theme={{colors}}>

                            <Stack.Navigator initialRouteName={"HomeTabs"}
                                             screenOptions={{statusBarColor: '#fff'}}>
                                <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}}/>
                                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                                <Stack.Screen name="HomeTabs" component={HomeTabs} options={{headerShown: false}}/>
                            </Stack.Navigator>

                        </NavigationContainer>
                    </BottomSheetModalProvider>
                </KeyboardAvoidingView>
            </GestureHandlerRootView>
        </Provider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});

export default App
