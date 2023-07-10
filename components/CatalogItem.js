import {StyleSheet, Text, View} from "react-native";
import UIButton from "./UI/UIButton";
import {Colors} from "../colors";

export default ({item}) => {
    return (
        <View style={[styles.container]}>
            <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>

                {/* time_result  and price */}
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column'}}>
                        <Text style={styles.time_result}>{item.time_result}</Text>
                        <Text style={styles.price}>{item.price} ₽</Text>
                    </View>

                    {/* Add to Cart */}
                    <View style={{flex: 1, justifyContent: 'center' }}>
                        <UIButton title={'Добавить'} onPress={() => {
                        }}/>
                    </View>

                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#F4F4F4',
        borderWidth: 1,
        borderRadius: 12,
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 2,
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    name: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 20,
        color: '#000'
    },
    time_result: {
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 20,
        color: Colors.Caption
    },
    price: {
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 20,
        color: '#000'
    }
})
