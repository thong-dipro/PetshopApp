import React from "react";
import { View, StyleSheet, Dimensions, Button, Text, Alert, ScrollView, TouchableOpacity, TextInput, StatusBar, FlatList } from "react-native";
import { cat, fonts, IProductCart, SCREENNAME } from "../../shared";
import colors from "../../shared/colors";
import { AppHeader } from "../Header";
import { CartComponent } from "./Components";
import { useNavigation } from "@react-navigation/native";
const listProduct = [
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
    {
        image: cat,
        title: "Cat's Best Original Cat litter",
        price: 20000
    },
]

interface IProductCartParams {
    item: IProductCart
}

export default () => {
    const navigation = useNavigation<any>();
    const [total, setTotal] = React.useState<number>(0)
    React.useEffect(() => {
        var price = 0;
        listProduct.forEach(element => {
            price += element.price
        });
        setTotal(price)
    }, [])
    const renderCheckout = (() => {
        
        return <TouchableOpacity style={styles.wrapCheckout} onPress={() => {navigation.navigate(SCREENNAME.PAYMENT_SCREEN)}}>
            <Text style={styles.txtCheckout}>{`Check out: ${total} VND`}</Text>
        </TouchableOpacity>
    })

    const keyExtractor = React.useCallback((item: any, index: any) => `${item} ${index}`, []);
    return (
        <View style={{flex:1}}>
            <AppHeader/>
            <View style={styles.container}>
                <FlatList
                    renderItem={({ item }) => (
                        <CartComponent item={item} />
                    )}
                    data={listProduct}
                    keyExtractor={keyExtractor}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={renderCheckout}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        padding: 20,

    },
    wrapCheckout: {
        height: 50,
        backgroundColor: colors.cyan,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    txtCheckout: {
        fontSize: fonts.font20,
        fontWeight: "500",
        color: colors.white
    }
});


