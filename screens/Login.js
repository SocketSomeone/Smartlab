import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import UIButton from "../components/UI/UIButton";
import UIInput from "../components/UI/UIInput";
import {useState} from "react";

export default ({ navigation }) => {
    const [isEmailVerify, setIsEmailVerify] = useState(false)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')


    const generateCode = () => Math.floor(Math.random() * (9999 - 1000) + 1000);
    const [correctCode, setCorrectCode] = useState(generateCode())

    const checkCode = () => {
        if (Number(code) === correctCode) {
            return navigation.navigate('Home')
        }

        alert('Неверный код')
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                !isEmailVerify ? (
                    <>
                        <View style={{flex: 1}}>
                            <Text style={styles.title}>👋 Добро пожаловать!</Text>
                            <Text style={styles.description}>Войдите, чтобы пользоваться функциями приложения</Text>

                            <UIInput tip="Вход по E-mail" placeholder="example@mail.ru" onChangeText={setEmail}/>
                            <UIButton title={'Войти'} onPress={() => setIsEmailVerify(true)}
                                      disabled={email.length === 0}/>

                        </View>

                        <View style={styles.footer}>
                            <Text style={[styles.description, {textAlign: 'center'}]}>Нет аккаунта?</Text>
                            <UIButton style={styles.button} title={'Войти с Яндекс'} disabled outlined/>
                        </View>
                    </>

                ) : (
                    <View style={{flex: 1}}>
                        {/* Navigation back button */}
                        <TouchableOpacity style={styles.back} onPress={() => {
                            setIsEmailVerify(false)
                            setEmail('')
                        }}>
                            <Text style={{marginHorizontal: 20, marginVertical: 10}}> ⬅️ Назад</Text>
                        </TouchableOpacity>

                        <View style={{ justifyContent: 'center', alignContent: 'center', flex: 0.7}}>
                            <Text style={[styles.title, {textAlign: 'center'}]}>Введите код из E-mail</Text>
                            <UIInput tip="Код подтверждения" placeholder={correctCode.toString()} maxLength={4} onChangeText={setCode} keyboardType={"number-pad"}/>
                            <UIButton title={'Подтвердить'} onPress={checkCode}/>
                        </View>

                    </View>

                )
            }


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        justifyContent: 'space-between',
        height: '100%'
    },
    title: {
        gap: 16,
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 24,
        color: '#000',
        marginHorizontal: 20,
        marginVertical: 10
    },
    description: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20,
        color: '#000',
        marginHorizontal: 20,
        marginVertical: 10
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center'

    }
})
