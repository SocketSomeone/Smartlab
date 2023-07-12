import {ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {useEffect, useState} from "react";
import {Colors} from "../colors";
import UIButton from "../components/UI/UIButton";

export default ({navigation}) => {
    const {width, height} = useWindowDimensions()
    const stages = ['Связываемся с банком...', 'Производим оплату...']
    const [loading, setLoading] = useState(true)
    const [currentStage, setCurrentStage] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setCurrentStage(1)
        }, 2000)

        setTimeout(() => {
            setLoading(false)
        }, 4000)
    })


    return (
        <SafeAreaView style={{flex: 1}}>
            <Text style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '600',
                marginTop: 20
            }}>Оплата</Text>

            {loading ?
                <>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#8BE1FF"/>
                        <Text style={{
                            fontWeight: '400',
                            fontSize: 16,
                            lineHeight: 20,
                            letterSpacing: -0.32,
                            textAlign: 'center',
                            color: Colors.Caption,
                            marginTop: 20
                        }}>{stages[currentStage]}</Text>
                    </View>
                </>
                :
                <>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40}}>
                        <Image source={require('../assets/images/payment.png')} style={{resizeMode: 'contain', width}}/>

                        <Text style={{
                            fontWeight: '600',
                            fontSize: 20,
                            lineHeight: 28,
                            letterSpacing: 0.38,
                            textAlign: 'center',
                            color: Colors.Green,
                            marginTop: 20,
                            marginBottom: 8
                        }}
                        >Оплата прошла успешно</Text>

                        <Text style={{
                            fontWeight: 400,
                            fontSize: 14,
                            lineHeight: 20,
                            textAlign: 'center',
                            marginBottom: 8
                        }}>Вам осталось
                            дождаться приезда медсестры и сдать анализы. До скорой встречи!</Text>

                        <Text style={{
                            fontWeight: 400,
                            fontSize: 14,
                            lineHeight: 20,
                            textAlign: 'center'
                        }}>Не забудьте ознакомиться с правилами подготовки к сдаче анализов</Text>
                    </View>

                    <UIButton title={'Чек покупки'} outlined onPress={() => alert('Транзакция обрабатывается банком')}/>
                    <UIButton title={'Назад'} onPress={() => navigation.navigate('HomeTabs')}/>
                </>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
