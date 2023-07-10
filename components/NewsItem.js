import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';

export default ({item}) => {

    return (
        <View style={[styles.container, {width: 270, minHeight: 200}]}>
            <View style={styles.info}>
                {/* title */}
                <Text style={styles.name}>{item.name}</Text>
                {/* description */}
                <Text style={styles.description}>{item.description}</Text>
                {/* price */}
                <Text style={styles.price}>{item.price} ₽</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#F4F4F4',
        backgroundColor: '#96dcec',
        borderWidth: 1,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 2,
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    name: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 20,
        letterSpacing: 0.38,
        color: '#fff',
    },
    description: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20,
        color: '#fff',

    },
    price: {
        fontWeight: '800',
        fontSize: 20,
        lineHeight: 28,
        color: '#fff',
    },
    imageContainer: {
        flex: 0.5,


    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        flexWrap: 'wrap',
    },
});
