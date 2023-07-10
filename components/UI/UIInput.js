import {Colors} from "../../colors";
import {StyleSheet, Text, TextInput, View} from "react-native";

export default ({tip, placeholder, onChangeText, maxLength, keyboardType }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.tip}>{tip}</Text>
            <TextInput onChangeText={onChangeText} maxLength={maxLength} keyboardType={keyboardType} style={styles.input} placeholder={placeholder} placeholderTextColor={Colors.Caption}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    tip: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20,
        color: Colors.Caption,
        marginBottom: 10
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 10,
        paddingVertical: 10,
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 24,
        color: '#000',
        height: 50,
        backgroundColor: '#F5F5F9',
        paddingHorizontal: 20
    }

})
