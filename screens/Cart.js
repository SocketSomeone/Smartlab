import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CatalogItem from "../components/CatalogItem";
import {useDispatch, useSelector} from "react-redux";
import {removeAll} from "../redux/cart";
import Ionicons from "@expo/vector-icons/Ionicons";
import UIButton from "../components/UI/UIButton";

export default ({ navigation }) => {
    const {cart} = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const total = cart.reduce((acc, item) => acc + parseInt(item.price), 0)
    const isEmpty = cart.length === 0

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Корзина</Text>
                <TouchableOpacity onPress={() => {
                     dispatch(removeAll())
                }}>
                    <Ionicons name={'trash-outline'} size={24} color={'#000'} style={{marginRight: 20}}/>
                </TouchableOpacity>
            </View>

            <View style={{flex: 1}}>
                {cart.length === 0
                    ? <Text style={{ textAlign: 'center', marginTop: 20}}>Вы ещё ничего не добавили в корзину</Text>
                    : <FlatList data={cart}
                                showsVerticalScrollIndicator={false}
                                pagingEnabled={false}
                                bounces={false}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => <CatalogItem item={item}/>}
                    />}


            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.priceTitle}>Сумма</Text>
                <Text style={styles.price}>{total} ₽</Text>
            </View>

            <UIButton title={'Оформить заказ'} outlined={isEmpty} disabled={isEmpty} onPress={() => navigation.navigate('Payment')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 28,
        letterSpacing: 0.33,
    },
    price: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 24,
        marginTop: 20,
        textAlign: 'right',
    },
    priceTitle: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 24,
        marginTop: 20,
        textAlign: 'left',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
    }
})
