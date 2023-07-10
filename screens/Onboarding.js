import {
    Animated,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import OnboardingItem from "../components/OnboardingItem";
import {Colors} from "../colors";
import {useRef, useState} from "react";

const slides = [
    {
        title: 'Анализы',
        description: 'Экспресс сбор и получение проб',
        image: require('../assets/images/onboarding_slide_1.png')
    },
    {
        title: 'Уведомления',
        description: 'Вы быстро узнаете о результатах',
        image: require('../assets/images/onboarding_slide_2.png')
    },
    {
        title: 'Мониторинг',
        description: 'Наши врачи всегда наблюдают \n' +
            'за вашими показателями здоровья',
        image: require('../assets/images/onboarding_slide_3.png')
    }
]

export default ({ navigation }) => {
    const {width} = useWindowDimensions()

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentIndex(currentIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentIndex + 1;
        if (nextSlideIndex !== slides.length) {
            const offset = nextSlideIndex * width;
            slidesRef?.current.scrollToOffset({offset});
            setCurrentIndex(currentIndex + 1);
        }
    };


    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={{flex: 3}}>
                <View style={{flex: 0.2, paddingTop: 50, marginBottom: 50, flexDirection: 'row', flexWrap: 'wrap'}}>

                    <TouchableOpacity style={{flex: 1,}}
                                      onPress={currentIndex !== slides.length - 1 ? goToNextSlide : () => navigation.navigate('Login')}>
                        <Text
                            style={styles.skip}>{currentIndex !== slides.length - 1 ? 'Пропустить' : 'Завершить'}</Text>
                    </TouchableOpacity>

                    <Image style={[styles.image, {width, resizeMode: 'contain'}]}
                           source={require('../assets/images/onboarding_background.png')}/>
                </View>

                <FlatList
                    data={slides}
                    onMomentumScrollEnd={updateCurrentSlideIndex}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    bounces={false}
                    keyExtractor={(item) => item.title}
                    renderItem={({item}) => {
                        return (<OnboardingItem item={item} currentIndex={currentIndex}/>)
                    }}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                        useNativeDriver: false
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />

                <View style={{flexDirection: 'row', marginBottom: 50, justifyContent: 'center', alignItems: 'center'}}>
                    {slides.map((_, i) => {
                        return (<View key={i} style={[{
                            width: 16,
                            height: 16,
                            borderRadius: 16,
                            borderStyle: 'solid',
                            borderWidth: 1,

                            borderColor: Colors.Accent,
                            margin: 4
                        }, currentIndex === i && {backgroundColor: Colors.Accent}]}/>)
                    })}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    skip: {
        textAlign: 'left',
        paddingLeft: 20,
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24,
        color: Colors.Secondary
    },
    image: {
        flex: 0.7

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
