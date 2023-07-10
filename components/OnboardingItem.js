import {Image, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {Colors} from "../colors";

export default ({item}) => {
    const {width, height} = useWindowDimensions()


    return (
        <View style={[styles.container, {width}]}>
            <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
                {/* title */}

                <Text style={styles.title}>{item.title}</Text>
                {/* description */}

                <Text style={styles.description}>{item.description}</Text>
            </View>

            {/* image */}
            <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 24,
        marginBottom: 20,
        color: Colors.Green
    },
    description: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20,
        color: Colors.Caption
    },
    image: {
        flex: 0.3,
        justifyContent: 'center'
    },
    container: {
        flex: 1
    }
})
