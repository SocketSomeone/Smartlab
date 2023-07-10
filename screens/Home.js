import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import {useFetch} from "use-http";
import {useEffect, useState} from "react";
import UIInput from "../components/UI/UIInput";
import CatalogItem from "../components/CatalogItem";
import NewsItem from "../components/NewsItem";
import {Colors} from "../colors";

export default () => {
    const {width, height} = useWindowDimensions()

    const [catalog, setCatalog] = useState([])
    const [categories, setCategories] = useState([])
    const [news, setNews] = useState([])
    const {get, post, response, loading, error} = useFetch('https://medic.madskill.ru/api', {}, [])


    useEffect(() => {
        loadInitialCatalog()
        loadInitialNews()
    }, [])

    const loadInitialCatalog = async () => {
        const catalog = await get('/catalog')

        if (response.ok) {
            setCatalog(catalog)
            setCategories([...new Set(catalog.map(item => item.category))])
            setFilteredCatalog(catalog)
        }
    }

    const loadInitialNews = async () => {
        const news = await get('/news')

        if (response.ok) {
            setNews(news.splice(1, 4))
        }
    }


    const [isSearch, setIsSearch] = useState(false)
    const [filteredCatalog, setFilteredCatalog] = useState(catalog)

    const updateSearch = (query) => {
        if (query.length === 0) {
            setIsSearch(false)
            return setFilteredCatalog(catalog)
        }

        const filteredCatalog = catalog.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
        setFilteredCatalog(filteredCatalog)
        setIsSearch(true)
    }

    const [selectedCategory, setSelectedCategory] = useState(null);

    const selectCategory = (category) => {
        if (category === selectedCategory) {
            setSelectedCategory(null)
            setFilteredCatalog(catalog)
            return;
        }


        const filteredCatalog = catalog.filter(item => item.category === category)
        setFilteredCatalog(filteredCatalog)
        setSelectedCategory(category)
    }

    return (
        <SafeAreaView  style={[styles.container, {width}]}>
                {/* Search */}
                <UIInput placeholder="Искать анализы" onChangeText={updateSearch}/>


                {/* News */}
                {!isSearch &&
                    <View>
                        <Text style={styles.header}>Акции и новости</Text>

                        <FlatList
                            data={news}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={false}
                            horizontal={true}
                            keyExtractor={item => item.id}
                            contentContainerStyle={{columnGap: 16}}
                            renderItem={({item}) => <NewsItem item={item}/>}/>
                    </View>
                }


                <Text style={styles.header}>Каталог анализов</Text>
                {/* Categories */}

                <View style={{marginHorizontal: 20}}>
                    <FlatList data={categories} showsHorizontalScrollIndicator={false} pagingEnabled={true}
                              horizontal={true}
                              keyExtractor={item => item} contentContainerStyle={{columnGap: 8}}
                              renderItem={({item}) => {
                                  return (
                                      <TouchableOpacity onPress={() => selectCategory(item)}>
                                          <View
                                              style={[styles.category, selectedCategory === item && styles.activeCategory]}>
                                              <Text
                                                  style={[styles.categoryText, selectedCategory === item && styles.activeCategoryText]}>{item}</Text>
                                          </View>
                                      </TouchableOpacity>
                                  )
                              }}/>
                </View>

                {/* Catalog */}
                <View>

                    <FlatList data={filteredCatalog}

                              showsVerticalScrollIndicator={false}
                              pagingEnabled={false}
                              bounces={false}
                              keyExtractor={item => item.id}
                              renderItem={({item}) => <CatalogItem item={item}/>}
                    />
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        marginHorizontal: 20,
        marginTop: 20,
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 24,
        color: Colors.Caption,
        marginBottom: 10,
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderRadius: 10
    },
    category: {
        marginVertical: 10,
        backgroundColor: '#F5F5F9',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
    },
    categoryText: {
        color: Colors.Caption,
    },
    activeCategory: {
        backgroundColor: Colors.Accent,
    },
    activeCategoryText: {
        color: '#fff'
    }
})
