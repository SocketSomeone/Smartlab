import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import UIButton from "./UI/UIButton";
import {Colors} from "../colors";
import {useCallback, useMemo, useRef} from "react";
import {BottomSheetModal, useBottomSheetModal} from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeItem} from "../redux/cart";

export default ({item}) => {
    const {cart} = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const bottomSheetRef = useRef(null);
    const {dismissAll} = useBottomSheetModal();

    const snapPoints = useMemo(() => ['25%', '75%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const handleClosingModalPress = useCallback(() => {
        bottomSheetRef.current?.close();
    });

    const isAddedToCart = useMemo(() => {
        return cart.some((cartItem) => cartItem.id === item.id)
    }, [cart])

    return (
        <SafeAreaView style={[styles.container]}>
            <TouchableOpacity onPress={handlePresentModalPress} style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>

                {/* time_result  and price */}
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View
                        style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column'}}>
                        <Text style={styles.time_result}>{item.time_result}</Text>
                        <Text style={styles.price}>{item.price} ₽</Text>
                    </View>

                    {/* Add to Cart */}
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <UIButton title={isAddedToCart ? 'Убрать' : 'Добавить'} outlined={isAddedToCart}
                                  onPress={() => {
                                      if (isAddedToCart) {
                                          return dispatch(removeItem(item.id))
                                      }

                                      dispatch(addToCart(item))
                                  }}/>
                    </View>

                </View>

                <BottomSheetModal
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    enableDismissOnClose={true}
                    dismissOnPanDown={true}
                    dismissOnTouchOutside={true}
                    detached={true}
                    backdropComponent={({style}) => <View style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}/>}
                >
                    <View style={styles.contentContainer}>
                        <View>
                            <Text style={styles.modalTitle}>{item.name}</Text>
                            <TouchableOpacity style={styles.modalClose} onPress={handleClosingModalPress}>
                                <Ionicons name="close" size={24} color="black"/>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={styles.modalHeader}>Описание</Text>
                            <Text style={styles.modalText}>{item.description}</Text>
                        </View>

                        <View>
                            <Text style={styles.modalHeader}>Подготовка</Text>
                            <Text style={styles.modalText}>{item.preparation}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.modalHeader}>Время</Text>
                                <Text style={styles.modalText}>{item.time_result}</Text>
                            </View>

                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.modalHeader}>Биоматериал</Text>
                                <Text style={styles.modalText}>{item.bio}</Text>
                            </View>
                        </View>


                        <UIButton title={isAddedToCart ? 'Убрать' : `Добавить за ${item.price} ₽`}
                                  outlined={isAddedToCart} onPress={() => {
                            if (isAddedToCart) {
                                return dispatch(removeItem(item.id))
                            }

                            dispatch(addToCart(item))
                        }}/>
                    </View>
                </BottomSheetModal>
            </TouchableOpacity>


        </SafeAreaView>
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
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    modalTitle: {
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: 0.38,
        color: '#000',
        marginBottom: 20,
    },
    modalClose: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 20,
    },
    modalHeader: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: -0.32,
        color: Colors.Caption,
        marginBottom: 8,
    },
    modalDescription: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.38,
        color: '#000',
    },
    modalText: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.38,
        color: '#000',
        marginBottom: 20,
    }
})
