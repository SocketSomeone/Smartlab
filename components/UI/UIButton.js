import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Colors} from "../../colors";

export default ({title, onPress, disabled, style, outlined}) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={[style, styles.container, disabled && styles.disabled, outlined && styles.outlined]}>
                <Text style={[styles.title, outlined && styles.outlinedText]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Accent,
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        width: '90%'
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
        color: Colors.White
    },
    disabled: {
        opacity: 0.5
    },
    outlined: {
        backgroundColor: Colors.White,
        borderWidth: 1,
        borderColor: Colors.Accent,
    },
    outlinedText: {
        color: Colors.Accent,

    }
})
